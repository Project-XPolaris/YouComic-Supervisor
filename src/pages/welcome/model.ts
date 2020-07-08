import {Effect, Reducer, Subscription} from "@@/plugin-dva/connect";
import {Book, queryBooks} from "@/services/book";
import {ListQueryContainer} from "@/services/base";
import {getTagCount, queryTags, Tag, TagCount} from "@/services/tag";
import moment from 'moment'
import {BookDailyCount, getBookDailyCount, getTagTypeCount, TagTypeCount} from "@/services/dashboard";
import {Library, queryLibraryList} from "@/services/library";

export interface HomeModelStateType {
  totalBookCount?: number
  totalTagCount?: number
  bookDailyCountList?: BookDailyCount[]
  recentlyBook?: Book[]
  tagCount?: TagCount[]
  recentlyAddTag?: Tag[]
  tagTypeCount?: TagTypeCount[]
  libraryCount?: number
}

export interface HomeModelType {
  namespace: string,
  reducers: {
    setTotalBookCount: Reducer<HomeModelStateType>
    setTotalTagCount: Reducer<HomeModelStateType>
    setBookDailyCount: Reducer<HomeModelStateType>
    setRecentlyBook: Reducer<HomeModelStateType>
    setTagCount: Reducer<HomeModelStateType>
    setRecentlyAddTag: Reducer<HomeModelStateType>
    setTagTypeCount: Reducer<HomeModelStateType>
    setLibraryCount: Reducer<HomeModelStateType>
  },
  state: HomeModelStateType,
  effects: {
    queryTotalBookCount: Effect
    queryTotalTagCount: Effect
    queryBookDailyCount: Effect
    queryRecentlyBook: Effect
    queryTagCount: Effect
    queryRecentlyAddTag: Effect
    queryTagTypeCount: Effect
    queryLibraryCount: Effect
  },
  subscriptions: {
    setup: Subscription
  }
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === "/welcome") {
          dispatch({
            type: 'queryTotalBookCount',
          });
          dispatch({
            type: 'queryTotalTagCount',
          });
          dispatch({
            type: "queryBookDailyCount"
          })
          dispatch({
            type: "queryRecentlyBook"
          })
          dispatch({
            type: "queryTagCount"
          })
          dispatch({
            type: "queryRecentlyAddTag"
          })
          dispatch({
            type: "queryTagTypeCount"
          })
          dispatch({
            type: "queryLibraryCount"
          })
        }
      });
    },
  },
  effects: {
    * queryTotalBookCount(_, {call, put}) {
      const startTime = moment().subtract(7, "days").startOf('day').format("YYYY-MM-DD")
      const endTime = moment().add(1, "day").format("YYYY-MM-DD")
      const queryBookListResponse: ListQueryContainer<Book> = yield call(queryBooks, {
        page: 1,
        pageSize: 1,
        startTime,
        endTime
      })
      if (queryBookListResponse.count) {
        yield put({
          type: "setTotalBookCount",
          payload: {
            count: queryBookListResponse.count
          }
        })
      }
    },
    * queryRecentlyBook(_, {call, put}) {
      const response: ListQueryContainer<Book> = yield call(queryBooks, {page: 1, pageSize: 5, order: "-id"})
      if (response.result) {
        yield put({
          type: "setRecentlyBook",
          payload: {
            books: response.result
          }
        })
      }
    },
    * queryTotalTagCount(_, {call, put}) {
      const queryTagListResponse: ListQueryContainer<Tag> = yield call(queryTags, {page: 1, pageSize: 1})
      if (queryTagListResponse.count) {
        yield put({
          type: "setTotalTagCount",
          payload: {
            count: queryTagListResponse.count
          }
        })
      }
    },
    * queryBookDailyCount(S, {call, put}) {
      const startTime = moment().subtract(7, "days").startOf('day').format("YYYY-MM-DD")
      const endTime = moment().add(1, "day").format("YYYY-MM-DD")
      const queryBookDailyCountResponse: ListQueryContainer<BookDailyCount> = yield call(getBookDailyCount, {
        startTime,
        endTime
      })
      if (queryBookDailyCountResponse.count) {
        yield put({
          type: "setBookDailyCount",
          payload: {
            data: queryBookDailyCountResponse.result
          }
        })
      }
    },
    * queryTagCount(_, {call, put}) {
      const response: ListQueryContainer<TagCount> = yield call(getTagCount, {page: 1, pageSize: 5, order: "-total"})
      if (response.result) {
        yield put({
          type: "setTagCount",
          payload: {
            tags: response.result
          }
        })
      }
    },
    * queryRecentlyAddTag(_, {call, put}) {
      const response: ListQueryContainer<Tag> = yield call(queryTags, {page: 1, pageSize: 5, order: "-id"})
      if (response.result) {
        yield put({
          type: "setRecentlyAddTag",
          payload: {
            tags: response.result
          }
        })
      }
    },
    * queryTagTypeCount(_, {call, put}) {
      const response: ListQueryContainer<TagCount> = yield call(getTagTypeCount, {
        page: 1,
        pageSize: 5,
        order: "-total"
      })
      if (response.result) {
        yield put({
          type: "setTagTypeCount",
          payload: {
            data: response.result
          }
        })
      }
    },
    * queryLibraryCount(_, {call, put}) {
      const response: ListQueryContainer<Library> = yield call(queryLibraryList, {page: 1, pageSize: 1})
      if (response.result) {
        yield put({
          type: "setLibraryCount",
          payload: {
            count: response.count
          }
        })
      }
    }
  },
  reducers: {
    setTotalBookCount(state, {payload: {count}}) {
      return {
        ...state,
        totalBookCount: count
      }
    },
    setTotalTagCount(state, {payload: {count}}) {
      return {
        ...state,
        totalTagCount: count
      }
    },
    setBookDailyCount(state, {payload: {data}}) {
      return {
        ...state,
        bookDailyCountList: data
      }
    },
    setRecentlyBook(state, {payload: {books}}) {
      return {
        ...state,
        recentlyBook: books
      }
    },
    setTagCount(state, {payload: {tags}}) {
      return {
        ...state,
        tagCount: tags
      }
    },
    setRecentlyAddTag(state, {payload: {tags}}) {
      return {
        ...state,
        recentlyAddTag: tags
      }
    },
    setTagTypeCount(state, {payload: {data}}) {
      return {
        ...state,
        tagTypeCount: data
      }
    },
    setLibraryCount(state, {payload: {count}}) {
      return {
        ...state,
        libraryCount: count
      }
    }
  },
};
export default HomeModel;
