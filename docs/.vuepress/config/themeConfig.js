module.exports = {
    logo: '/logo.jpg',
    hostname: 'https://mrzhouzh.github.io',
    nav: [
        { text: '🏠 Home', link: '/' },
        { text: '📖 Theme', link: '/post/2020/12/26/theme-learning-0.html' },
        { text: '🐉 Maker Docs', link: '/_post/maker.md' },
        { text: '🖼 Theme Gallery', link: '/vuepress-theme/' },
        { text: '🔥 Animation', link: '/categories/animation/' },
        { text: '🔗 friend-links', link: '/friend-links/' },  
    ],
    searchPlaceholder: 'Search',
    searchMaxSuggestion: 10,
    social: [
        {
            type: 'email',
            link: '17600330793@qq.com',
        },
        {
            type: 'github',
            link: 'Jace Chou',
        },
        {
            type: 'qq',
            link: '/rss.xml',
        }
    ],
    copyright: `© ${new Date().getFullYear()} <a target="_blank" rel="external nofollow noopner" href="https://mrzhouzh.github.io">Jace Chou</a>`,
    reward: {
        text: 'Buy me a cup of coffee ☕️.',
        enable: true,
        ways: [
            {
                name: 'wechat',
                icon: 'wechat',
                qrcode: '/images/wechat.png',
                text: 'This is a Wechat Pay qrcode',
                color: 'rgb(9, 187, 7)'
            },
            {
                name: 'alipay',
                symbol: 'alipay',
                qrcode: '/images/alipay.png',
                text: 'This is a Alipay Pay qrcode',
                color: '#1296db'
            }
        ],
    },
    blog: {
        directories: [
            {
                id: 'post',
                dirname: '_post',
                path: '/',
                itemPermalink: '/post/:year/:month/:day/:slug.html',
                frontmatter: { title: '' },
                pagination: {
                    perPagePosts: 10,
                    prevText: '',
                    nextText: '',
                },
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
        comment: {
            service: 'valine',
            appId: '1oeLbJt8p8rzkCaguAkbm0sp-gzGzoHsz',
            appKey: 'jotwOTiL9EkOSYmsp21OcdaM',
            placeholder: 'Leave a comment',
            visitor: true,
            enableQQ: true
        },
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
        type: $page => ['articles', '_post', 'blog', '_theme'].some(folder => $page.regularPath.startsWith(`/${folder}`)) ? 'article' : 'website',
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
    copy: {
        copySelector: ['div[class*="language-"] pre', '.friend-link__content div[class*="language-"] pre'],
        copyMessage: '代码复制成功',
        duration: 1000,
    },
    palette: {},
}