import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { getUser, User } from '@/services/user';
import { ConnectState } from '@/models/connect';
import { Permission, queryPermissionList } from '@/services/permission';
import { ListQueryContainer } from '@/services/base';

const pathToRegexp = require('path-to-regexp');

export interface UserDetailStateType {
  user?: User;
  id: number;
  permissions: {
    data: Permission[];
    page: number;
    pageSize: number;
    count: number;
  };
}

export interface UserDetailType {
  namespace: string;
  reducers: {
    setUserId: Reducer<UserDetailStateType>;
    onQueryUserSuccess: Reducer<UserDetailStateType>;
    onQueryPermissionSuccess: Reducer<UserDetailStateType>;
  };
  state: UserDetailStateType;
  effects: {
    queryUser: Effect;
    queryPermission: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserDetail: UserDetailType = {
  namespace: 'userDetail',
  state: {
    id: 0,
    permissions: {
      data: [],
      count: 0,
      page: 1,
      pageSize: 20,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const regexp = pathToRegexp('/users/:userId(\\d+)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setUserId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryUser',
          });
        }
      });
    },
  },
  effects: {
    *queryUser(_, { call, put, select }) {
      const userDetailState: UserDetailStateType = yield select(
        (state: ConnectState) => state.userDetail,
      );
      const user: User = yield call(getUser, { id: userDetailState.id });
      yield put({
        type: 'onQueryUserSuccess',
        payload: {
          user,
        },
      });
    },
    *queryPermission(state, { call, put, select }) {
      const userDetailState: UserDetailStateType = yield select(
        (state: ConnectState) => state.userDetail,
      );
      const permissions: ListQueryContainer<Permission> = yield call(queryPermissionList, {});
    },
  },
  reducers: {
    setUserId(state: UserDetailStateType, { payload: { id } }): UserDetailStateType {
      return {
        ...state,
        id,
      };
    },
    onQueryUserSuccess(state, { payload: { user } }) {
      return {
        ...state,
        user,
      };
    },
  },
};
export default UserDetail;
