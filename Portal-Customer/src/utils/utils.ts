import { parse } from 'querystring';
import store from 'store';
import { setCookie } from './cookie';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getStateFromStore = (key: string) => {
  if (!key) return null;
  const data = store.get(key);
  if (!data || typeof data !== 'string') return data;
  try {
    const _parsedData = JSON.parse(data);
    return _parsedData;
  } catch (error) {
    return data;
  }
};

export const resetDataWhenLogout = () => {
  store.set('accessToken', null);
  setCookie('ssoToken', '');
}
