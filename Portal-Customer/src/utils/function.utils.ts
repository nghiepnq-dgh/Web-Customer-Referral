import { notification } from 'antd';
import { formatMessage, history } from 'umi';
import { resetDataWhenLogout } from './utils';
import { stringify } from 'querystring';

export const handleErrorUtil = (error: any, message: any, statusCode?: number) => {
  if (message && Array.isArray(message)) {
    message.map(err => {
      notification.error({
        message: error ? error : formatMessage({ id: 'error.serverError' }),
        description: err ? err : formatMessage({ id: 'error.wait' }),
      });
    });
  } else {
    notification.error({
      message: error ? error : formatMessage({ id: 'error.serverError' }),
      description: message ? message : formatMessage({ id: 'error.wait' }),
    });
  }
};

export const deleteNullObject = (data: any) => {
  const newObject = { ...data };
  Object.keys(data).map(key => {
    if (data[key] === null || data[key] === undefined || data[key] === '') {
      delete newObject[key];
    }
  });
  return newObject;
};
