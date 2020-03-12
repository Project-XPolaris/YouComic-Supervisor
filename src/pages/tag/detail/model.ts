import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {addBooksToTag, queryTags, removeBooksFromTag, Tag} from "@/services/tag";
import {ConnectState} from "@/models/connect";
import {ListQueryContainer} from "@/services/base";
import {Book, queryBooks} from "@/services/book";
import {getCoverThumbnailURL} from "@/utils/image";
import {SideCollectionModelStateType} from "@/models/side";

const pathToRegexp = require('path-to-regexp');

export interface TagDetailModelStateType {
  id: number
  tag?: Tag
  page: number
  pageSize: number
  count: number
  books:Book[]
  selectedBooks:Book[]
}

export interface TagDetailModelType {
  namespace: string,
  reducers: {
    setTagId: Reducer
    onQueryTagSuccess: Reducer
    onQueryBooksSuccess: Reducer
    setPage:Reducer
    setSelectedBooks:Reducer

  }
  state: TagDetailModelStateType
  effects: {
    queryTag: Effect
    queryBooks: Effect
    addCollectionBooksToTag:Effect
    removeSelectBookFromTag:Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const TagDetailModel: TagDetailModelType = {
  namespace: 'tagDetail',
  state: {
    id: 0,
    page: 1,
    pageSize: 20,
    count: 0,
    books:[],
    selectedBooks:[]
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const regexp = pathToRegexp('/tag/:tag(\\d+)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setTagId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryTag',
          });
          dispatch({
            type: 'queryBooks',
          });
        }
      });
    },
  },
  effects: {
    * queryTag(_, {call, put, select}) {
      const tagDetail: TagDetailModelStateType = yield select((state: ConnectState) => (state.tagDetail));
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {id: tagDetail.id});
      if (queryTagsResponse.count > 0) {
        yield put({
          type: "onQueryTagSuccess",
          payload: {
            tag: queryTagsResponse.result[0]
          }
        })
      }
    },
    * queryBooks(_, {call, put, select}) {
      const tagDetail: TagDetailModelStateType = yield select((state: ConnectState) => (state.tagDetail));
      const {page, pageSize, id} = tagDetail;
      const queryBooksResponse: ListQueryContainer<Book> = yield call(queryBooks, {tag: id, page, pageSize});
      queryBooksResponse.result.forEach((book: Book) => book.cover = getCoverThumbnailURL(book.cover));
      yield put({
        type:"onQueryBooksSuccess",
        payload:{
          books:queryBooksResponse.result,
          page:queryBooksResponse.page,
          pageSize:queryBooksResponse.pageSize,
          count:queryBooksResponse.count
        }
      })
    },
    *addCollectionBooksToTag(_,{call,put,select}){
      const tagDetail: TagDetailModelStateType = yield select((state: ConnectState) => (state.tagDetail));
      const sideCollection: SideCollectionModelStateType = yield select((state: ConnectState) => (state.sideCollection));
      yield call(addBooksToTag,{tagId:tagDetail.id,bookIds:sideCollection.selectedBooks.map(book => book.id)});
      yield put({
        type:"queryBooks"
      })
    },
    *removeSelectBookFromTag(_,{call,put,select}){
      const tagDetail: TagDetailModelStateType = yield select((state: ConnectState) => (state.tagDetail));
      yield call(removeBooksFromTag,{tagId:tagDetail.id,bookIds:tagDetail.selectedBooks.map(book => (book.id))});
      yield put({
        type:"setSelectedBooks",
        payload:{
          books:[]
        }
      });
      yield put({
        type:"queryBooks"
      })
    }

  },
  reducers: {
    setTagId(state, {payload}) {
      return {
        ...state,
        id: payload.id,
      };
    },
    onQueryTagSuccess(state, {payload}) {
      return {
        ...state,
        tag: payload.tag,
      };
    },
    onQueryBooksSuccess(state, {payload: {books, page, pageSize, count}}) {
      return {
        ...state,
        books, page, pageSize, count
      }
    },
    setPage(state, {payload}) {
      return {
        ...state,
        page: payload.page,
        pageSize: payload.pageSize,
      };
    },
    setSelectedBooks(state,{payload:{books}}){
      return {
        ...state,
        selectedBooks:books
      }
    }
  },

};
export default TagDetailModel;
