// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/asta/digitech/ReferralFrontend/dashboard/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__customer__login' */'@/pages/customer/login'), loading: require('@/components/PageLoading/index').default}),
    "wrappers": [require('@/layouts/UserLayout').default],
    "exact": true
  },
  {
    "path": "/",
    "exact": false,
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'@/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
    "wrappers": [require('@/layouts/SecurityLayout').default],
    "routes": [
      {
        "path": "/",
        "redirect": "/home",
        "exact": true
      },
      {
        "exact": true,
        "path": "/home",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard__index' */'@/pages/dashboard/index'), loading: require('@/components/PageLoading/index').default}),
        "icon": "DashboardOutlined",
        "name": "dashboard"
      },
      {
        "exact": true,
        "path": "/invitation",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__invitation__index' */'@/pages/invitation/index'), loading: require('@/components/PageLoading/index').default}),
        "icon": "MailOutlined",
        "name": "invitation"
      },
      {
        "exact": false,
        "path": "/report",
        "icon": "ContainerOutlined",
        "name": "report",
        "routes": [
          {
            "exact": true,
            "path": "/report",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__index' */'@/pages/reports/index'), loading: require('@/components/PageLoading/index').default})
          },
          {
            "exact": true,
            "path": "/report/referral/:id",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__referral__id' */'@/pages/reports/referral/[id]'), loading: require('@/components/PageLoading/index').default})
          },
          {
            "exact": true,
            "path": "/report/reward/:id",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__reward__id' */'@/pages/reports/reward/[id]'), loading: require('@/components/PageLoading/index').default})
          }
        ]
      },
      {
        "exact": true,
        "path": "/account/profile",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__profile__index' */'@/pages/profile/index'), loading: require('@/components/PageLoading/index').default})
      },
      {
        "exact": true,
        "path": "/settingpage",
        "icon": "SettingOutlined",
        "name": "settingpage",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__setting__index' */'@/pages/setting/index'), loading: require('@/components/PageLoading/index').default})
      }
    ]
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
