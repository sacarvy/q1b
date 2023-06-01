export type Passion = {
    [key in string]: string;
};
export type Skills = {
    [key in string]: Array<string | { label: string; active: boolean }>;
};
export type Contacts = {
    Email: { label: string; value: string };
    "Phone Number": { label: string; value: string };
    "Github Repo": { label: string; value: string };
};

export type Education = {
    degree: string;
    place: string;
    marksHeader: string;
    marks: string;
    marksClass: string;
}[];
export type Work = {
    type: string;
    title: string;
    items: string[];
}[];
