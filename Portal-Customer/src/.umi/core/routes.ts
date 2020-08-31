// @ts-nocheck
import { ApplyPluginsType } from '/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/customer/login",
    "exact": true,
    "component": require('@/pages/customer/login.tsx').default
  },
  {
    "path": "/dashboard",
    "exact": true,
    "component": require('@/pages/dashboard/index.tsx').default
  },
  {
    "path": "/invitation",
    "exact": true,
    "component": require('@/pages/invitation/index.tsx').default
  },
  {
    "path": "/invitation/share",
    "exact": true,
    "component": require('@/pages/invitation/share.tsx').default
  },
  {
    "path": "/profile",
    "exact": true,
    "component": require('@/pages/profile/index.tsx').default
  },
  {
    "path": "/reports",
    "exact": true,
    "component": require('@/pages/reports/index.tsx').default
  },
  {
    "path": "/reports/referral",
    "exact": true,
    "component": require('@/pages/reports/referral/index.tsx').default
  },
  {
    "path": "/reports/referral/:id",
    "exact": true,
    "component": require('@/pages/reports/referral/[id].tsx').default
  },
  {
    "path": "/reports/reward/demo_column",
    "exact": true,
    "component": require('@/pages/reports/reward/demo_column.tsx').default
  },
  {
    "path": "/reports/reward",
    "exact": true,
    "component": require('@/pages/reports/reward/index.tsx').default
  },
  {
    "path": "/reports/reward/:id",
    "exact": true,
    "component": require('@/pages/reports/reward/[id].tsx').default
  },
  {
    "path": "/setting",
    "exact": true,
    "component": require('@/pages/setting/index.tsx').default
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
