import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL(".", import.meta.url));

const getFileList = async (dirName) => {
	/**
	 * @type {{
	 *  name:string
	 *  path:string
	 *  isMdx:boolean
	 * }[]}
	 */
	let files = [];
	const items = await readdir(dirName, { withFileTypes: true });
	for (const item of items) {
		if (item.isDirectory()) {
			files = [
				...files,
				...(await getFileList(`${dirName}/${item.name}`)),
			];
		} else {
			files.push({
				path: `${dirName}/${item.name}`,
				name: item.name,
				isMdx: item.name.endsWith(".mdx"),
			});
		}
	}
	return files;
};

try {
	const path = resolve(resolve(resolve(dir, ".."), "src/pages/"));
	const mdxFiles = (await getFileList(path)).filter((file) => file.isMdx);
	for (const file of mdxFiles) {
		const fileContent = (await readFile(file.path)).toString();
	}
} catch (err) {
	console.error(err);
}
