import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    siteInfo: singleton({
      label: 'Site Info',
      path: 'src/content/site-info',
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.object({
          url: fields.image({
            label: 'Open Graph Image',
            directory: 'public/images/og',
            description: 'Open Graph Images are used for SEO',
            publicPath: '/images/og/',
            validation: { isRequired: true },
          }),
          altText: fields.text({ label: 'Alt Text' }),
        }),
        social: fields.array(
          fields.object({
            platform: fields.text({
              label: 'Platform',
            }),
            label: fields.text({label:"Label"}),
            link: fields.url({ label: 'Link' }),
            me: fields.url({label: "Me"})
          }),
          {
            label: 'Social Platform',
            itemLabel: (props) =>`${props.fields.platform.value} | ${props.fields.label.value}`,
          }
        ),
      },
    }),
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Summary', multiline: true }),
        pubDate: fields.date({
          label: "Published date",
          defaultValue: {
            kind: "today",
          },
        }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: {
              isRequired: true,
            },
          }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value ?? 'Please select',
          }
        ),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    tags: collection({
      label: 'Tags',
      path: 'src/content/tags/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*',
      slugField: 'title',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Command-Line App', value: 'command-line' },
            { label: 'Desktop App', value: 'desktop-app' },
            { label: 'Mobile App', value: 'mobile-app' },
            { label: 'Web App', value: 'web-app' },
            { label: 'Design', value: 'design' },
            { label: 'Software', value: 'software' },
          ],
          defaultValue: 'web-app'
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            collection: 'tags',
            validation: {
              isRequired: true,
            },
          }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value ?? 'Please select',
          }
        ),
        website: fields.url({ label: 'Website Link' }),
        github_link: fields.url({ label: 'Github URL' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
