// const THEME_PATH = '/vuepress-theme/'

module.exports = {
    title: 'Jace Chow\'s Blog',
    description: 'Jace Chow\'s personal site',
    theme: 'maker',
    head: [
        ['link', { rel: 'icon', href: '/logo.jpg' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#607d8b' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#607d8b' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' }]
    ],
    markdown: {
        lineNumbers: true,
        extractHeaders: ['h2', 'h3', 'h4'],
        plugins: {
            'markdown-it-mark': true,
            'markdown-it-footnote': true,
            'markdown-it-abbr': true,
            'markdown-it-task-lists': true,
        },
    },
    themeConfig: require('./config/themeConfig'),
    plugins: [
        require('./plugin/util'),
        // [require('./plugin/gallery'), {
        //     id: 'theme',
        //     dirname: '_theme',
        //     path: THEME_PATH,
        //     itemPermalink: '/vuepress-theme/:year/:month/:day/:slug.html',
        //     layout: 'GalleryLayout',
        //     itemLayout: 'GalleryLayout',
        //     pagination: {
        //         perPagePosts: 10,
        //     },
        // }]
    ],
}