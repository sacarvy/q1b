0:["Ar27atYfT9xGNafBUMlSN",[[["",{"children":[["slug","ideal-layout-component-in-astro","d"],{"children":["__PAGE__?{\"slug\":\"ideal-layout-component-in-astro\"}",{}]}]},"$undefined","$undefined",true],"$L1",[[],"$L2"]]]]
3:HL["/_next/static/css/5c3b7f8d83f9d33e.css",{"as":"style"}]
4:I{"id":63710,"chunks":["272:static/chunks/webpack-f7788c1e16bdaa78.js","648:static/chunks/d4618404-9177480d2b24e392.js","800:static/chunks/800-1aa97794a3790120.js"],"name":"default","async":false}
5:I{"id":95453,"chunks":["272:static/chunks/webpack-f7788c1e16bdaa78.js","648:static/chunks/d4618404-9177480d2b24e392.js","800:static/chunks/800-1aa97794a3790120.js"],"name":"default","async":false}
2:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
1:[["$","html",null,{"lang":"en","children":["$","body",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","loading":"$undefined","loadingStyles":"$undefined","hasLoading":false,"template":["$","$L5",null,{}],"templateStyles":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","childProp":{"current":[["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children",["slug","ideal-layout-component-in-astro","d"],"children"],"error":"$undefined","errorStyles":"$undefined","loading":"$undefined","loadingStyles":"$undefined","hasLoading":false,"template":["$","$L5",null,{}],"templateStyles":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","childProp":{"current":["$L6",null],"segment":"__PAGE__?{\"slug\":\"ideal-layout-component-in-astro\"}"},"styles":[]}],null],"segment":["slug","ideal-layout-component-in-astro","d"]},"styles":[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/5c3b7f8d83f9d33e.css","precedence":"next"}]]}]}]}],null]
7:T7a4,---
// ...
---

<!DOCTYPE html>
<html lang={locale} dir="ltr">
    <head>
        <!-- Global Metadata -->
        <meta charset="utf-8" />
        <meta name="generator" content={Astro.generator} />
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content={themeColor} />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#8D46E7" />
        <link rel="sitemap" href="/sitemap-index.xml" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS" />

        <!-- Page Metadata -->
        {canonicalURL && (
			<link rel="canonical" href={ensureTrailingSlash(canonicalURL)} />
		)}
        <title>{title}</title>
        <meta name="description" content={description} />

        <!-- OpenGraph Tags -->
        <meta property="og:title" content={og.title} />
        <meta property="og:type" content={og.type} />
        {og.canonicalURL && (
			<meta property="og:url" content={ensureTrailingSlash(og.canonicalURL)} />
		)}
        <meta property="og:locale" content={og.locale} />
        <meta property="og:description" content={og.description} />
        <meta property="og:site_name" content={og.name} />
        {og.image && <meta property="og:image" content={og.image.src} />}
        {og.image && <meta property="og:image:alt" content={og.image.alt} />}

        <!-- Twitter Tags -->
        {twitter.card && <meta name="twitter:card" content={twitter.card} />}
        {twitter.handle && <meta name="twitter:site" content={twitter.handle} />}

        <meta name="twitter:title" content={twitter.title} />
        <meta name="twitter:description" content={twitter.description} />
        {twitter.image && <meta name="twitter:image" content={twitter.image.src} />}
        {twitter.image && <meta name="twitter:image:alt" content={twitter.image.alt} />}
    </head>
    <body></body>
</html>8:T1039,---
// Global Components
import TailwindcssIndicator from "~/components/tailwindcss-indicator.astro";
// Global Styles
import "~/styles/global.css";

export type Image = {
    src: string;
    alt: string;
};

export type SEOMetadata = {
    name: string;
    title: string;
    description: string;
    image: Image;
    canonicalURL: URL | string;
    locale?: string;
};
export type OpenGraph = Partial<SEOMetadata> & {
    type?: string;
};
export type Twitter = Partial<SEOMetadata> & {
    handle?: string;
    card?: "summary" | "summary_large_image";
};

export type Props = SEOMetadata & {
    og?: OpenGraph;
    twitter?: Twitter;
    class: string;
};

const { name, title, class: className, description, image, locale = "en", canonicalURL, extras } = Astro.props as Props;

const { 
	name, title, description, image, locale = "en", canonicalURL 
} = Astro.props as Props;

const metadata = {
	 name, title, description, canonicalURL, image, locale 
} satisfies SEOMetadata;

const og = {
	...metadata,
    type: "website",
    ...Astro.props.og,
} satisfies OpenGraph;

const twitter = {
	...metadata
    card: "summary_large_image",
    ...Astro.props.twitter,
} satisfies Twitter;

const ensureTrailingSlash = (url: string | URL) => url.toString().replace(/\/$/, "") + "/";
---

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <!-- Global Metadata -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="theme-color" content="#fff" />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#8D46E7" />
        <link rel="sitemap" href="/sitemap-index.xml" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS" />

        <!-- Page Metadata -->
        <meta name="generator" content={Astro.generator} />
        {canonicalURL && <link rel="canonical" href={ensureTrailingSlash(canonicalURL)} />}
        <title>{title}</title>
        <meta name="description" content={description} />

        <!-- OpenGraph Tags -->
        <meta property="og:title" content={og.title} />
        <meta property="og:type" content={og.type} />
        {og.canonicalURL && <meta property="og:url" content={ensureTrailingSlash(og.canonicalURL)} />}
        <meta property="og:locale" content={og.locale} />
        <meta property="og:description" content={og.description} />
        <meta property="og:site_name" content={og.name} />
        {og.image && <meta property="og:image" content={og.image.src} />}
        {og.image && <meta property="og:image:alt" content={og.image.alt} />}

        <!-- Twitter Tags -->
        {twitter.card && <meta name="twitter:card" content={twitter.card} />}
        {twitter.handle && <meta name="twitter:site" content={twitter.handle} />}

        <meta name="twitter:title" content={twitter.title} />
        <meta name="twitter:description" content={twitter.description} />
        {twitter.image && <meta name="twitter:image" content={twitter.image.src} />}
        {twitter.image && <meta name="twitter:image:alt" content={twitter.image.alt} />}

        <!-- Avoiding Foc -->
        <script is:inline>
            if (
				localStorage.getItem("theme-preference") === "dark" || (
					window.matchMedia("(prefers-color-scheme: dark)") && 
					!("theme-preference" in localStorage) 
				)
			) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        </script>
        <!-- Font preloads -->
        <link rel="preload" href="/fonts/Mona-Sans.woff2" as="font" type="font/woff2" crossorigin />
        <style>
            @font-face {
                font-family: "Mona Sans";
                src: url("/fonts/Mona-Sans.woff2") format("woff2 supports variations"),
                    url("/fonts/Mona-Sans.woff2") format("woff2-variations");
                font-weight: 200 900;
                font-stretch: 75% 125%;
            }
        </style>
    </head>
    <body class={className}>
        <TailwindcssIndicator />
        <slot />
    </body>
</html>6:["$","div",null,{"children":[["$","h1",null,{"children":"Ideal Layout Component in Astro"}],["$","div",null,{"children":[["$","h2",null,{"style":{"textAlign":"$undefined"},"children":["What is Layout Component in Astro ?"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Layout Component contains structure that can be shared across many other, web pages!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Example of a simple Layout Component Can be -"]}],["$","pre",null,{"children":["$","code",null,{"children":"---\nconst { title } = Astro.props;\n---\n\n<!DOCTYPE html>\n<html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>{title ?? \"Astro Web Page\"}</title>\n    </head>\n    <body>\n        <header>...</header>\n        <slot />\n        <footer>...</footer>\n    </body>\n</html>"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Above component then, can be used as"]}],["$","pre",null,{"children":["$","code",null,{"children":"---\nimport Page from \"../layouts/xyz.astro\";\n---\n\n<Page title=\"Home Page\">...Content</Page>"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["You can checkout official documentation on layout in astro, for more information!"]}],["$","h2",null,{"style":{"textAlign":"$undefined"},"children":["List of features that can be implemented in Layout!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["In Layout Component you can define features which are going to be used by multiple pages, even you can extract them out into one Layout and Wrap around other Layout as a Wrapper to provide these features!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["here, are some browser specific reuseable needs for web developers"]}],["$","ul",null,{"children":[["$","li","0",{"children":[["SEO ( defining the title, description, open graph, twitter )"]]}],["$","li","1",{"children":[["Loading Global Assets which are utlized by your children Nested Pages and Layouts"]]}],["$","li","2",{"children":[["Defining the Font-Family at the top"]]}],["$","li","3",{"children":[["Set the base theme of your web page before it start rendering"]]}]]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["So, let's cover these needs one by one"]}],["$","h3",null,{"style":{"textAlign":"$undefined"},"children":["SEO"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["For Search Engine Optimisation almost, all the details and tags remain same for all the pages and layouts then, why not just extract it right away into one source of truth and use that everywhere else!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Here, how a types defintaion for SEO would looks like"]}],["$","pre",null,{"children":["$","code",null,{"children":"export type Image = {\n    src: string;\n    alt: string;\n};\n\nexport type SEOMetadata = {\n    name: string;\n    title: string;\n    description: string;\n    image: Image;\n    canonicalURL: URL | string;\n    locale?: string;\n};\n\nexport type OpenGraph = Partial<SEOMetadata> & {\n    type?: string;\n};\nexport type Twitter = Partial<SEOMetadata> & {\n    handle?: string;\n    card?: \"summary\" | \"summary_large_image\";\n};"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["From, above type definations we can see twiiter, open graph and metadata of a page contains how much duplicate data such as image, title, description ... more!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Defining the ",["$","strong",null,{"children":"props"}]," in our ",["$","code",null,{"children":".astro"}]," file!"]}],["$","pre",null,{"children":["$","code",null,{"children":"---\nimport type { SEOMetadata, OpenGraph, Twitter } from \"path/to/types\";\n\nexport type Props = SEOMetadata & {\n    og?: OpenGraph;\n    twitter?: Twitter;\n};\n\nconst { \n\tname, title, description, image, locale = \"en\", canonicalURL \n} = Astro.props as Props;\n\nconst metadata = {\n\t name, title, description, canonicalURL, image, locale \n} satisfies SEOMetadata;\n\nconst og = {\n\t...metadata,\n    type: \"website\",\n    ...Astro.props.og,\n} satisfies OpenGraph;\n\nconst twitter = {\n\t...metadata\n    card: \"summary_large_image\",\n    ...Astro.props.twitter,\n} satisfies Twitter;\n---\n\n<!DOCTYPE html>\n<html lang={locale} dir=\"ltr\">\n    <head>\n        <!-- Global Metadata -->\n    </head>\n    <body></body>\n</html>"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Below, utility will help us with SEO optimization for urls"]}],["$","pre",null,{"children":["$","code",null,{"children":"const ensureTrailingSlash = (url: string | URL) => {\n\treturn url.toString().replace(/\\/$/, \"\") + \"/\"\n}"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Now, let's sprinkle our metadata, og, and twitter objects!"]}],["$","pre",null,{"children":["$","code",null,{"children":"$7"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["I think that's all we need our SEO!"]}],["$","h3",null,{"style":{"textAlign":"$undefined"},"children":["Global Assets"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Just import global assets such as ",["$","code",null,{"children":"css"}]," file over the top of the ",["$","code",null,{"children":"astro"}]," file"]}],["$","pre",null,{"children":["$","code",null,{"children":"---\nimport \"../global.css\"\n// ...\n---"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["This will be imported wherever over layout component get used."]}],["$","h3",null,{"style":{"textAlign":"$undefined"},"children":["Initilizing Font Family"]}],["$","ul",null,{"children":[["$","li","0",{"children":[["preload the font"]]}],["$","li","1",{"children":[["load the font into CSS"]]}]]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["For example we have a local font saved in our ",["$","code",null,{"children":"public/fonts"}]," directory, with name of ",["$","strong",null,{"children":"CascadiaCodePL.woff2"}]]}],["$","pre",null,{"children":["$","code",null,{"children":"---\n// ...\n---\n<html>\n\t<head>\n\t\t<!-- SEO... -->\n\t\t<!-- Font preload -->\n        <link \n\t\t\trel=\"preload\" \n\t\t\thref=\"/fonts/CascadiaCodePL.woff2\" as=\"font\" type=\"font/woff2\" crossorigin \n\t\t/>\n        <style>\n            @font-face {\n                font-family: \"Cascadia Code PL\";\n                font-weight: 100 900;\n                font-style: normal;\n                font-display: swap;\n                font-named-instance: \"Regular\";\n                src: url(\"/fonts/CascadiaCodePL.woff2\") format(\"woff2\");\n            }\n        </style>\n\t</head>\n</html>"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Further if you are using ",["$","strong",null,{"children":"tailwindcss"}],", may be it's time to update your ",["$","code",null,{"children":"tailwind config"}]," file present in your root!"]}],["$","pre",null,{"children":["$","code",null,{"children":"const defaultTheme = require(\"tailwindcss/defaultTheme\");\n\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n    // ...\n    theme: {\n        extend: {\n            // ...\n            fontFamily: {\n                sans: [\"Cascadia Code PL\", ...defaultTheme.fontFamily.sans],\n\t\t\t}\n\t\t}\n\t},\n}"}]}],["$","h3",null,{"style":{"textAlign":"$undefined"},"children":["Set the base theme of your web page"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Okay, learnt that you don't want your user to see a flash when loading your web page So, first thing that you want to ensure is applying the styles bases on the ",["$","code",null,{"children":"theme"}]," is it either ",["$","strong",null,{"children":"dark"}]]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Here, it is"]}],["$","pre",null,{"children":["$","code",null,{"children":"---\n// ...\n---\n<html>\n\t<head>\n\t\t<!-- SEO... -->\n        <!-- Avoiding Foc -->\n        <script is:inline>\n            if (\n\t\t\t\tlocalStorage.getItem(\"theme-preference\") === \"dark\" || (\n\t\t\t\t\twindow.matchMedia(\"(prefers-color-scheme: dark)\") && \n\t\t\t\t\t!(\"theme-preference\" in localStorage) \n\t\t\t\t)\n\t\t\t) document.documentElement.classList.add(\"dark\");\n            else document.documentElement.classList.remove(\"dark\");\n        </script>\n\t\t<!-- Fonts... -->\n\t</head>\n</html>"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["So, far we have"]}],["$","ul",null,{"children":[["$","li","0",{"children":[["Handled SEO"]]}],["$","li","1",{"children":[["Loaded Global Assets single source of truth"]]}],["$","li","2",{"children":[["Preloaded Fonts and defined it"]]}],["$","li","3",{"children":[["Added a Simple Script to Avoid Flash!"]]}]]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["almost within a Single Layout Component!"]}],["$","h2",null,{"style":{"textAlign":"$undefined"},"children":["Complete Code, with some more improvements"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["<details class=\"open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg\"> <summary class=\"text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none\"> Check out Code </summary> <div class=\"mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400\">"]}],["$","pre",null,{"children":["$","code",null,{"children":"$8"}]}],["$","pre",null,{"children":["$","code",null,{"children":"</div>"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["</details>"]}],["$","h2",null,{"style":{"textAlign":"$undefined"},"children":["Reusing our Wrapper Layout Component!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Now, you are good to import it into our layout which may be we likly use with our web pages!"]}],["$","pre",null,{"children":["$","code",null,{"children":"---\nimport Layout from \"./Layout.astro\"\nimport siteInfo from \"~/site-info\";\n\nexport type Props = {\n    title?: string;\n    description?: string;\n    image?: { src: string; alt: string };\n    pageType?: \"article\" | \"website\";\n};\n\nconst {\n    title = siteInfo.title,\n    description = siteInfo.description,\n    image = siteInfo.image,\n    pageType = \"website\",\n} = Astro.props;\n\nconst canonicalURL = new URL(Astro.request.url, Astro.site);\nconst resolvedImage = {\n    src: new URL(image.src, Astro.site).toString(),\n    alt: image.alt,\n};\n---\n<Layout\n    class=\"px-4 py-6\"\n    title={title}\n    description={description}\n    twitter={{ handle: twitterHandle }}\n    og={{ type: pageType }}\n    canonicalURL={canonicalURL}\n    image={resolvedImage}\n>\n\t<header>...</header>\n\t<slot/>\n\t<footer>...</footer>\n</Layout>\n---"}]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["Hope, it's a good starting point!"]}],["$","p",null,{"style":{"textAlign":"$undefined"},"children":["I know it's little bit complicated yet, more complication get introduced when you extract them, out into component such as ",["$","code",null,{"children":"Head"}]," and ",["$","code",null,{"children":"SEO"}]," since, y0u wouldn't be reusing them either!"]}]]}]]}]
