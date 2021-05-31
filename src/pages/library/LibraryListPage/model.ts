import {Effect} from 'umi';

import {ListQueryContainer} from '@/services/base';
import {
  importDirectoryAsLibrary,
  Library,
  matchLibraryById,
  renameLibraryBookDirectory,
  scanLibraryById,
} from '@/services/library';
import {BookListModelStateType, Reducer} from '@@/plugin-dva/connect';
import {message, notification} from 'antd';
import {
  LibraryListImportDirectoryDialogKey,
  LibraryListImportExternalLibraryDialogKey,
} from '@/pages/library/LibraryListPage/index';
import {importExternalBookLibrary, queryBookLibrary, removeBookLibrary} from './service';
import {LibraryItemViewModel} from './data.d';
import {Slot} from "@/utils/tag";

export interface LibraryListStateType {
  libraryList: LibraryItemViewModel[];
  isRenameDialogOpen: boolean;
  contextLibrary?:Library
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
    matchLibrary: Effect;
    newRenameLibraryBookDirectory:Effect
  };
  reducers: {
    queryLibraryListSuccess: Reducer;
    openRenameDialog: Reducer;
    closeRenameDialog: Reducer;
  };
}

const Model: LibraryListModelType = {
  namespace: 'libraryList',
  state: {
    libraryList: [],
    isRenameDialogOpen:false,

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
      yield put({ type: 'queryLibrary' });
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
      message.success('扫描任务已添加');
    },
    *matchLibrary({ payload: { id } }, { call }) {
      yield call(matchLibraryById, { id });
      message.success('标签匹配任务已添加');
    },
    *newRenameLibraryBookDirectory({ payload }, { call, put }) {
      const { id,pattern, slots }: { id:number,pattern: string; slots: Slot[] } = payload;
      yield call(renameLibraryBookDirectory, { id, pattern, slots });
      yield put({
        type: 'closeRenameDialog',
      });
      message.success(`修改书库书籍目录名任务已创建`);
    },
  },
  reducers: {
    queryLibraryListSuccess(state, { payload: { list } }) {
      return {
        ...state,
        libraryList: list,
      };
    },
    openRenameDialog(state: BookListModelStateType, { payload:{ library } }) {
      return {
        ...state,
        isRenameDialogOpen: true,
        contextLibrary: library
      };
    },
    closeRenameDialog(state: BookListModelStateType, {}) {
      return {
        ...state,
        isRenameDialogOpen: false,
      };
    },
  },
};

export default Model;
