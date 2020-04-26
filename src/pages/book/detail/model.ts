import { Book, queryBooks } from '@/services/book';
import { Effect, Subscription } from 'dva';
import { ConnectState } from '@/models/connect';
import { ListQueryContainer } from '@/services/base';
import { getCoverThumbnailURL } from '@/utils/image';
import { Reducer } from 'redux';
import { RequestExtendResponse } from '@/utils/request';
import { router } from 'umi';

const pathToRegexp = require('path-to-regexp');

export interface DetailModelStateType {
  id: number;
  book?: Book;
}

export interface DetailModelType {
  namespace: string;
  reducers: {
    setBookId: Reducer;
    onQueryBookSuccess: Reducer;
  };
  state: DetailModelStateType;
  effects: {
    queryBook: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const DetailModel: DetailModelType = {
  namespace: 'bookDetail',
  state: {
    id: 0,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const regexp = pathToRegexp('/book/:bookId(\\d+)/(.*?)');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setBookId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryBook',
          });
        }
      });
    },
  },
  effects: {
    *queryBook(_, { call, put, select }) {
      const { id } = yield select((state: ConnectState) => state.bookDetail);
      const queryBooksResponse: ListQueryContainer<Book> &
        RequestExtendResponse = yield call(queryBooks, { id });
      if (!queryBooksResponse.success || queryBooksResponse.count === 0) {
        router.replace('/404');
      }
      if (queryBooksResponse.count > 0) {
        const book = queryBooksResponse.result[0];
        book.cover = getCoverThumbnailURL(book.cover);
        yield put({
          type: 'onQueryBookSuccess',
          payload: {
            book: queryBooksResponse.result[0],
          },
        });
      }
    },
  },
  reducers: {
    setBookId(state, { payload }) {
      return {
        ...state,
        id: payload.id,
      };
    },
    onQueryBookSuccess(state, { payload }) {
      return {
        ...state,
        book: payload.book,
      };
    },
  },
};
export default DetailModel;
