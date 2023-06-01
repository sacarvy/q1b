<script>
	import { spring } from 'svelte/motion';
	import { onMount } from "svelte"
	let count = 0;
	export let list = ['Yoga Instructor','Software Developer','Basketball Player','Content Creator']
	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);
	$: {
		if (count > list.length - 1) {
			count = 0
		} else if (count < 0) {
			count = list.length - 1
		}
	}
	onMount(() => {
		const interval = setInterval(() => {
			count += 1
		},1000)
        return () => clearInterval(interval);
	}) 
	/**
	 * @param {number} n
	 * @param {number} m
	 */
	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
	
</script>
<div class="w-40 rounded-lg h-8 bg-indigo-600 shadow-md shadow-indigo-600/40 text-center overflow-hidden relative">
	<div class="w-full h-full absolute" style="transform: translate(0, {100 * offset}%)">
		<strong class="top-[-100%] select-none" aria-hidden="true">{ list[Math.floor($displayed_count + 1)]}</strong>
		<strong class="">{list[Math.floor($displayed_count)]}</strong>
	</div>
</div>

<style lang="postcss">
	strong {
		@apply text-white absolute flex items-center justify-center w-full h-full text-sm;
	}
</style>
