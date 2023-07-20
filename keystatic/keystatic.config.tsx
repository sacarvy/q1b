import { config, collection, singleton, fields } from '@keystatic/core';
import type { LocalConfig, GitHubConfig } from '@keystatic/core'

export const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: 'q1b',
          name: 'q1b',
        },
      }
export default config({
  storage,
  singletons: {
    siteInfo: singleton({
      label: 'Site Info',
      path: 'src/content/site/info',
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
        category: fields.relationship({
            label: 'Category',
            collection: 'categories',
            validation: {
              isRequired: true,
            },
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
    categories: collection({
      label: 'Categories',
      path: 'src/content/categories/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
          },
        }),
        description: fields.text({label:'Description',multiline:true})
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
    work: collection({
      label: 'Experience',
      path: 'src/content/work/*',
      slugField: 'role',
      format: { contentField: 'content' },
      schema: {
        role: fields.slug({name:{label:'Role'}}),
        employment_type: fields.select({
          label: 'Employment Type',
          options: [
            { label: 'Full time', value: 'full-time' },
            { label: 'Part time', value: 'part-time' },
            { label: 'Self-employed', value: 'self-employed' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Internship', value: 'internship' },
            { label: 'Trainee', value: 'trainee' },
          ],
          defaultValue: 'self-employed'
        }),
        company: fields.object({
          name: fields.text({label:'Company Name'}),
          site: fields.url({label:'Company Website'}),
          location: fields.text({label:'Company Location'})
        }),
        startDate: fields.date({
          label: "Start Date",
          description: "Your Date of joining the Company",
        }),
        endDate: fields.conditional( 
          fields.checkbox({
            label:'currently working in this company',
            defaultValue: false
          }),
          {
            true:fields.empty(),
            false:fields.date({
              label: "End Date",
              description: "Your Date of leaving the Company",
            })
          }
        ),
        documents: fields.file({
          label: "Documents",
          description: "Any Documents as Letter of Recommandation or Certificates",
          directory: 'public/documents/',
          publicPath: '/documents/',
        }),
        summary: fields.document({
          label: 'Your Summary of the Work',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      }
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
