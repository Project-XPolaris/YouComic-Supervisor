import {Reducer} from 'redux';
import {Effect, Subscription} from 'dva';
import {differenceWith} from 'lodash'
import {NoticeIconData} from '@/components/NoticeIcon';
import {ConnectState} from './connect.d';
import {addSnapshots, getSnapshot, removeSnapshotById, Snapshot} from "@/services/snapshot";
import {message} from "antd";

export interface RecentlyViewListItem {
  id:string
  icon: any
  link: string
  title: string
  linkType:string
}

export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}


export interface GlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
  historyItem: RecentlyViewListItem[]
  snapshots: Snapshot[]
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
    addSnapshots: Effect
    refreshSnapshot:Effect
    removeSnapshot:Effect
  };
  reducers: {
    changeLayoutCollapsed: Reducer;
    addToHistory: Reducer
    setSnapshots: Reducer
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    historyItem: [],
    snapshots:[]
  },

  effects: {
    * fetchNotices(_, {call, put, select}) {
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: 0,
          unreadCount:0,
        },
      });
    },
    * clearNotices({payload}, {put, select}) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select((state: ConnectState) => state.global.notices.length);
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    * changeNoticeReadState({payload}, {put, select}) {
      const notices: NoticeItem[] = yield select((state: ConnectState) =>
        state.global.notices.map(item => {
          const notice = {...item};
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
    *addSnapshots({payload: {snapshotList}}, {call, put, select}) {
      yield call(addSnapshots, {snapshots:snapshotList});
      message.success(`添加了 ${snapshotList[0].name} 等${snapshotList.length}个快照`)
      yield put({
        type:"refreshSnapshot"
      })
    },
    *refreshSnapshot(_,{call,put}){
      let snapshots : Snapshot[] = yield call(getSnapshot,{});
      if (snapshots === null){
        snapshots = []
      }
      yield put({
        type:"setSnapshots",
        payload:{
          snapshots
        }
      })
    },
    *removeSnapshot({payload:{ids}},{call,put}){
      yield call(removeSnapshotById,{ids});
      yield put({
        type:"refreshSnapshot"
      })
    }
  },

  reducers: {
    changeLayoutCollapsed(state = {notices: [], collapsed: true}, {payload}): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    addToHistory(state: GlobalModelState, {payload: {items}}): GlobalModelState {
      return {
        ...state,
        historyItem: [
          ...items,
          ...differenceWith<RecentlyViewListItem, RecentlyViewListItem>(state.historyItem, items, (a: RecentlyViewListItem, b: RecentlyViewListItem) => a.link === b.link)
        ]
      }
    },
    setSnapshots(state: GlobalModelState, {payload: {snapshots}}): GlobalModelState {
      return {
        ...state,
        snapshots
      }
    }

  },

  subscriptions: {
    setup({dispatch,history}): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({pathname, search}): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
        dispatch({
          type:"refreshSnapshot"
        })
      });
    },
  },
};

export default GlobalModel;
