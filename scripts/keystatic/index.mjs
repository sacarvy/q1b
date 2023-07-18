import { copy, remove } from "fs-extra";
import { dirname } from "pathe";
import fg from "fast-glob";

const from = "scripts/keystatic/cache";
const to = "src/pages";

const action = {
	sync: () =>
		fg.sync(from + "/**").forEach((file) => {
			copy(file, file.replace(from, to));
		}),
	delete: () =>
		fg.sync(from + "/**").forEach((file) => {
			const dir = dirname(file.replace(from, "")).split("/")[1];
			remove(to + "/" + dir);
		}),
};

if (process.argv.includes("--delete") || process.argv.includes("-d")) {
	action.delete();
	console.log("Deleted Files")
} else {
	action.sync();
	console.log("Cached Files are Pasted!")
}
