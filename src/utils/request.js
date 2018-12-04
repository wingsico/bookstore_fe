import axios from 'axios';
import { Toast } from 'vant';

Toast.setDefaultOptions({
  duration: 1000,
})

const codeMessage = {
  200: '请求成功',
  201: '修改数据成功',
  204: '删除数据成功',
  400: '请求格式有误',
  401: 'token无效',
  403: '权限不足',
  404: '请求不存在',
  410: '资源已删除',
  422: '验证错误',
  500: '服务器错误',
  502: '网关错误',
  503: '维护中',
  504: '连接超时',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = response.statusText || codeMessage[response.status];
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST'
    || newOptions.method === 'PUT'
    || newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return axios(url, newOptions)
    .then(checkStatus)
    .catch(e => {
      const { response } = e;

      if (!response) {
        Toast.fail(codeMessage[504]);
      }

      const { status, data } = response;
      const errorMessage = data.message || data.error || codeMessage[status];
      e.message = errorMessage;

      if (status === 401) {

      }
      if (status === 404) {

      }
      if (status > 401 || status === 400) {

      }

      Toast.fail({
        message: errorMessage,
        duration: 3000,
      });

      throw e;
    });
}

axios.defaults.timeout = 10000;
