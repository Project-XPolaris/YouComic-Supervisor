import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {ConnectState} from "@/models/connect";
import {ListQueryContainer} from "@/services/base";
import {
  addPermissionsToUserGroup,
  addUserToUserGroup,
  queryUserGroupList, removePermissionFromUserGroup,
  removeUserFromUserGroup,
  UserGroup
} from "@/services/usergroup";
import {Permission, queryPermissionList} from "@/services/permission";
import {queryUserList, User} from "@/services/user";
import {AddPermissionDialogKey, AddUserDialogKey} from "@/pages/usergroup/detail/components/HeaderAction";
import {message} from "antd";

const pathToRegexp = require('path-to-regexp');

export interface UserGroupDetailStateType {
  id: number
  userGroup?: UserGroup
  permissionsPanel: {
    permissions: Permission[]
    pageSize: number
    page: number
    count: number
    selectedPermissionIds: number[]
  }
  usersPanel: {
    users: User[]
    pageSize: number
    page: number
    count: number
    selectedUserIds: number[]
  }
  searchPermissions: {
    searchId: number
    permissions: Permission[]
  }
  searchUsers: {
    searchId: number
    users: User[]
  }
}

export interface UserGroupDetailType {
  namespace: string,
  reducers: {
    setUserGroupId: Reducer
    onQueryUserGroupSuccess: Reducer
    onQueryPermissionSuccess: Reducer
    onQueryUsersSuccess: Reducer
    setSearchPermissionId: Reducer
    onSearchPermissionSuccess: Reducer
    setSearchUserId: Reducer
    onSearchUserSuccess: Reducer
    setSelectedPermissionIds: Reducer
    setSelectedUserIds: Reducer
  }
  state: UserGroupDetailStateType
  effects: {
    queryUserGroup: Effect
    queryPermissions: Effect
    queryUsers: Effect
    searchPermission: Effect
    searchUser: Effect
    addUsersToUserGroup: Effect
    addPermissionsToUserGroup: Effect
    removeSelectedUserFromUserGroup: Effect
    removeSelectedPermissionFromUserGroup: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const UserGroupDetail: UserGroupDetailType = {
  namespace: 'userGroupDetail',
  state: {
    id: 0,
    permissionsPanel: {
      permissions: [],
      page: 1,
      pageSize: 20,
      count: 0,
      selectedPermissionIds: []
    },
    usersPanel: {
      users: [],
      page: 1,
      pageSize: 20,
      count: 0,
      selectedUserIds: []
    },
    searchPermissions: {
      searchId: 0,
      permissions: []
    },
    searchUsers: {
      users: [],
      searchId: 0
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const regexp = pathToRegexp('/usergroup/:groupId(\\d+)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setUserGroupId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryUserGroup',
          });
          dispatch({
            type: 'queryPermissions',
          });
          dispatch({
            type: 'queryUsers',
          });
        }
      });
    },
  },
  effects: {
    * queryUserGroup(_, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      const userGroups: ListQueryContainer<UserGroup> = yield call(queryUserGroupList, {id: userGroupDetailState.id})
      if (userGroups.count !== 0) {
        yield put({
          type: "onQueryUserGroupSuccess",
          payload: {
            userGroup: userGroups.result[0]
          }
        })
      }
    },
    * queryPermissions(_, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      const permissions: ListQueryContainer<Permission> = yield call(queryPermissionList, {
        usergroup: userGroupDetailState.id,
        page: userGroupDetailState.permissionsPanel.page,
        pageSize: userGroupDetailState.permissionsPanel.pageSize
      })
      yield put({
        type: "onQueryPermissionSuccess",
        payload: {
          permissions: permissions.result,
          count: permissions.count,
          page: permissions.page,
          pageSize: permissions.pageSize
        }
      })
    },
    * queryUsers(state, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      const users: ListQueryContainer<User> = yield call(queryUserList, {usergroup: userGroupDetailState.id})
      yield put({
        type: "onQueryUsersSuccess",
        payload: {
          users: users.result,
          count: users.count,
          page: users.page,
          pageSize: users.pageSize
        }
      })
    },
    * searchPermission({payload: {key}}, {call, put, select}) {
      let userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      const searchId = userGroupDetailState.searchPermissions.searchId + 1
      yield put({
        type: "setSearchPermissionId",
        payload: {
          id: searchId
        }
      })
      const permissions: ListQueryContainer<Permission> = yield call(queryPermissionList, {
        nameSearch: key,
        pageSize: 6
      })
      userGroupDetailState = yield select((state: ConnectState) => state.userGroupDetail)
      if (searchId === userGroupDetailState.searchPermissions.searchId) {
        yield put({
          type: "onSearchPermissionSuccess",
          payload: {
            permissions: permissions.result
          }
        })
      }

    },
    * searchUser({payload: {key}}, {call, put, select}) {
      let userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      const searchId = userGroupDetailState.searchUsers.searchId + 1
      yield put({
        type: "setSearchUserId",
        payload: {
          id: searchId
        }
      })
      const users: ListQueryContainer<User> = yield call(queryUserList, {
        nameSearch: key,
        pageSize: 6
      })
      userGroupDetailState = yield select((state: ConnectState) => state.userGroupDetail)
      if (searchId === userGroupDetailState.searchUsers.searchId) {
        yield put({
          type: "onSearchUserSuccess",
          payload: {
            users: users.result
          }
        })
      }

    },
    * addUsersToUserGroup({payload: {userIds}}, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      yield call(addUserToUserGroup, {userGroupId: userGroupDetailState.id, userIds})
      yield put({
        type: "queryUsers"
      })
      yield put({
        type: "dialog/setDialogActive",
        payload: {
          key: AddUserDialogKey,
          isActive: false
        }
      })
      message.success("添加成功")
    },
    * addPermissionsToUserGroup({payload: {permissionIds}}, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      yield call(addPermissionsToUserGroup, {userGroupId: userGroupDetailState.id, permissionIds})
      yield put({
        type: "queryPermissions"
      })
      yield put({
        type: "dialog/setDialogActive",
        payload: {
          key: AddPermissionDialogKey,
          isActive: false
        }
      })
      message.success("添加成功")
    },
    * removeSelectedUserFromUserGroup(_, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      yield call(removeUserFromUserGroup, {
        userGroupId: userGroupDetailState.id,
        userIds: userGroupDetailState.usersPanel.selectedUserIds
      })
      yield put({
        type: "queryUsers"
      })
      yield put({
        type: "setSelectedUserIds",
        payload: {
          selectedUserIds: []
        }
      })
      message.success("已从用户组中移除")
    },
    * removeSelectedPermissionFromUserGroup(_, {call, put, select}) {
      const userGroupDetailState: UserGroupDetailStateType = yield select((state: ConnectState) => state.userGroupDetail)
      yield call(removePermissionFromUserGroup, {
        userGroupId: userGroupDetailState.id,
        permissionIds: userGroupDetailState.permissionsPanel.selectedPermissionIds
      })
      yield put({
        type:"queryPermissions"
      })
      yield put({
        type: "setSelectedPermissionIds",
        payload: {
          selectedPermissionIds: []
        }
      })
      message.success("已从用户组中移除")
    }
  },
  reducers: {
    setUserGroupId(state, {payload: {id}}) {
      return {
        ...state,
        id
      }
    },
    onQueryUserGroupSuccess(state, {payload: {userGroup}}) {
      return {
        ...state,
        userGroup
      }
    },
    onQueryPermissionSuccess(state: UserGroupDetailStateType, {payload}) {
      return {
        ...state,
        permissionsPanel: {
          ...state.permissionsPanel,
          ...payload
        }
      }
    },
    onQueryUsersSuccess(state: UserGroupDetailStateType, {payload}) {
      return {
        ...state,
        usersPanel: {
          ...state.usersPanel,
          ...payload
        }
      }
    },
    setSearchPermissionId(state: UserGroupDetailStateType, {payload: {id}}) {
      return {
        ...state,
        searchPermissions: {
          ...state.searchPermissions,
          searchId: id
        }
      }
    },
    onSearchPermissionSuccess(state, {payload: {permissions}}) {
      return {
        ...state,
        searchPermissions: {
          ...state.searchPermissions,
          permissions
        }
      }
    },
    setSearchUserId(state: UserGroupDetailStateType, {payload: {id}}) {
      return {
        ...state,
        searchUsers: {
          ...state.searchUsers,
          searchId: id
        }
      }
    },
    onSearchUserSuccess(state, {payload: {users}}) {
      return {
        ...state,
        searchUsers: {
          ...state.searchUsers,
          users
        }
      }
    },
    setSelectedUserIds(state, {payload: {selectedUserIds}}) {
      return {
        ...state,
        usersPanel: {
          ...state.usersPanel,
          selectedUserIds
        }
      }
    },
    setSelectedPermissionIds(state, {payload: {selectedPermissionIds}}) {
      return {
        ...state,
        permissionsPanel: {
          ...state.permissionsPanel,
          selectedPermissionIds
        }
      }
    }
  },

};
export default UserGroupDetail;
