// Import utilities from `astro:content`
import { z, defineCollection, reference } from "astro:content";
// Define a schema for each collection you'd like to validate.
const posts = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        pubDate: z.string(),
        description: z.string(),
        image: z.string().optional(),
        tags: z.array(reference('tags')),
    }),
});


const tags = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string()
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    posts,
    tags
};
