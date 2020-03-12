import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';
import {createTag, queryTags, Tag, tagBatch} from "@/services/tag";
import {ConnectState} from "@/models/connect";
import {ListQueryContainer} from "@/services/base";
import {getOrdersFromUrlQuery, getUrlParamToArray} from "@/utils/uri";

export interface TagFilter {
  orders: { orderKey: string, order: "asc"|"desc" }[]
  nameSearch?: string
  type: string[]
}

export interface TagListModelStateType {
  tags?: Tag[]
  page: number
  pageSize: number
  order?: string
  startTime?: string
  endTime?: string
  count: number
  filter: TagFilter
  updateTag?: Tag
  selectedTags:Tag[]
}

export interface TagListModelType {
  namespace: string,
  reducers: {
    setPage: Reducer
    setOrder: Reducer
    setTimeRange: Reducer
    setFilter: Reducer
    onQueryTagsSuccess: Reducer
    setUpdateTag: Reducer
    setSelectTags:Reducer
    updateFilter:Reducer
  }
  state: TagListModelStateType
  effects: {
    queryTags: Effect
    createTag: Effect
    updateTag: Effect
    deleteTags:Effect
  }
  subscriptions: {
    setup: Subscription
  }
}

const TagListModel: TagListModelType = {
  namespace: 'tagList',
  state: {
    page: 1,
    pageSize: 20,
    count: 0,
    filter: {
      orders: [],
      type: []
    },
    selectedTags:[]
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location:any) => {
        if (location.pathname === '/tags') {
          const {page=1,pageSize=20,order = [],nameSearch,type=[]} = location.query;
          dispatch({
            type:"setPage",
            payload:{
              page:Number(page),
              pageSize:Number(pageSize)
            }
          });
          dispatch({
            type:"updateFilter",
            payload:{
              filter:{
                orders:getOrdersFromUrlQuery(order,"-id"),
                nameSearch,
                type:getUrlParamToArray(type)
              }
            }
          });
          dispatch({
            type: 'queryTags',
          });
        }
      });
    },
  },
  effects: {
    * queryTags(_, {call, put, select}) {
      const {page, pageSize, filter} = yield select((state: ConnectState) => (state.tagList));
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {
        page,
        pageSize,
        order: filter.orders.length > 0 ? filter.orders.map((item: any) => (`${item.order === "asc" ? "" : "-"}${item.orderKey}`)).join(",") : "-id",
        nameSearch: filter.nameSearch,
        type: filter.type
      });
      yield put({
        type: "onQueryTagsSuccess",
        payload: {
          tags: queryTagsResponse.result,
          count: queryTagsResponse.count,
          page: queryTagsResponse.page,
          pageSize: queryTagsResponse.pageSize
        }
      })
    },
    * createTag({payload: {name, type}}, {call, put, select}) {
      yield call(createTag, {name, type});
      yield put({
        type: "dialog/setDialogActive",
        payload: {
          key: "tagList/addTagDialog",
          isActive: false
        }
      });
      yield put({
        type: "queryTags"
      })
    },
    * updateTag({payload: {name, type}}, {call, put, select}) {
      const tagList: TagListModelStateType = yield select((state: ConnectState) => (state.tagList));
      if (tagList.updateTag !== undefined) {
        yield call(tagBatch, {
          update: [
            {id: tagList.updateTag.id, name, type}
          ]
        })
      }
      yield put({
        type: "dialog/setDialogActive",
        payload: {
          key: "tagList/updateTagDialog",
          isActive: false
        }
      });
      yield put({
        type: "setUpdateTag",
        payload: {
          tag: undefined
        }
      });
      yield put({
        type: "queryTags"
      })
    },
    *deleteTags({payload:{tags}},{call,put}){
      yield call(tagBatch,{delete:tags.map((tag:Tag) => (tag.id))});
      yield put({
        type: "queryTags"
      })
    }
  },
  reducers: {
    onQueryTagsSuccess(state, {payload}) {
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
    setUpdateTag(state, {payload: {tag}}) {
      return {
        ...state,
        updateTag: tag
      }
    },
    setSelectTags(state,{payload:{tags}}){
      return {
        ...state,
        selectedTags:tags
      }
    },
    updateFilter(state:TagListModelStateType,{payload:{filter}}):TagListModelStateType{
      return {
        ...state,
        filter:{
          ...state.filter,
          ...filter
        }
      }
    }
  },

};
export default TagListModel;
