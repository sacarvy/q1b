import { signal, computed, effect } from "usignal"
/**
 * Dropdown
 *  DropdownRoot
 *  DropdownButton
 *  DropdownPanel
 *  DropdownItem
*/
// window.onload = () => {
// const open = signal(false);
// const root = document.getElementById('dropdown-root')
// const button = document.getElementById('dropdown-button')
// const panel = document.getElementById('dropdown-panel')
// const item = document.getElementsByClassName('dropdown-item')

// const toggle = () => {
//     if (open.value) {
//         return close()
//     }
//     // this.$refs.button.focus()
//     // this.open = true
// }

// const close = (focusAfter) => {
//     if (!open) return

//     open = false
//     focusAfter && focusAfter.focus()
// }
// }