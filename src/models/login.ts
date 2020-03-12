import {Reducer} from 'redux';
import {Effect} from 'dva';
import {stringify} from 'querystring';
import {router} from 'umi';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {getAuth, getUserUserGroups, UserGroup} from "@/services/user";
import {ListQueryContainer} from "@/services/base";
import ApplicationConfig from "@/config";

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
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(getAuth, payload);
      const userGroups: ListQueryContainer<UserGroup> = yield call(getUserUserGroups, {id: response.id})
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          groups: userGroups.result.map(group => (group.name))
        },
      });
      // Login successfully
      if ("sign" in response) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };
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
        router.replace(redirect || '/');
      }
    },

    logout() {
      const {redirect} = getPageQuery();
      localStorage.removeItem(ApplicationConfig.storeKey.token)
      localStorage.removeItem(ApplicationConfig.storeKey.userId)
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      localStorage.setItem(ApplicationConfig.storeKey.token, payload.sign);
      localStorage.setItem(ApplicationConfig.storeKey.userId, payload.id);
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
