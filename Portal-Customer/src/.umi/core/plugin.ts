// @ts-nocheck
import { Plugin } from '/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['patchRoutes','rootContainer','render','onRouteChange','dva','getInitialState','request',],
});
plugin.register({
  apply: require('/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/node_modules/umi-plugin-antd-icon-config/lib/app.js'),
  path: '/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/node_modules/umi-plugin-antd-icon-config/lib/app.js',
});
plugin.register({
  apply: require('/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/src/.umi/plugin-access/rootContainer.ts'),
  path: '/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/src/.umi/plugin-access/rootContainer.ts',
});
plugin.register({
  apply: require('/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/src/.umi/plugin-dva/runtime.tsx'),
  path: '/Users/asta/digitech/FE-Customer-Referral/Portal-Customer/src/.umi/plugin-dva/runtime.tsx',
});
plugin.register({
  apply: require('../plugin-initial-state/runtime'),
  path: '../plugin-initial-state/runtime',
});
plugin.register({
  apply: require('../plugin-model/runtime'),
  path: '../plugin-model/runtime',
});

export { plugin };
