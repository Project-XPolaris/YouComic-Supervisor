import { Effect, Subscription } from 'dva';
import { Reducer } from 'redux';
import { message } from 'antd';
import { ListQueryContainer } from '@/services/base';
import { queryUserList, User } from '@/services/user';
import ApplicationConfig from '@/config';
import { ConnectState } from '@/models/connect';
import { changeUserNickname, changeUserPassword } from '@/services/account';
import { ChangePasswordDialogKey } from '@/pages/account/setting/panels/SecurityPanel';

export interface AccountSettingStateType {
  currentUser?: User;
  accountPanel: {
    update?: { [key: string]: any };
  };
}

export interface AccountSettingType {
  namespace: string;
  reducers: {
    onQueryCurrentUserSuccess: Reducer;
    setUpdateUser: Reducer;
    resetUserUpdate: Reducer;
  };
  state: AccountSettingStateType;
  effects: {
    loadUser: Effect;
    applyUserUpdate: Effect;
    changePassword: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const AccountSetting: AccountSettingType = {
  namespace: 'accountSetting',
  state: {
    accountPanel: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location: any) => {
        if (location.pathname === '/account/setting') {
          dispatch({
            type: 'loadUser',
          });
        }
      });
    },
  },
  effects: {
    *loadUser(_, { call, put }) {
      const userId = localStorage.getItem(ApplicationConfig.storeKey.userId);
      if (userId === null) {
        return;
      }
      const userList: ListQueryContainer<User> = yield call(queryUserList, { id: Number(userId) });
      if (userList.count > 0) {
        yield put({
          type: 'onQueryCurrentUserSuccess',
          payload: {
            user: userList.result[0],
          },
        });
      }
    },
    *applyUserUpdate(_, { call, put, select }) {
      const accountSettingState: AccountSettingStateType = yield select(
        (state: ConnectState) => state.accountSetting,
      );
      const { update } = accountSettingState.accountPanel;
      if (update === undefined) {
        return;
      }
      if (update.nickname) {
        yield call(changeUserNickname, { nickname: update.nickname });
      }
      yield put({
        type: 'loadUser',
      });
      yield put({
        type: 'resetUserUpdate',
      });
      message.success('保存成功');
    },
    *changePassword({ payload: { oldPassword, newPassword } }, { call, put }) {
      yield call(changeUserPassword, { oldPassword, newPassword });
      yield put({
        type: 'dialog/setDialogActive',
        payload: {
          key: ChangePasswordDialogKey,
          isActive: false,
        },
      });
      message.success('修改密码成功');
    },
  },
  reducers: {
    onQueryCurrentUserSuccess(state, { payload: { user } }) {
      return {
        ...state,
        currentUser: user,
      };
    },
    setUpdateUser(state: AccountSettingStateType, { payload: { field, value } }) {
      const { update = {} } = state.accountPanel;
      return {
        ...state,
        accountPanel: {
          ...state.accountPanel,
          update: {
            ...update,
            [field]: value,
          },
        },
      };
    },
    resetUserUpdate(state) {
      return {
        ...state,
        accountPanel: {
          ...state.accountPanel,
          update: undefined,
        },
      };
    },
  },
};
export default AccountSetting;
