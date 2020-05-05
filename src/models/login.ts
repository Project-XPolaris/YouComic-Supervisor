import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { history } from 'umi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { getAuth, getUserUserGroups, UserAuth, UserGroup } from '@/services/user';
import { ListQueryContainer } from '@/services/base';
import ApplicationConfig from '@/config';
import { RequestExtendResponse } from '@/utils/request';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
    setUserAuthority: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response: UserAuth & RequestExtendResponse = yield call(getAuth, payload);
      if (!response.success) {
        return;
      }
      yield put({
        type: 'setUserAuthority',
        payload: {
          sign: response.sign,
          id: response.id,
        },
      });
      const userGroups: ListQueryContainer<UserGroup> &
        RequestExtendResponse = yield call(getUserUserGroups, { id: response.id });
      if (!response.success) {
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          groups: userGroups.result.map(group => group.name),
        },
      });
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params as { redirect: string };
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }
      history.replace(redirect || '/');
    },

    logout() {
      const { redirect } = getPageQuery();
      localStorage.removeItem(ApplicationConfig.storeKey.token);
      localStorage.removeItem(ApplicationConfig.storeKey.userId);
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    setUserAuthority(state, { payload: { id, sign } }) {
      localStorage.setItem(ApplicationConfig.storeKey.token, sign);
      localStorage.setItem(ApplicationConfig.storeKey.userId, id);
      return {
        ...state,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.groups);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
