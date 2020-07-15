import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {getUser, getUserUserGroups, User} from '@/services/user';
import {ConnectState} from '@/models/connect';
import {Permission, queryPermissionList} from '@/services/permission';
import {ListQueryContainer} from '@/services/base';
import {UserGroup} from "@/services/usergroup";

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
  groups: {
    data?: UserGroup[]
    page: number
    pageSize: number
    count: number
  }
}

export interface UserDetailType {
  namespace: string;
  reducers: {
    setUserId: Reducer<UserDetailStateType>;
    onQueryUserSuccess: Reducer<UserDetailStateType>;
    onQueryPermissionSuccess: Reducer<UserDetailStateType>;
    onQueryUserGroupSuccess: Reducer
  };
  state: UserDetailStateType;
  effects: {
    queryUser: Effect;
    queryPermission: Effect;
    queryUserGroup: Effect
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
    groups: {
      count: 0,
      page: 1,
      pageSize: 20
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
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
          dispatch({
            type: 'queryPermission',
          });
          dispatch({
            type: 'queryUserGroup',
          });
        }
      });
    },
  },
  effects: {
    * queryUser(_, {call, put, select}) {
      const userDetailState: UserDetailStateType = yield select(
        (state: ConnectState) => state.userDetail,
      );
      const user: User = yield call(getUser, {id: userDetailState.id});
      yield put({
        type: 'onQueryUserSuccess',
        payload: {
          user,
        },
      });
    },
    * queryPermission(_, {call, put, select}) {
      const userDetailState: UserDetailStateType = yield select((state: ConnectState) => state.userDetail,
      );
      const permissions: ListQueryContainer<Permission> = yield call(queryPermissionList, {user: userDetailState.id});
      yield put({
        type: "onQueryPermissionSuccess",
        payload: {
          permissions: permissions.result,
          page: permissions.page,
          pageSize: permissions.pageSize,
          count: permissions.count
        }
      })
    },
    * queryUserGroup(_, {call, put, select}) {
      const userDetailState: UserDetailStateType = yield select((state: ConnectState) => state.userDetail);
      const response: ListQueryContainer<UserGroup> = yield call(getUserUserGroups, {id: userDetailState.id});
      yield put({
        type: "onQueryUserGroupSuccess",
        payload: response
      })
    }
  },
  reducers: {
    setUserId(state: UserDetailStateType, {payload: {id}}): UserDetailStateType {
      return {
        ...state,
        id,
      };
    },
    onQueryUserSuccess(state, {payload: {user}}) {
      return {
        ...state,
        user,
      };
    },
    onQueryPermissionSuccess(state, {payload: {permissions, page, pageSize, count}}) {
      return {
        ...state,
        permissions: {
          data: permissions,
          page,
          pageSize,
          count
        }
      }
    },
    onQueryUserGroupSuccess(state, {payload}) {
      const {result, page, pageSize, count} = payload
      return {
        ...state,
        groups: {
          data: result,
          page,
          pageSize,
          count
        }
      }
    }
  },
};
export default UserDetail;
