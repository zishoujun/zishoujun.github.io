import sidebar from "./themeConfig/sidebar";


export default {
  title: '子受君丶笔记',
  // titleTemplate: ':title - Tass UI',
  description: '精通hello world',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/images/logo_icon.png' }]],
  themeConfig: {
    logo: '/logo-horizontal.png',
    siteTitle: false,
    nav: [
      { text: 'plus', link: '/plus/index' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/zishoujun/zishoujun.github.io' }],
    sidebar: sidebar,
    lastUpdatedText: '最近更新时间',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023 Components Team'
    },
    // algolia: {
    //   // appId: '883U6KEOAU',
    //   // apiKey: '49156c3943b71f4167959c3202872067',
    //   // indexName: 'huccctio',
    //   // locales: {
    //   //   zh: {
    //   //     placeholder: '搜索文档',
    //   //     translations: {
    //   //       button: {
    //   //         buttonText: '搜索文档',
    //   //         buttonAriaLabel: '搜索文档'
    //   //       },
    //   //       modal: {
    //   //         searchBox: {
    //   //           resetButtonTitle: '清除查询条件',
    //   //           resetButtonAriaLabel: '清除查询条件',
    //   //           cancelButtonText: '取消',
    //   //           cancelButtonAriaLabel: '取消'
    //   //         },
    //   //         startScreen: {
    //   //           recentSearchesTitle: '搜索历史',
    //   //           noRecentSearchesText: '没有搜索历史',
    //   //           saveRecentSearchButtonTitle: '保存至搜索历史',
    //   //           removeRecentSearchButtonTitle: '从搜索历史中移除',
    //   //           favoriteSearchesTitle: '收藏',
    //   //           removeFavoriteSearchButtonTitle: '从收藏中移除'
    //   //         },
    //   //         errorScreen: {
    //   //           titleText: '无法获取结果',
    //   //           helpText: '你可能需要检查你的网络连接'
    //   //         },
    //   //         footer: {
    //   //           selectText: '选择',
    //   //           navigateText: '切换',
    //   //           closeText: '关闭',
    //   //           searchByText: '搜索提供者'
    //   //         },
    //   //         noResultsScreen: {
    //   //           noResultsText: '无法找到相关结果',
    //   //           suggestedQueryText: '你可以尝试查询',
    //   //           reportMissingResultsText: '你认为该查询应该有结果？',
    //   //           reportMissingResultsLinkText: '点击反馈'
    //   //         }
    //   //       }
    //   //     }
    //   //   }
    //   // }
    // }
  }
};
