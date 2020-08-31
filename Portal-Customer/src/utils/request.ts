import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import store from 'store';
import { handleErrorUtil } from './function.utils';

const _apiPrefix = process.env.API_URL || 'https://referralsvr.vndigitech.com';

interface FetchOptions extends RequestOptionsInit {
  url: string;
  autoPrefix?: boolean;
}

interface ErrorType {
  message: any;
}

interface FetchResponseType {
  statusCode: number;
  result: object;
  error: ErrorType;
  message: ErrorType;
  response: object;
}

const errorHandler = (error: { response: Response; data: any }): Response => {
  const { response } = error;
  if (!response) {
    notification.error({
      message: 'The internet have a problem !',
      description:
        'Your internet may be interrupted, please connect to server again',
    });
  }
  return error.data;
};

const request = extend({
  errorHandler,
  timeout: 15000,
});

const generateUrl = (url: string, _autoPrefix = false) => {
  if (!_autoPrefix) return url;
  return `${_apiPrefix}/${url}`;
};

export const fetch = async ({
  url,
  headers,
  autoPrefix = true,
  ...options
}: FetchOptions) => {
  const response: FetchResponseType = await request(
    generateUrl(url, autoPrefix),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        ...headers,
      },
      ...options,
    },
  )
  if (response && !response?.statusCode) {
    return { success: true, ...response };
  } else {
    const { error, message } = response;
    handleErrorUtil(error, message);
    return { success: false, ...response };
  }
};

const renderMessage = (message: ErrorType) => {
  if (!message) return 'Error';
  if (typeof message === 'string') return message;
  return message;
};

export const fetchAuth = async ({
  url,
  headers,
  autoPrefix = true,
  ...options
}: FetchOptions) => {
  
  const accessToken = store.get('accessToken');

  if (!accessToken) {
    history.replace(`/login`);
    return { success: false };
  }

  const _url = generateUrl(url, autoPrefix);
  const response: FetchResponseType = await request(
    _url,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
      ...options,
    },
  )

  if (response && !response.statusCode) {
    return { success: true, ...response };
  } else {
    const { error, message, statusCode } = response;

    handleErrorUtil(error, message + ` url: ${_url}`, statusCode);
    return { success: false, ...response };
  }
};
