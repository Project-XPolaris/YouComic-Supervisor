import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {ListQueryContainer} from "@/services/base";
import {getPaginationFromURL} from "@/utils/uri";
import {ConnectState} from "@/models/connect";
import {Permission, queryPermissionList} from "@/services/permission";

export interface PermissionListModelStateType {
  permissions: Permission[]
  page: number
  pageSize: number
  count: number
}

export interface PermissionListModelType {
  namespace: string,
  reducers: {
    onQueryPermissionsSuccess: Reducer<PermissionListModelStateType>
    setPage: Reducer<PermissionListModelStateType>
  }
  state: PermissionListModelStateType
  effects: {
    getPermissionsList: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const PermissionListModel: PermissionListModelType = {
  namespace: 'permissionList',
  state: {
    permissions: [],
    page: 1,
    pageSize: 20,
    count: 0
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location: any) => {
        if (location.pathname === '/permissions') {
          const {page, pageSize} = getPaginationFromURL(location.query, 1, 20)
          dispatch({
            type: "setPage",
            payload: {
              page, pageSize
            }
          })
          dispatch({
            type: "getPermissionsList"
          })
        }
      });
    },
  },
  effects: {
    * getPermissionsList(_, {call, put, select}) {
      const permissionListState: PermissionListModelStateType = yield select((state: ConnectState) => state.permissionList)
      const permissions: ListQueryContainer<Permission> = yield call(queryPermissionList, {
        page: permissionListState.page,
        pageSize: permissionListState.pageSize
      })
      yield put({
        type: "onQueryPermissionsSuccess",
        payload: {
          permissions: permissions.result,
          count: permissions.count,
          page: permissions.page,
          pageSize: permissions.pageSize
        }
      })
    }
  },
  reducers: {
    onQueryPermissionsSuccess(state, {payload}) {
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
export default PermissionListModel;
