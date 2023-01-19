module.exports = {
    logo: '/logo.jpg',
    hostname: 'https://mrzhouzh.github.io',
    nav: [
        { text: '🏠 Home', link: '/' },
        { text: '🔖 Book Marks', link: '/bookmarks/' },
        // { text: '📖 Theme', link: '/post/2020/12/26/theme-learning-0.html' },
        // { text: '🐉 Maker Docs', link: '/_post/maker.md' },
        // { text: '🖼 Theme Gallery', link: '/vuepress-theme/' },
        // { text: '🔥 Animation', link: '/categories/animation/' },
        // { text: '🔗 friend-links', link: '/friend-links/' },  
    ],
    searchPlaceholder: 'Search ⌘+k',
    searchMaxSuggestion: 10,
    social: [
        {
            type: 'email',
            link: '17600330793@qq.com',
        },
        {
            type: 'github',
            link: 'MrZhouZh',
        },
    ],
    copyright: `© ${new Date().getFullYear()} <a target="_blank" rel="external nofollow noopner" href="https://mrzhouzh.github.io">Jace Chou</a>`,
    // reward: {
    //     text: 'Buy me a cup of coffee ☕️.',
    //     enable: false,
    //     ways: [
    //         {
    //             name: 'wechat',
    //             icon: 'wechat',
    //             qrcode: '/images/wechat.png',
    //             text: 'This is a Wechat Pay qrcode',
    //             color: 'rgb(9, 187, 7)'
    //         },
    //         {
    //             name: 'alipay',
    //             symbol: 'alipay',
    //             qrcode: '/images/alipay.png',
    //             text: 'This is a Alipay Pay qrcode',
    //             color: '#1296db'
    //         }
    //     ],
    // },
    blog: {
        directories: [
            {
                id: 'post',
                // dirname: '_post',
                dirname: '_home',
                path: '/',
                // itemPermalink: '/post/:year/:month/:day/:slug.html',
                frontmatter: { title: '' },
                pagination: {
                    perPagePosts: 10,
                    prevText: '',
                    nextText: '',
                },
            },
            {
                id: 'bookmarks',
                dirname: 'bookmarks',
                path: '/bookmarks',
                itemPermalink: '/bookmarks/:slug.html',
                frontmatter: { title: '' },
                pagination: {}
            }
        ],
        frontmatters: [
            {
                id: 'tag',
                keys: ['tag', 'tags'],
                path: '/tags/',
                frontmatter: { title: 'Tag' },
                pagination: {
                    lengthPerPage: 10,
                    prevText: '',
                    nextText: '',
                },
            },
            {
                id: 'category',
                keys: ['category', 'categories'],
                path: '/categories/',
                frontmatter: { title: 'Category' },
                pagination: {
                    lengthPerPage: 10,
                    prevText: '',
                    nextText: '',
                },
            }
        ],
        sitemap: {
            hostname: 'https://mrzhouzh.github.io',
            exclude: ['/404.html'],
        },
        feed: {
            canonical_base: 'https://mrzhouzh.github.io',
        },
        // comment: {
        //     service: 'valine',
        //     appId: '1oeLbJt8p8rzkCaguAkbm0sp-gzGzoHsz',
        //     appKey: 'jotwOTiL9EkOSYmsp21OcdaM',
        //     placeholder: 'Leave a comment',
        //     visitor: true,
        //     enableQQ: true
        // },
    },
    seo: {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => {
            if ('theme-tags' in $page.frontmatter) {
                return $page.frontmatter['theme-tags']
            }
            return $page.frontmatter.tags
        },
        twitterCard: _ => 'summary_large_image',
        type: $page => ['articles', '_post', 'blog', '_theme', 'bookmarks'].some(folder => $page.regularPath.startsWith(`/${folder}`)) ? 'article' : 'website',
        url: (_, $site, path) => ($site.themeConfig.hostname || '') + path,
        image: ($page, $site) => $page.frontmatter.cover && (($site.themeConfig.hostname && !$page.frontmatter.cover.startsWith('http') || '') + $page.frontmatter.cover),
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated)
    },
    pwa: {
        serviceWorker: true,
        popupComponent: 'ThemeSWUpdatePopup',
        updatePopup: true,
    },
    // copy: {
    //     copySelector: ['div[class*="language-"] pre', '.friend-link__content div[class*="language-"] pre'],
    //     copyMessage: '代码复制成功',
    //     duration: 1000,
    // },
    palette: {
        colors: [
            {
                btnColor: '#673ab7',
                paletteVars: {
                    dark: `--theme-accent-color: #673ab7;
                    --theme-foreground-color: #d8d8d8;
                    --theme-border-color: #444;
                    --theme-background: #202020;
                    --theme-sidebar-background: #673ab7;
                    --theme-card-background: #252525;
                    --theme-card-color: #252525;
                    --theme-bg-tertiary-color: #161b22;
                    --theme-accent-color-005: rgba(103,58,183,0.05);
                    --theme-accent-color-01: rgba(103,58,183,0.1);
                    --theme-accent-color-02: rgba(103,58,183,0.2);
                    --theme-accent-color-04: rgba(103,58,183,0.4);
                    --theme-accent-color-08: rgba(103,58,183,0.8);`,
                    light: `--theme-accent-color: #673ab7;
                    --theme-foreground-color: #363636;
                    --theme-border-color: #e0e0e0;
                    --theme-sidebar-background: #673ab7 linear-gradient(to bottom, #673ab7 0%, #522e92 100%);
                    --theme-card-background: #fff;
                    --theme-bg-tertiary-color: #f6f8fa;
                    --theme-accent-color-005: rgba(103,58,183,0.05);
                    --theme-accent-color-01: rgba(103,58,183,0.1);
                    --theme-accent-color-02: rgba(103,58,183,0.2);
                    --theme-accent-color-04: rgba(103,58,183,0.4);
                    --theme-accent-color-08: rgba(103,58,183,0.8);`
                },
            },
            {
                btnColor: '#3f51b5',
                paletteVars: {
                dark: `--theme-accent-color: #3f51b5;
                        --theme-foreground-color: #d8d8d8;
                        --theme-border-color: #444;
                        --theme-background: #202020;
                        --theme-sidebar-background: #3f51b5;
                        --theme-card-background: #252525;
                        --theme-card-color: #252525;
                        --theme-bg-tertiary-color: #161b22;
                        --theme-accent-color-005: rgba(63,81,181,0.05);
                        --theme-accent-color-01: rgba(63,81,181,0.1);
                        --theme-accent-color-02: rgba(63,81,181,0.2);
                        --theme-accent-color-04: rgba(63,81,181,0.4);
                        --theme-accent-color-08: rgba(63,81,181,0.8);`,
                light: `--theme-accent-color: #3f51b5;
                        --theme-foreground-color: #363636;
                        --theme-border-color: #e0e0e0;
                        --theme-sidebar-background: #3f51b5 linear-gradient(to bottom, #3f51b5 0%, #324191 100%);
                        --theme-card-background: #fff;
                        --theme-bg-tertiary-color: #f6f8fa;
                        --theme-accent-color-005: rgba(63,81,181,0.05);
                        --theme-accent-color-01: rgba(63,81,181,0.1);
                        --theme-accent-color-02: rgba(63,81,181,0.2);
                        --theme-accent-color-04: rgba(63,81,181,0.4);
                        --theme-accent-color-08: rgba(63,81,181,0.8);`
                }
            },
            {
                btnColor: '#2196f3',
                paletteVars: {
                    dark: `--theme-accent-color: #2196f3; --theme-sidebar-background: #2196f3;`,
                    light: `--theme-accent-color: #2196f3; --theme-sidebar-background: #2196f3;`
                }
            },
            {
                btnColor: '#009688',
                paletteVars: {
                    dark: `--theme-accent-color: #009688; --theme-sidebar-background: #009688;`,
                    light: `--theme-accent-color: #009688; --theme-sidebar-background: #009688;`
                }
            },
            {
                btnColor: '#4caf50',
                paletteVars: {
                    dark: `--theme-accent-color: #4caf50; --theme-sidebar-background: #4caf50;`,
                    light: `--theme-accent-color: #4caf50; --theme-sidebar-background: #4caf50;`
                }
            },
            {
                btnColor: '#ff9800',
                paletteVars: {
                    dark: `--theme-accent-color: #ff9800; --theme-sidebar-background: #ff9800;`,
                    light: `--theme-accent-color: #ff9800; --theme-sidebar-background: #ff9800;`
                }
            },
            {
                btnColor: '#ff5722',
                paletteVars: {
                    dark: `--theme-accent-color: #ff5722; --theme-sidebar-background: #ff5722;`,
                    light: `--theme-accent-color: #ff5722; --theme-sidebar-background: #ff5722;`
                }
            },
            {
                btnColor: '#795548',
                paletteVars: {
                    dark: `--theme-accent-color: #795548; --theme-sidebar-background: #795548;`,
                    light: `--theme-accent-color: #795548; --theme-sidebar-background: #795548;`
                }
            },
            {
                btnColor: '#607D8B',
                paletteVars: {
                    dark: `--theme-accent-color: #607D8B; --theme-sidebar-background: #607D8B;`,
                    light: `--theme-accent-color: #607D8B; --theme-sidebar-background: #607D8B;`
                }
            },
            {
                btnColor: '#2a2b33',
                paletteVars: {
                    dark: `--theme-accent-color: #2a2b33; --theme-sidebar-background: #2a2b33;`,
                    light: `--theme-accent-color: #2a2b33; --theme-sidebar-background: #2a2b33;`
                }
            },
        ]
    },
}