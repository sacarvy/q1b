import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import c from "picocolors";
import prompts from "prompts";
import { execa } from "execa";
import semver from "semver";
import pkg from "../package.json" assert { type: "json" };

const { version: currentVersion } = pkg;
const { inc: _inc, valid } = semver;

const versionIncrements = ["patch", "minor", "major"];

const tags = ["latest", "next"];

const dir = fileURLToPath(new URL(".", import.meta.url));
const inc = (i) => _inc(currentVersion, i);
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: "inherit", ...opts });
const step = (msg) => console.log(c.cyan(msg));

async function main() {
    let targetVersion;

    const versions = versionIncrements.map((i) => `${i} (${inc(i)})`).concat(["custom"]);

    const { release } = await prompts({
        type: "select",
        name: "release",
        message: "Select release type",
        choices: versions,
    });

    if (release === 3) {
        targetVersion = (
            await prompts({
                type: "text",
                name: "version",
                message: "Input custom version",
                initial: currentVersion,
            })
        ).version;
    } else {
        targetVersion = versions[release].match(/\((.*)\)/)[1];
    }

    if (!valid(targetVersion)) {
        throw new Error(`Invalid target version: ${targetVersion}`);
    }

    const { tag } = await prompts({
        type: "select",
        name: "tag",
        message: "Select tag type",
        choices: tags,
    });

    const { yes: tagOk } = await prompts({
        type: "confirm",
        name: "yes",
        message: `Releasing v${targetVersion} on ${tags[tag]}. Confirm?`,
    });

    if (!tagOk) {
        return;
    }

    // Update the package version.
    step("\nUpdating the package version...");
    updatePackage(targetVersion);

    // Build the package.
    step("\nBuilding the website...");
    await run("npm", ["run", "build"]);

    // step("\nPreview the website...");
    // await run("npm", ["run", "pages:preview"]);

    // Commit changes to the Git and create a tag.
    step("\nCommitting changes...");
    await run("git", ["add", "CHANGELOG.md", "package.json"]);
    await run("git", ["commit", "-m", `release: v${targetVersion}`]);
    await run("git", ["tag", `v${targetVersion}`]);

    // Deploying the website.
    step("\nDeploying the website...");
    await run("npm", ["run", "pages:deploy"]);

    // const { yes: releaseOk } = await prompts({
    //     type: "confirm",
    //     name: "yes",
    //     message: `Will it be okay to deploy your website?`,
    // });

    // if (releaseOk) {
    // Deploying the website.
    // step("\nDeploying the website...");
    // await run("npm", ["run", "pages:deploy"]);
    // }

    // Push to GitHub.
    step("\nPushing to GitHub...");
    await run("git", ["push", "origin", `refs/tags/v${targetVersion}`]);
    await run("git", ["push"]);
}

function updatePackage(version) {
    const pkgPath = resolve(resolve(dir, ".."), "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

    pkg.version = version;

    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

main().catch((err) => console.error(err));
