import { Effect } from 'umi';

import { ListQueryContainer } from '@/services/base';
import { importDirectoryAsLibrary, Library, scanLibraryById } from '@/services/library';
import { Reducer } from '@@/plugin-dva/connect';
import { notification } from 'antd';
import {
  LibraryListImportDirectoryDialogKey,
  LibraryListImportExternalLibraryDialogKey,
} from '@/pages/library/LibraryListPage/index';
import { queryBookLibrary, removeBookLibrary, importExternalBookLibrary } from './service';
import { LibraryItemViewModel } from './data.d';

export interface LibraryListStateType {
  libraryList: LibraryItemViewModel[];
}

export interface LibraryListModelType {
  namespace: string;
  state: LibraryListStateType;
  effects: {
    queryLibrary: Effect;
    removeLibrary: Effect;
    importExternalLibrary: Effect;
    importDirectory: Effect;
    scanLibrary: Effect;
  };
  reducers: {
    queryLibraryListSuccess: Reducer<LibraryListStateType>;
  };
}

const Model: LibraryListModelType = {
  namespace: 'libraryList',
  state: {
    libraryList: [],
  },

  effects: {
    *queryLibrary(_, { call, put }) {
      const response: ListQueryContainer<Library> = yield call(queryBookLibrary, {});
      yield put({
        type: 'queryLibraryListSuccess',
        payload: {
          list: response.result,
        },
      });
    },
    *removeLibrary({ payload: { id } }, { call, put }) {
      yield call(removeBookLibrary, { id });
      yield put({ type: 'queryLibrary' });
    },
    *importDirectory({ payload: { path } }, { call, put }) {
      yield put({
        type: 'dialog/setDialogActive',
        payload: {
          key: LibraryListImportDirectoryDialogKey,
          isActive: false,
        },
      });
      notification.info({
        message: '导入文件夹',
        description: '添加成功，正在扫描',
      });
      yield call(importDirectoryAsLibrary, { path });
    },
    *importExternalLibrary({ payload: { path } }, { call, put }) {
      notification.info({
        message: '导入外部库',
        description: '此操作会花费一定时间，完成后会通知您',
      });
      yield put({
        type: 'dialog/setDialogActive',
        payload: {
          key: LibraryListImportExternalLibraryDialogKey,
          isActive: false,
        },
      });
      yield call(importExternalBookLibrary, { path });
      yield put({ type: 'queryLibrary' });
      notification.success({
        message: '导入外部库',
        description: '外部库导入成功',
      });
    },
    *scanLibrary({ payload: { id } }, { call }) {
      yield call(scanLibraryById, { id });
      notification.info({
        message: '成功',
        description: '扫描任务已添加',
      });
    },
  },

  reducers: {
    queryLibraryListSuccess(state, { payload: { list } }) {
      return {
        ...state,
        libraryList: list,
      };
    },
  },
};

export default Model;
