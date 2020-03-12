/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {notification} from 'antd';
import {pickBy} from 'lodash'
import ApplicationConfig from "@/config";

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const {response} = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, url} = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};
const apiRequest = extend({
  prefix: ApplicationConfig.apiURL,
  errorHandler,
});

apiRequest.interceptors.request.use((url, options) => {
  options.params = pickBy(options.params, (value) => typeof value !== 'undefined');
  return (
    {
      url,
      options: {...options, credentials: 'same-origin'},
    }
  );
}, {global: true});
apiRequest.interceptors.request.use((url, options) => {
  const token = localStorage.getItem(ApplicationConfig.storeKey.token);
  let {headers} = options;
  if (token != null) {
    headers = {
      ...options.headers,
      'Authorization': token,
    };
  }
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
}, {global: true});
apiRequest.interceptors.request.use((url, options) => {
  const opt = options;
  if (options.params !== undefined && "pageSize" in options.params) {

    opt.params = {
      ...opt.params,
      // @ts-ignore
      page_size: opt.params.pageSize
    }
  }
  return {
    url,
    options: {
      ...opt,
    },
  };
}, {global: true});

export default apiRequest;
