import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {getPaginationFromURL} from "@/utils/uri";
import {ConnectState} from "@/models/connect";
import {ListQueryContainer} from "@/services/base";
import {createUserGroup, queryUserGroupList, UserGroup} from "@/services/usergroup";
import {CreateUserGroupDialogKey} from "@/pages/usergroup/list/components/HeaderAction";
import {differenceWith} from 'lodash'

export interface UserGroupListStateType {
  userGroups: UserGroup[]
  page: number
  pageSize: number
  count: number
  selectedUserGroupId: []
}

export interface UserGroupListType {
  namespace: string,
  reducers: {
    onQueryUserGroupsSuccess: Reducer<UserGroupListStateType>
    setPage: Reducer<UserGroupListStateType>
    addSelectUserGroup: Reducer
    removeSelectUserGroup: Reducer
    setSelectUserGroup:Reducer
  }
  state: UserGroupListStateType
  effects: {
    queryUserGroups: Effect
    createUserGroup: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const UserGroupList: UserGroupListType = {
  namespace: 'userGroupList',
  state: {
    userGroups: [],
    page: 1,
    pageSize: 20,
    count: 0,
    selectedUserGroupId: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location: any) => {
        if (location.pathname === '/usergroups') {
          const {page, pageSize} = getPaginationFromURL(location.query, 1, 20)
          dispatch({
            type: "setPage",
            payload: {
              page, pageSize
            }
          })
          dispatch({
            type: "queryUserGroups"
          })
        }
      });
    },
  },
  effects: {
    * queryUserGroups(_, {call, put, select}) {
      const userGroupListState: UserGroupListStateType = yield select((state: ConnectState) => state.userGroupList)
      const userGroups: ListQueryContainer<UserGroup> = yield call(queryUserGroupList, {
        page: userGroupListState.page,
        pageSize: userGroupListState.pageSize
      })
      yield put({
        type: "onQueryUserGroupsSuccess",
        payload: {
          userGroups: userGroups.result,
          page: userGroups.page,
          pageSize: userGroups.pageSize,
          count: userGroups.count
        }
      })
    },
    * createUserGroup({payload: {name}}, {call, put, select}) {
      const userGroup: UserGroup = yield call(createUserGroup, {name})
      yield put({
        type: "queryUserGroups"
      })
      yield put({
        type: "dialog/setDialogActive",
        payload: {
          key: CreateUserGroupDialogKey,
          isActive: false
        }
      })
    }
  },
  reducers: {
    onQueryUserGroupsSuccess(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    setPage(state, {payload: {page, pageSize}}: { payload: { page: number, pageSize: number } }) {
      return {
        ...state,
        page, pageSize
      }
    },
    addSelectUserGroup(state, {payload: {userGroupIds}}) {
      return {
        ...state,
        selectedUserGroupId: [
          ...state.selectedUserGroupId,
          ...userGroupIds
        ]
      }
    },
    removeSelectUserGroup(state, {payload: {userGroupIds}}) {
      return {
        ...state,
        selectedUserGroupId: [...differenceWith<number, number>(state?.selectedUserGroupId, userGroupIds, (a, b) => a === b)]
      }
    },
    setSelectUserGroup(state,{payload:{userGroupIds}}){
      return {
        ...state,
        selectedUserGroupId:[...userGroupIds]
      }
    }
  },

};
export default UserGroupList;
