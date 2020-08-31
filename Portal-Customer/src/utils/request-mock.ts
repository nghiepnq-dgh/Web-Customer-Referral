import { extend } from 'umi-request';
import { notification } from 'antd';
const codeMessage = {
  200: 'Notify 200',
  201: 'Notify 201',
  202: 'Notify 202',
  204: 'Notify 204',
  400: 'Notify 400',
  401: 'Notify 401',
  403: 'Notify 403',
  404: 'Notify 404',
  406: 'Notify 406',
  410: 'Notify 410',
  422: 'Notify 422',
  500: 'Notify 500',
  502: 'Notify 502',
  503: 'Notify 503',
  504: 'Notify 504',
};

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Success ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'description failed !',
      message: 'Failed !',
    });
  }

  return response;
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

export default request;
