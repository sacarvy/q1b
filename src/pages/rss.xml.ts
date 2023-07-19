import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import siteInfo from "../site-info";

export const get: APIRoute = async (context) => {
    const posts = await getCollection("posts");

    return rss({
        // The RSS Feed title, description, and custom metadata.
        title: siteInfo.title,
        // See "Styling" section below
        description: siteInfo.description,
        site: context.site!.href,
        // The list of items for your RSS feed, sorted.
        items: posts.map((item,index) => ({
            title: item.data.title,
            description: item.data.description,
            link: `/posts/post/${index+1}`,
            pubDate: item.data.pubDate,
        })),
    });
};
