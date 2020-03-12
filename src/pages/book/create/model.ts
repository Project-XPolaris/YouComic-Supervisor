import {Effect} from 'dva';
import {Reducer} from 'redux';
import {ConnectState} from "@/models/connect";
import {ListQueryContainer} from "@/services/base";
import {queryTags, Tag} from "@/services/tag";
import {pickBy} from 'lodash'
import Resizer from 'react-image-file-resizer';
import {getPageThumbnailImage} from "@/utils/image";
import CreateBookPage from "@/pages/book/create/index";

export interface CreateBookPageModelStateType {
  currentStep: number
  searchTags: Tag[]
  searchTagsId: number
  relateTags: { [key: string]: Tag[] }
  pageThumbnails: { [key: string]: string }
}

export interface CreateBookPageModelType {
  namespace: string,
  reducers: {
    setCurrentStep: Reducer
    onSearchTagsSuccess: Reducer
    setSearchTagsId: Reducer
    onSearchRelateTagsSuccess: Reducer
    setPageImageThumbnail: Reducer
  }
  state: CreateBookPageModelStateType
  effects: {
    searchTags: Effect
    getMatchTags: Effect
    generatePageImageThumbnail: Effect
  }
  subscriptions: {}
}

const CreateBookPageModel: CreateBookPageModelType = {
  namespace: 'createBook',
  state: {
    currentStep: 2,
    searchTagsId: 0,
    searchTags: [],
    relateTags: {},
    pageThumbnails: {}
  },
  subscriptions: {},
  effects: {
    * searchTags({payload: {key}}, {call, put, select}) {
      let createBookState: CreateBookPageModelStateType = yield select((state: ConnectState) => (state.createBook));
      const searchId = createBookState.searchTagsId + 1;
      yield put({
        type: "setSearchTagsId",
        payload: {
          id: searchId
        }
      });
      const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {
        nameSearch: key,
        page: 1,
        pageSize: 10
      });
      createBookState = yield select((state: ConnectState) => (state.createBook));
      if (createBookState.searchTagsId !== searchId) {
        return
      }
      yield put({
        type: "onSearchTagsSuccess",
        payload: {
          tags: queryTagsResponse.result
        }
      })
    },
    * getMatchTags({payload: {tagKeys}}, {call, put}) {
      const tagKeyToSearch = pickBy(tagKeys, value => value !== undefined);
      for (let tagKeyIdx = 0; tagKeyIdx < Object.getOwnPropertyNames(tagKeyToSearch).length; tagKeyIdx += 1) {
        const type = Object.getOwnPropertyNames(tagKeyToSearch)[tagKeyIdx];
        const queryTagsResponse: ListQueryContainer<Tag> = yield call(queryTags, {type, nameSearch: tagKeys[type]})
        yield put({
          type: "onSearchRelateTagsSuccess",
          payload: {
            type,
            tags: queryTagsResponse.result
          }
        })
      }
    },
    * generatePageImageThumbnail({payload: {file}}, {call, put, select}) {
      const imageBase64URL: string = yield call(getPageThumbnailImage, {file})
      yield put({
        type:"setPageImageThumbnail",
        payload:{
          key:file.name,
          thumbnail:imageBase64URL
        }
      })
    }
  },
  reducers: {
    setCurrentStep(state: CreateBookPageModelStateType, {payload: {currentStep}}) {
      return {
        ...state,
        currentStep
      }
    },
    onSearchTagsSuccess(state: CreateBookPageModelStateType, {payload: {tags}}): CreateBookPageModelStateType {
      return {
        ...state,
        searchTags: tags
      }
    },
    setSearchTagsId(state: CreateBookPageModelStateType, {payload: {id}}): CreateBookPageModelStateType {
      return {
        ...state,
        searchTagsId: id
      }
    },
    onSearchRelateTagsSuccess(state: CreateBookPageModelStateType, {payload: {tags, type}}): CreateBookPageModelStateType {
      const stateTags = state.relateTags;
      stateTags[type] = tags;
      return {
        ...state,
        relateTags: stateTags
      }
    },
    setPageImageThumbnail(state:CreateBookPageModelStateType,{payload:{thumbnail,key}}):CreateBookPageModelStateType{
      return {
        ...state,
        pageThumbnails:{
          ...state.pageThumbnails,
          [key]:thumbnail
        }
      }
    }
  },

};
export default CreateBookPageModel;
