import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: false,
  targets: {
    ie: 11,
  },
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
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            // },
            {
              path: '/book/:id',
              name: 'bookdetail',
              icon: 'crown',
              component: './book/detail/index',
              authority: ['admin'],
              hideInMenu:true,
              routes:[
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
                }
              ]
            },
            {
              path: '/books',
              name: '书籍',
              icon: 'read',
              authority: ['admin'],
              routes: [
                {
                  path: '/books/list',
                  name: '书籍列表',
                  icon: 'book',
                  component: './book/list/index',
                  authority: ['admin'],
                },
                // {
                //   path: '/books/create',
                //   name: '创建书籍',
                //   icon: 'plus',
                //   component: './book/create/index',
                //   authority: ['admin'],
                // },
              ]
            },
            {
              path: '/tags',
              name: 'tags',
              icon: 'tag',
              component: './tag/list/index',
              authority: ['admin'],
            },

            {
              path: '/tag/:tagId',
              name: 'tagDetail',
              icon: 'tag',
              component: './tag/detail/index',
              authority: ['admin'],
              hideInMenu:true,
            },
            {
              path: '/users/:id',
              name: 'userDetail',
              component: './user/detail/index',
              hideInMenu:true,
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
              hideInMenu:true,

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
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  externals:{

  }
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },

} as IConfig;
