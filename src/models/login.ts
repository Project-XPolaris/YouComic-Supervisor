import {stringify} from 'querystring';
import {history} from 'umi';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {getAuth, getUserUserGroups, UserAuth, UserGroup} from '@/services/user';
import {ApiErrorResponse, ListQueryContainer} from '@/services/base';
import ApplicationConfig from '@/config';
import {Effect, Reducer} from "@@/plugin-dva/connect";

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
      const response: UserAuth | ApiErrorResponse = yield call(getAuth, payload);
      // login error
      if ("success" in response && !response.success) {
        return;
      }

      // login success
      if (!("sign" in response)){
        return
      }
      yield put({
        type: 'setUserAuthority',
        payload: {
          sign: response.sign,
          id: response.id,
        },
      });

      // query user's groups
      const userGroups: ListQueryContainer<UserGroup> | ApiErrorResponse = yield call(getUserUserGroups, { id: response.id });
      // query user's group failed
      if ("success" in userGroups && !userGroups.success) {
        return;
      }
      if (!("result" in userGroups)){
        return
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          groups: userGroups.result.map((group:UserGroup) => group.name),
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
