// @ts-nocheck
import './core/polyfill';
import '@@/core/devScripts';
import '/Users/asta/digitech/ReferralFrontend/dashboard/node_modules/intl/index.js';
import { plugin } from './core/plugin';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/asta/digitech/ReferralFrontend/dashboard/node_modules/@umijs/runtime';
import { renderClient } from '/Users/asta/digitech/ReferralFrontend/dashboard/node_modules/@umijs/renderer-react/dist/index.js';
import { routes } from './core/routes';



require('./plugin-locale/locale')._onCreate();

(() => {
  // Runtime block add component
  window.GUmiUIFlag = require('/Users/asta/digitech/ReferralFrontend/dashboard/node_modules/@umijs/plugin-ui-blocks/lib/sdk/flagBabelPlugin/GUmiUIFlag.js').default;

  // Enable/Disable block add edit mode
  window.addEventListener('message', (event) => {
    try {
      const { action, data } = JSON.parse(event.data);
      switch (action) {
        case 'umi.ui.checkValidEditSection':
          const haveValid = !!document.querySelectorAll('div.g_umiuiBlockAddEditMode').length;
          const frame = document.getElementById('umi-ui-bubble');
          if (frame && frame.contentWindow) {
            frame.contentWindow.postMessage(
              JSON.stringify({
                action: 'umi.ui.checkValidEditSection.success',
                payload: {
                  haveValid,
                },
              }),
              '*',
            );
          }
        default:
          break;
      }
    } catch(e) {
    }
  }, false);
})();
  

const getClientRender = (args: { hot?: boolean; routes: any[] } = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    return renderClient({
      // @ts-ignore
      routes: args.routes,
      plugin,
      history: createHistory(args.hot),
      isServer: process.env.__IS_SERVER,
      dynamicImport: true,
      rootElement: 'root',
      defaultTitle: `Portal | Customer`,
    });
  },
  args,
});

const clientRender = getClientRender({ routes });
export default clientRender();


    window.g_umi = {
      version: '3.2.5',
    };
  

    (() => {
      try {
        const ua = window.navigator.userAgent;
        const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
        if (isIE) return;

        // Umi UI Bubble
        require('/Users/asta/digitech/ReferralFrontend/dashboard/node_modules/@umijs/preset-ui/lib/bubble').default({
          port: 3000,
          path: '/Users/asta/digitech/ReferralFrontend/dashboard',
          currentProject: '',
          isBigfish: undefined,
        });
      } catch (e) {
        console.warn('Umi UI render error:', e);
      }
    })();
  

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    const ret = require('./core/routes');
    if (ret.then) {
      ret.then(({ routes }) => {
        getClientRender({ hot: true, routes })();
      });
    } else {
      getClientRender({ hot: true, routes: ret.routes })();
    }
  });
}
