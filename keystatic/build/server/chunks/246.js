"use strict";
exports.id = 246;
exports.ids = [246];
exports.modules = {

/***/ 79246:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keystatic_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34708);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .config */ .vc)({
    storage: {
        kind: "local"
    },
    singletons: {
        siteInfo: (0,_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .singleton */ .ri)({
            label: "Site Info",
            path: "src/content/site/info",
            schema: {
                title: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                    label: "Title"
                }),
                description: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                    label: "Description",
                    multiline: true
                }),
                image: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.object({
                    url: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.image({
                        label: "Open Graph Image",
                        directory: "public/images/og",
                        description: "Open Graph Images are used for SEO",
                        publicPath: "/images/og/",
                        validation: {
                            isRequired: true
                        }
                    }),
                    altText: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                        label: "Alt Text"
                    })
                }),
                social: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.array(_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.object({
                    platform: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                        label: "Platform"
                    }),
                    label: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                        label: "Label"
                    }),
                    link: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.url({
                        label: "Link"
                    }),
                    me: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.url({
                        label: "Me"
                    })
                }), {
                    label: "Social Platform",
                    itemLabel: (props)=>`${props.fields.platform.value} | ${props.fields.label.value}`
                })
            }
        })
    },
    collections: {
        posts: (0,_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .collection */ .hJ)({
            label: "Posts",
            slugField: "title",
            path: "src/content/posts/*",
            format: {
                contentField: "content"
            },
            schema: {
                title: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.slug({
                    name: {
                        label: "Title"
                    }
                }),
                description: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                    label: "Summary",
                    multiline: true
                }),
                pubDate: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.date({
                    label: "Published date",
                    defaultValue: {
                        kind: "today"
                    }
                }),
                image: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.image({
                    label: "Image",
                    directory: "public/images/posts",
                    publicPath: "/images/posts/"
                }),
                tags: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.array(_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.relationship({
                    label: "Tag",
                    collection: "tags",
                    validation: {
                        isRequired: true
                    }
                }), {
                    label: "Tags",
                    itemLabel: (props)=>props.value ?? "Please select"
                }),
                content: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.document({
                    label: "Content",
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true
                })
            }
        }),
        tags: (0,_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .collection */ .hJ)({
            label: "Tags",
            path: "src/content/tags/*",
            slugField: "name",
            schema: {
                name: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.slug({
                    name: {
                        label: "Name"
                    }
                })
            }
        }),
        projects: (0,_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .collection */ .hJ)({
            label: "Projects",
            path: "src/content/projects/*",
            slugField: "title",
            schema: {
                title: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.slug({
                    name: {
                        label: "Title"
                    }
                }),
                description: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.text({
                    label: "Description",
                    multiline: true
                }),
                type: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.select({
                    label: "Type",
                    options: [
                        {
                            label: "Command-Line App",
                            value: "command-line"
                        },
                        {
                            label: "Desktop App",
                            value: "desktop-app"
                        },
                        {
                            label: "Mobile App",
                            value: "mobile-app"
                        },
                        {
                            label: "Web App",
                            value: "web-app"
                        },
                        {
                            label: "Design",
                            value: "design"
                        },
                        {
                            label: "Software",
                            value: "software"
                        }
                    ],
                    defaultValue: "web-app"
                }),
                tags: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.array(_keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.relationship({
                    label: "Tag",
                    collection: "tags",
                    validation: {
                        isRequired: true
                    }
                }), {
                    label: "Tags",
                    itemLabel: (props)=>props.value ?? "Please select"
                }),
                website: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.url({
                    label: "Website Link"
                }),
                github_link: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.url({
                    label: "Github URL"
                }),
                content: _keystatic_core__WEBPACK_IMPORTED_MODULE_0__/* .fields */ .XU.document({
                    label: "Content",
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true
                })
            }
        })
    }
}));


/***/ })

};
;