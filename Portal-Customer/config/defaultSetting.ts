import { Settings } from '@ant-design/pro-layout';
export type ContentWidth = 'Fluid' | 'Fixed';

export default {
  title: 'Portal | Customer',
  navTheme: 'dark',
  primaryColor: '#0070B8',
  layout: 'side',
  fixedHeader: true,
  fixSiderbar: false,
  contentWidth: 'Fluid',
  menu: {
    locale: true,
  },
  iconfontUrl: '',
  colorWeak: false,
  collapsed: true,
} as Settings;
