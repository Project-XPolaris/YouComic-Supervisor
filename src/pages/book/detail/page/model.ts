import { Page, pagesBatch, queryPages } from '@/services/page';
import { Reducer } from 'redux';
import { Effect, Subscription } from 'dva';
import { ConnectState } from '@/models/connect';
import { ListQueryContainer } from '@/services/base';
import ApplicationConfig from '@/config';
import { sortBy } from 'lodash';

const pathToRegexp = require('path-to-regexp');

export interface BookDetailPageModelStateType {
  pages?: Page[];
  page: number;
  pageSize: number;
  count: number;
  id?: number;
}

export interface BookDetailPageModelType {
  namespace: string;
  reducers: {
    onQueryPageSuccess: Reducer;
    setBookId: Reducer;
    setPage: Reducer;
    setPageOrder: Reducer;
  };
  state: BookDetailPageModelStateType;
  effects: {
    queryPages: Effect;
    applyPage: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const BookDetailPageModel: BookDetailPageModelType = {
  namespace: 'bookDetailPages',
  state: {
    page: 1,
    pageSize: 30,
    count: 0,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const regexp = pathToRegexp('/book/:bookId(\\d+)/pages');
        const match = regexp.exec(location.pathname);
        if (match) {
          dispatch({
            type: 'setBookId',
            payload: {
              id: Number(match[1]),
            },
          });
          dispatch({
            type: 'queryPages',
          });
        }
      });
    },
  },
  effects: {
    *queryPages(_, { call, put, select }) {
      const { id, page, pageSize } = yield select((state: ConnectState) => state.bookDetailPages);
      const queryTagsResponse: ListQueryContainer<Page> = yield call(queryPages, {
        book: id,
        page,
        pageSize,
        order: 'order',
      });
      queryTagsResponse.result.forEach((pageItem: Page) => (pageItem.path = `${pageItem.path}`));
      yield put({
        type: 'onQueryPageSuccess',
        payload: {
          pages: queryTagsResponse.result,
          page: queryTagsResponse.page,
          pageSize: queryTagsResponse.pageSize,
          count: queryTagsResponse.count,
        },
      });
    },
    *applyPage(_, { call, put, select }) {
      const { pages } = yield select((state: ConnectState) => state.bookDetailPages);
      const updatePage = pages.map((page: Page) => ({ id: page.id, order: page.order }));
      yield call(pagesBatch, { update: updatePage });
      yield put({
        type: 'queryPages',
      });
    },
  },
  reducers: {
    onQueryPageSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    setBookId(state, { payload: { id } }) {
      return {
        ...state,
        id,
      };
    },
    setPage(state, { payload }) {
      return {
        ...state,
        page: payload.page,
        pageSize: payload.pageSize,
      };
    },
    setPageOrder(state, { payload: { id, order } }) {
      let pages: Page[] = state.pages;
      const targetPage: Page = pages.find((page: Page) => page.id === id);
      targetPage.order = order;
      let newPages = [targetPage];
      pages
        .filter((page: Page) => page.id !== id)
        .forEach((page: Page) => {
          if (newPages.find((inPage: Page) => inPage.order === page.order) === undefined) {
            newPages.push(page);
          } else {
            page.order += 1;
            newPages.push(page);
          }
        });
      newPages = sortBy(newPages, ['order']);
      return {
        ...state,
        pages: newPages,
      };
    },
  },
};
export default BookDetailPageModel;
