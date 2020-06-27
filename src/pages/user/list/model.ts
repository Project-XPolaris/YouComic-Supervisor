import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {ListQueryContainer} from '@/services/base';
import {queryUserList, User} from '@/services/user';
import {getOrdersFromUrlQuery, getPaginationFromURL} from '@/utils/uri';
import {ConnectState} from '@/models/connect';

export interface UserFilter {
  orders: { orderKey: string; order: 'asc' | 'desc' }[];
  nameSearch?: string;
}

export interface UserListModelStateType {
  users: User[];
  page: number;
  pageSize: number;
  count: number;
  filter: UserFilter;
}

export interface UserListModelType {
  namespace: string;
  reducers: {
    onQueryUsersSuccess: Reducer<UserListModelStateType>;
    setPage: Reducer<UserListModelStateType>;
    updateFilter: Reducer<UserListModelStateType>;
  };
  state: UserListModelStateType;
  effects: {
    getUserList: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserListModel: UserListModelType = {
  namespace: 'userList',
  state: {
    users: [],
    page: 1,
    pageSize: 20,
    count: 0,
    filter: {
      orders: [],
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location: any) => {
        if (location.pathname === '/users') {
          const {page, pageSize} = getPaginationFromURL(location.query, 1, 20);
          dispatch({
            type: 'setPage',
            payload: {
              page,
              pageSize,
            },
          });
          dispatch({
            type: 'updateFilter',
            payload: {
              filter: {
                nameSearch: location.query.nameSearch,
                orders: getOrdersFromUrlQuery(location.query.order, '-id'),
              },
            },
          });
          dispatch({
            type: 'getUserList',
          });
        }
      });
    },
  },
  effects: {
    * getUserList(_, {call, put, select}) {
      const userListState: UserListModelStateType = yield select(
        (state: ConnectState) => state.userList,
      );
      const {
        filter: {orders, nameSearch},
      } = userListState;
      const users: ListQueryContainer<User> = yield call(queryUserList, {
        page: userListState.page,
        pageSize: userListState.pageSize,
        order:
          orders !== undefined
            ? orders
              .map((item: any) => `${item.order === 'asc' ? '' : '-'}${item.orderKey}`)
              .join(',')
            : '-id',
        nameSearch,
      });
      yield put({
        type: 'onQueryUsersSuccess',
        payload: {
          users: users.result,
          count: users.count,
          page: users.page,
          pageSize: users.pageSize,
        },
      });
    },
  },
  reducers: {
    onQueryUsersSuccess(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    setPage(state, {payload: {page, pageSize}}) {
      return {
        ...state,
        page,
        pageSize,
      };
    },
    updateFilter(state, {payload: {filter}}) {
      return {
        ...state,
        filter,
      };
    },
  },
};
export default UserListModel;
