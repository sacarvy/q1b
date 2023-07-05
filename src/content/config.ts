// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a schema for each collection you'd like to validate.
const postsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string(),
        image: z
            .object({
                url: z.string(),
                alt: z.string(),
            })
            .optional(),
        tags: z.array(z.string()),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    posts: postsCollection,
};
