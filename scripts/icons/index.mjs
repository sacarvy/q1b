import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import { prepareAstroComponent } from "./template.mjs";

const RequiredIcons = [
	{
		outline: "fluent:person-48-regular",
		solid: "fluent:person-48-filled",
		name: "Profile",
	},
	{
		outline: "heroicons:arrow-left",
		solid: "heroicons:arrow-left-solid",
		name: "ArrowLeft",
	},
	{
		outline: "fluent:arrow-up-right-24-regular",
		solid: "fluent:arrow-up-right-24-filled",
		name: "ArrowUpRight",
	},
	{
		outline: "heroicons:arrow-right",
		solid: "heroicons:arrow-right-solid",
		name: "ArrowRight",
	},
	{
		outline: "fluent:pen-48-regular",
		solid: "fluent:pen-48-filled",
		name: "Pen",
	},
	{
		outline: "fluent:notebook-24-regular",
		solid: "fluent:notebook-24-filled",
		name: "Notebook",
	},
	{
		outline: "fluent:board-split-16-regular",
		solid: "fluent:board-split-16-filled",
		name: "Board",
	},
	{
		outline: "fluent:line-horizontal-3-20-regular",
		solid: "fluent:line-horizontal-3-20-filled",
		name: "Menu",
	},
	{
		outline: "heroicons-outline:x",
		solid: "heroicons-solid:x",
		name: "X",
	},
	{
		outline: "fluent:arrow-download-24-regular",
		solid: "fluent:arrow-download-24-filled",
		name: "Download",
	},
	{
		outline: "fluent:panel-top-expand-20-regular",
		solid: "fluent:panel-top-expand-20-filled",
		name: "ExpandTop",
	},
	{
		outline: "fluent:panel-top-contract-20-regular",
		solid: "fluent:panel-top-contract-20-filled",
		name: "ContractTop",
	},
	{
		outline: "heroicons-outline:chat-alt-2",
		solid: "heroicons-solid:chat-alt-2",
		name: "Chat",
	},
	{
		outline: "heroicons-outline:chevron-right",
		solid: "heroicons-solid:chevron-right",
		name: "ChevronRight",
	},
	{
		outline: "fluent:link-square-24-regular",
		solid: "fluent:link-square-24-filled",
		name: "Link",
	},
	{
		outline: "fluent:clipboard-code-24-regular",
		solid: "fluent:clipboard-code-24-filled",
		name: "ClipboardCode",
	},
	{
		outline: "fluent:code-24-regular",
		solid: "fluent:code-24-filled",
		name: "Code",
	},
	{
		outline: "fluent:clipboard-checkmark-24-regular",
		solid: "fluent:clipboard-checkmark-24-filled",
		name: "ClipboardCheck",
	},
	{
		outline: "fluent:share-48-regular",
		solid: "fluent:share-48-filled",
		name: "Share",
	},
	{
		path: "eos-icons:loading",
		name: "Loading",
	},
	{
		path: "radix-icons:github-logo",
		name: "Github",
	},
];

const getName = (name) => "../../src/ui/icons/" + name + "Icon" + ".astro";

RequiredIcons.forEach(async (detail) => {
	const component = prepareAstroComponent(detail);
	const pathname = new URL(getName(detail.name), import.meta.url);

	try {
		const data = new Uint8Array(Buffer.from(component));
		await writeFile(pathname, data);
	} catch (err) {
		// When a request is aborted - err is an AbortError
		console.error(err);
	}
});
