import { IRoute } from 'umi';

export const routes: IRoute[] = [
  {
    path: '/login',
    component:'@/pages/customer/login',
    wrappers:['@/layouts/UserLayout']
  },
  {
    path: '/',
    exact: false,
    component: '@/layouts/BasicLayout',
    wrappers: ['@/layouts/SecurityLayout'],
    routes:[
      {
        path:'/',
        redirect:'/home'
      },
      {
        exact:true,
        path:'/home',
        component:'@/pages/dashboard/index',
        icon:'DashboardOutlined',
        name:'dashboard'
      },
      {
        exact:true,
        path:'/invitation',
        component:'@/pages/invitation/index',
        icon:'MailOutlined',
        name:'invitation'
      },
      {
        exact:false,
        path:'/report',
        icon:'ContainerOutlined',
        name:'report',
        routes:[
          {
            exact: true,
            path:'/report',
            component:'@/pages/reports/index',
          },
          {
            exact: true,
            path:'/report/referral/:id',
            component:'@/pages/reports/referral/[id]'
          },
          {
            exact: true,
            path:'/report/reward/:id',
            component:'@/pages/reports/reward/[id]'
          }
        ]
      },
      {
        exact: true,
        path:'/account/profile',
        component:'@/pages/profile/index',
      },
      {
        exact: true,
        path:'/settingpage',
        icon:'SettingOutlined',
        name:'settingpage',
        component:'@/pages/setting/index',
      },
    ]
  },
];
