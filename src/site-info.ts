export type SocialInfo = {
    href: string;
    me?: string;
    text: string;
    icon: string;
    footerOnly?: boolean;
};

export type SiteInfo = {
    name: string;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
    socials: { [key: string]: SocialInfo };
};

const siteInfo = {
    name: "q1b a.k.a Sukhpreet Singh",
    title: "q1b a.k.a Sukhpreet Singh",
    description:
        "Digital Open Home of Sukhpreet Singh aka `q1b` to bring forth the thoughts and share the learnings back to developers.",
    image: {
        src: "/og/default.jpg",
        alt: "Build the web you want",
    },
    socials: {
        instagram: {
            href: "https://www.instagram.com/vishnuans/",
            me: "https://www.instagram.com/vishnuans/",
            text: "Checkout instgram page",
            icon: "social/instagram",
        },
        github: {
            href: "https://github.com/q1b/q1b",
            me: "https://github.com/q1b/",
            text: "Go to GitHub repo",
            icon: "social/github",
        },
        twitter: {
            href: "https://twitter.com/uniuwe",
            me: "https://twitter.com/uniuwe",
            text: "Follow Uniuwe on Twitter",
            icon: "social/twitter",
        },
    },
} satisfies SiteInfo;

export default siteInfo;
