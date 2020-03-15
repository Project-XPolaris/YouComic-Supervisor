import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {ListQueryContainer} from "@/services/base";
import {queryUserList, User} from "@/services/user";
import {getPaginationFromURL} from "@/utils/uri";
import {ConnectState} from "@/models/connect";
import {queryPermissionList} from "@/services/permission";

export interface UserListModelStateType {
  users: User[]
  page: number
  pageSize: number
  count: number
}

export interface UserListModelType {
  namespace: string,
  reducers: {
    onQueryUsersSuccess: Reducer<UserListModelStateType>
    setPage: Reducer<UserListModelStateType>
  }
  state: UserListModelStateType
  effects: {
    getUserList: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const UserListModel: UserListModelType = {
  namespace: 'userList',
  state: {
    users: [],
    page: 1,
    pageSize: 20,
    count: 0
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location: any) => {
        if (location.pathname === '/users') {
          const {page, pageSize} = getPaginationFromURL(location.query, 1, 20)
          dispatch({
            type: "setPage",
            payload: {
              page, pageSize
            }
          })
          dispatch({
            type: "getUserList"
          })
        }
      });
    },
  },
  effects: {
    * getUserList(_, {call, put, select}) {
      const userListState: UserListModelStateType = yield select((state: ConnectState) => state.userList)
      const users: ListQueryContainer<User> = yield call(queryUserList, {
        page: userListState.page,
        pageSize: userListState.pageSize
      })
      yield put({
        type: "onQueryUsersSuccess",
        payload: {
          users: users.result,
          count: users.count,
          page: users.page,
          pageSize: users.pageSize
        }
      })
    }
  },
  reducers: {
    onQueryUsersSuccess(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    setPage(state, {payload: {page, pageSize}}) {
      return {
        ...state,
        page,
        pageSize
      }
    }
  },

};
export default UserListModel;
