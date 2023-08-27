import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { CollectionEntry, getCollection } from "astro:content";

const siteInfo = (
	(await getCollection("sites")).find(
		(site) => site.id === "default",
	) as CollectionEntry<"sites">
).data;

export const get: APIRoute = async (context) => {
	const posts = await getCollection("posts");

	return rss({
		// The RSS Feed title, description, and custom metadata.
		title: siteInfo.title,
		// See "Styling" section below
		description: siteInfo.description,
		site: context.site!.href,
		// The list of items for your RSS feed, sorted.
		items: posts.map((item) => ({
			title: item.data.title,
			description: item.data.description,
			link: `/posts/post/${item.slug}`,
			pubDate: item.data.pubDate,
		})),
	});
};
