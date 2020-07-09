import { defineConfig } from 'umi';
 // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
export default defineConfig({
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: './welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './welcome/index',
            },
            {
              path: '/book/:id',
              name: 'bookdetail',
              icon: 'crown',
              component: './book/detail/index',
              authority: ['admin'],
              hideInMenu: true,
              routes: [
                {
                  path: '/book/:id/info',
                  name: 'bookdetailinfo',
                  icon: 'crown',
                  component: './book/detail/info/index',
                  authority: ['admin'],
                },
                {
                  path: '/book/:id/tags',
                  name: 'bookdetailtags',
                  icon: 'crown',
                  component: './book/detail/tag/index',
                  authority: ['admin'],
                },
                {
                  path: '/book/:id/pages',
                  name: 'bookdetailpages',
                  icon: 'crown',
                  component: './book/detail/page/index',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/books',
              name: 'books',
              icon: 'read',
              authority: ['admin'],
              routes: [
                {
                  path: '/books/list',
                  name: 'bookList',
                  icon: 'book',
                  component: './book/list/index',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'library',
              path: '/libraries',
              icon: 'read',
              authority: ['admin'],
              routes: [
                {
                  name: 'libraryList',
                  icon: 'smile',
                  path: '/libraries/list',
                  component: './library/LibraryListPage',
                },
              ],
            },
            {
              path: '/tags',
              name: 'tags',
              icon: 'TagOutlined',
              component: './tag/list/index',
              authority: ['admin'],
            },
            {
              path: '/tag/:tagId',
              name: 'tagDetail',
              icon: 'tag',
              component: './tag/detail/index',
              authority: ['admin'],
              hideInMenu: true,
            },
            {
              path: '/users/create',
              name: 'createUser',
              hideInMenu: true,
              component: './user/create/index',
              authority: ['admin'],
            },
            {
              path: '/users/:id',
              name: 'userDetail',
              component: './user/detail/index',
              hideInMenu: true,
              authority: ['admin'],
            },
            {
              path: '/users',
              name: 'users',
              icon: 'user',
              component: './user/list/index',
              authority: ['admin'],
            },
            {
              path: '/permissions',
              name: 'permissions',
              icon: 'key',
              component: './permission/list/index',
              authority: ['admin'],
            },
            {
              path: '/usergroups',
              name: 'usergroups',
              icon: 'TeamOutlined',
              component: './usergroup/list/index',
              authority: ['admin'],
            },
            {
              path: '/usergroup/:id',
              name: 'usergroup',
              icon: 'TeamOutlined',
              component: './usergroup/detail/index',
              authority: ['admin'],
              hideInMenu: true,
            },
            {
              path: '/account/setting',
              name: 'accountSetting',
              component: './account/setting/index',
              hideInMenu: true,
              authority: ['admin'],
            },


            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  publicPath: './',
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/index',
  // },
  dva: {},
  antd: {

  },
  history: { type: 'hash' },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  externals: {}, // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
});
