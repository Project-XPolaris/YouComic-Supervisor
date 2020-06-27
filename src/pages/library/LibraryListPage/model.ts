import {Effect} from 'umi';

import {CardListItemDataType, LibraryItemViewModel} from './data.d';
import {queryFakeList, queryBookLibrary, removeBookLibrary, importExternalBookLibrary} from './service';
import {ListQueryContainer} from "@/services/base";
import {Library} from "@/services/library";
import {Reducer} from "@@/plugin-dva/connect";
import {notification} from "antd";
import {LibraryListImportExternalLibraryDialogKey} from "@/pages/library/LibraryListPage/index";

export interface LibraryListStateType {
  list: CardListItemDataType[];
  libraryList: LibraryItemViewModel[]
}

export interface LibraryListModelType {
  namespace: string;
  state: LibraryListStateType;
  effects: {
    queryLibrary: Effect
    removeLibrary: Effect
    importExternalLibrary: Effect
  };
  reducers: {
    queryList: Reducer<LibraryListStateType>;
    queryLibraryListSuccess: Reducer<LibraryListStateType>
  };
}

const Model: LibraryListModelType = {
  namespace: 'libraryList',
  state: {
    list: [],
    libraryList: []
  },

  effects: {
    * queryLibrary(_, {call, put, select}) {
      const response: ListQueryContainer<Library> = yield call(queryBookLibrary, {})
      yield put({
        type: "queryLibraryListSuccess",
        payload: {
          list: response.result
        }
      })
    },
    * removeLibrary({payload: {id}}, {call, put, select}) {
      yield call(removeBookLibrary, {id})
      yield put({type: "queryLibrary"})
    },
    * importExternalLibrary({payload: {path}}, {call, put}) {
      notification['info']({
        message: '导入外部库',
        description:
          '此操作会花费一定时间，完成后会通知您',
      })
      yield put({
        type: "dialog/setDialogActive",
        payload: {
          key: LibraryListImportExternalLibraryDialogKey,
          isActive: false
        }
      })
      yield call(importExternalBookLibrary, {path})
      yield put({type: "queryLibrary"})
      notification['success']({
        message: '导入外部库',
        description:
          '外部库导入成功',
      })
    }
  },

  reducers: {
    queryLibraryListSuccess(state, {payload: {list}}) {
      console.log(list)
      return {
        ...state,
        libraryList: list
      }
    }
  },
};

export default Model;
