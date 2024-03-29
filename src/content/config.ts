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
		category: reference("categories"),
		tags: z.array(reference("tags")),
	}),
});

const categories = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		description: z.string(),
	}),
});

const tags = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
	}),
});

const work = defineCollection({
	type: "content",
	schema: z.object({
		role: z.string(),
		employment_type: z.string(),
		company: z.object({
			name: z.string(),
			site: z.string(),
			location: z.string(),
		}),
		documents: z.array(
			z.object({
				document: z.string(),
				label: z.string(),
			}),
		),
		startDate: z.string(),
		endDate: z.any(),
	}),
});

const libraries = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().default(false),
		size: z.string(),
		type: z.string(),
		tags: z.array(reference("tags")),
		website: z.string().optional(),
		github_link: z.string(),
	}),
});

const projects = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().default(false),
		size: z.string(),
		type: z.string(),
		tags: z.array(reference("tags")),
		website: z.string().optional(),
		github_link: z.string(),
	}),
});

const sites = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		title: z.string(),
		description: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}),
	}),
});

const socials = defineCollection({
	type: "data",
	schema: z.object({
		data: z.array(
			z.object({
				platform: z.string(),
				label: z.string(),
				link: z.string(),
			}),
		),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
	posts,
	categories,
	tags,
	sites,
	work,
	socials,
	projects,
	libraries,
};

export const data = {
	socials,
};
