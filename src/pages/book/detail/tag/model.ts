import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {addTagToBook, queryBookTags, removeTagFromBook} from "@/services/book";
import {ConnectState} from "@/models/connect";
import {ListQueryContainer} from "@/services/base";
import {createTag, queryTags, Tag} from "@/services/tag";

const pathToRegexp = require('path-to-regexp');

export interface BookDetailTagsStateType {
  tags?: Tag[]
  page: number
  pageSize: number
  count: number
  id?: number
  isAddTagDialogOpen: boolean
}

export interface BookDetailTagsType {
  namespace: string,
  reducers: {
    onQueryTagSuccess: Reducer
    setBookId: Reducer
    setPage: Reducer
    setAddTagDialog: Reducer
  }
  state: BookDetailTagsStateType
  effects: {
    queryTags: Effect
    deleteTagFromBook: Effect
    addTagToBook: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const BookDetailTags: BookDetailTagsType = {
  namespace: 'bookDetailTags',
  state: {
    page: 1,
    pageSize: 10,
    count: 0,
    isAddTagDialogOpen: false
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const regexp = pathToRegexp('/book/:bookId(\\d+)/tags');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setBookId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: "queryTags"
          })
        }
      });
    },
  },
  effects: {
    * queryTags(_, {call, put, select}) {
      const {id} = yield select((state: ConnectState) => state.bookDetailTags);
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryBookTags, {id});
      yield put({
        type: "onQueryTagSuccess",
        payload: {
          tags: queryTagsResponse.result,
          page: queryTagsResponse.page,
          pageSize: queryTagsResponse.pageSize,
          count: queryTagsResponse.count
        }
      })
    },
    * deleteTagFromBook({payload: {tagId}}, {call, put, select}) {
      const {id} = yield select((state: ConnectState) => state.bookDetailTags);
      yield call(removeTagFromBook, {id, tagId});
      yield put({
        type: "queryTags"
      })
    },
    * addTagToBook({payload}, {call, put, select}) {
      const {id} = yield select((state: ConnectState) => state.bookDetailTags);
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {name:payload.name});
      let tagToAdd: Tag;
      if (queryTagsResponse.count === 0) {
        tagToAdd = yield call(createTag, payload)
      } else {
        tagToAdd = queryTagsResponse.result[0]
      }
      yield call(addTagToBook, {id, tags: [tagToAdd.id,]});
      yield put({
        type:"setAddTagDialog",
        payload:{
          isOpen:false
        }
      });
      yield put({
        type:"queryTags"
      });
    }
  },
  reducers: {
    onQueryTagSuccess(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    setBookId(state, {payload: {id}}) {
      return {
        ...state,
        id
      }
    },
    setPage(state, {payload}) {
      return {
        ...state,
        page: payload.page,
        pageSize: payload.pageSize,
      };
    },
    setAddTagDialog(state, {payload: {isOpen}}) {
      return {
        ...state,
        isAddTagDialogOpen: isOpen
      }
    }
  },

};
export default BookDetailTags;
