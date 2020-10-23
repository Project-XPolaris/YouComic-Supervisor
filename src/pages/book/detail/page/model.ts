import { Page, pagesBatch, queryPages } from '@/services/page';
import { ConnectState } from '@/models/connect';
import { ListQueryContainer } from '@/services/base';
import { sortBy } from 'lodash';
import { createPaginationModule } from '@/modules/pagination';
import { Effect, Reducer, Subscription } from '@@/plugin-dva/connect';
import { createSelectItem } from '@/modules/select';

const pathToRegexp = require('path-to-regexp');

export interface BookDetailPageModelStateType {
  pages?: Page[];
  pagePage: number;
  pagePageSize: number;
  count: number;
  id?: number;
}

export interface BookDetailPageModelType {
  namespace: string;
  reducers: {
    onQueryPageSuccess: Reducer;
    setBookId: Reducer;
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
export const pagePaginationModule = createPaginationModule({
  dataName: 'page',
  defaultPageSize: 10,
});
export const pageSelectModule = createSelectItem<string>({
  dataName: 'page',
  namespace: 'bookDetailPages',
});
const BookDetailPageModel: BookDetailPageModelType = {
  namespace: 'bookDetailPages',
  state: {
    ...pagePaginationModule.data,
    ...pageSelectModule.state,
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
          pagePaginationModule.setPageFromUrl(location, dispatch);
          dispatch({
            type: 'queryPages',
          });
        }
      });
    },
  },
  effects: {
    *queryPages(_, { call, put, select }) {
      const { id, pagePage, pagePageSize } = yield select(
        (state: ConnectState) => state.bookDetailPages,
      );
      const queryTagsResponse: ListQueryContainer<Page> = yield call(queryPages, {
        book: id,
        page: pagePage,
        pageSize: pagePageSize,
        order: 'order',
      });
      queryTagsResponse.result = queryTagsResponse.result.map((pageItem: Page) => ({
        ...pageItem,
        path: `${pageItem.path}`,
      }));
      yield put({
        type: 'onQueryPageSuccess',
        payload: {
          pages: queryTagsResponse.result,
          pagePage: queryTagsResponse.page,
          pagePageSize: queryTagsResponse.pageSize,
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
    ...pagePaginationModule.reducers,
    ...pageSelectModule.reducers,
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
    setPageOrder(state, { payload: { id, order } }) {
      const { pages } = state;
      const targetPage: Page = pages.find((page: Page) => page.id === id);
      targetPage.order = order;
      let newPages = [targetPage];
      pages
        .filter((page: Page) => page.id !== id)
        .forEach((page: Page) => {
          if (newPages.find((inPage: Page) => inPage.order === page.order) === undefined) {
            newPages.push(page);
          } else {
            newPages.push({
              ...page,
              order: page.order + 1,
            });
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
