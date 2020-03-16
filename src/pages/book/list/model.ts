import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {Book, DeleteBook, queryBooks} from "@/services/book";
import {ListQueryContainer} from "@/services/base";
import {ConnectState} from "@/models/connect";
import {getCoverThumbnailURL} from "@/utils/image";
import {BookFilter} from "@/pages/book/list/components/BookFilterDrawer";
import {queryTags, Tag} from "@/services/tag";
import {getOrdersFromUrlQuery} from "@/utils/uri";
import {differenceWith} from 'lodash'
import {message} from "antd";

export interface BookListModelStateType {
  books?: Book[]
  page: number,
  pageSize: number,
  order?: string
  startTime?: string,
  endTime?: string,
  count: number
  filter: BookFilter
  searchTags: Tag[]
  tagsFetchId: number
  selectedBooks: Book[]
}

export interface BookListModelType {
  namespace: string,
  reducers: {
    onQueryBookSuccess: Reducer
    setPage: Reducer
    setOrder: Reducer
    setTimeRange: Reducer
    setFilter: Reducer
    setTagsFetchId: Reducer
    onSearchTagsSuccess: Reducer
    setSelectedBookIds: Reducer
    updateFilter: Reducer
  }
  state: BookListModelStateType
  effects: {
    queryBooks: Effect
    searchTags: Effect
    getFilterTag: Effect
    deleteSelectedBooks: Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const BookListModel: BookListModelType = {
  namespace: 'bookList',
  state: {
    page: 1,
    pageSize: 45,
    count: 0,
    order: '-id',
    filter: {
      order: [],
      tags: [],
      tagIds: []
    },
    searchTags: [],
    tagsFetchId: 0,
    selectedBooks: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location: any) => {
        if (location.pathname === '/books/list') {
          const {page = 1, pageSize = 45, filterTags = [], startTime, endTime, nameSearch, order = []} = location.query;
          dispatch({
            type: "setPage",
            payload: {
              page: Number(page),
              pageSize: Number(pageSize)
            }
          });
          dispatch({
            type: "updateFilter",
            payload: {
              filter: {
                tagIds: Array.isArray(filterTags) ? filterTags.map((id: string) => Number(id)) : [Number(filterTags),],
                startTime, endTime, nameSearch,
                order: getOrdersFromUrlQuery(order, "-id")
              }
            }
          });
          if (filterTags.length !== 0) {
            dispatch({
              type: "getFilterTag"
            });
          }

          dispatch({
            type: 'queryBooks',
          });
        }
      });
    },
  },
  effects: {
    * queryBooks(_, {call, put, select}) {
      const {page, pageSize, filter} = yield select((state: ConnectState) => (state.bookList));
      let orderString = filter.order.map((item: any) => (`
        ${item.order === "asc" ? "" : "-"}${item.orderKey}
      `)).join(",");
      if (orderString.length === 0) {
        orderString = "-id"
      }
      const queryBookResponse: ListQueryContainer<Book> = yield call(queryBooks, {
        page,
        page_size: pageSize,
        order: orderString,
        nameSearch: filter.nameSearch,
        startTime: filter.startTime,
        endTime: filter.endTime,
        tag: filter.tagIds
      });
      queryBookResponse.result.forEach((book: Book) => {
        book.cover = getCoverThumbnailURL(book.cover)
      });
      yield put({
        type: 'onQueryBookSuccess',
        payload: {
          books: queryBookResponse.result,
          count: queryBookResponse.count,
        },
      });
    },
    * searchTags({payload: {searchKey, type}}, {call, put, select}) {
      let bookListModelState: BookListModelStateType = yield select((state: ConnectState) => (state.bookList));
      const fetchId = bookListModelState.tagsFetchId + 1;
      yield put({
        type: "setTagsFetchId",
        payload: {
          id: fetchId
        }
      });
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {
        nameSearch: searchKey,
        page: 1,
        pageSize: 20,
        type
      });
      bookListModelState = yield select((state: ConnectState) => (state.bookList));
      if (fetchId === bookListModelState.tagsFetchId) {
        yield put({
          type: "onSearchTagsSuccess",
          payload: {
            tags: queryTagsResponse.result
          }
        })
      }
    },
    * getFilterTag(_, {call, put, select}) {
      const {filter}: BookListModelStateType = yield select((state: ConnectState) => (state.bookList));
      const {tags, tagIds} = filter;
      const tagIdsToQuery = differenceWith<number, { id: number, name: string }>(tagIds, tags, (a: number, b: { id: number, name: string }) => a === b.id);
      if (tagIdsToQuery.length === 0) {
        return
      }
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {id: tagIdsToQuery});
      yield put({
        type: "updateFilter",
        payload: {
          filter: {
            ...filter,
            tags: [
              ...tags,
              ...queryTagsResponse.result.map((tag: Tag) => ({id: tag.id, name: tag.name}))
            ]
          }
        }
      })
    },
    * deleteSelectedBooks({payload: {permanently}}, {call, put, select}) {
      const {selectedBooks}: BookListModelStateType = yield select((state: ConnectState) => (state.bookList));
      for (const selectedBook of selectedBooks) {
        yield call(DeleteBook, {id: selectedBook.id, permanently})
      }
      yield put({
        type: "queryBooks"
      })
      yield put({
        type: "setSelectedBookIds",
        payload: {
          books: []
        }
      })
      message.success(`已删除${selectedBooks.length}个项目`)
    }
  },
  reducers: {
    onQueryBookSuccess(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    setPage(state, {payload}) {
      return {
        ...state,
        page: payload.page,
        pageSize: payload.pageSize,
      };
    },
    setTimeRange(state, {payload}) {
      return {
        ...state,
        startTime: payload.startTime,
        endTime: payload.endTime,
      };
    },
    setOrder(state, {payload}) {
      const order = Object.keys(payload.order).map((key: string) => `${payload.order[key] === 'asc' ? '' : '-'}${key}`).join(',');
      return {
        ...state,
        order,
      };
    },
    setFilter(state, {payload: {filter}}) {
      return {
        ...state,
        filter
      }
    },
    setTagsFetchId(state, {payload: {id}}) {
      return {
        ...state,
        tagsFetchId: id
      }
    },
    onSearchTagsSuccess(state, {payload: {tags}}) {
      return {
        ...state,
        searchTags: tags
      }
    },
    setSelectedBookIds(state, {payload: {books}}) {
      return {
        ...state,
        selectedBooks: books
      }
    },
    updateFilter(state: BookListModelStateType, {payload: {filter}}): BookListModelStateType {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...filter
        }
      }
    }
  },

};
export default BookListModel;
