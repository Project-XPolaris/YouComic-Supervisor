import {Reducer} from 'redux';
import {Book} from "@/services/book";
import {differenceWith, uniqBy} from 'lodash'
import {addTagBooksToTag, Tag} from "@/services/tag";
import {ButtonType} from "antd/es/button";
import {Effect} from "umi";
import {ConnectState} from "@/models/connect";

export interface BookSideCollectionAction {
  actionType: string
  title: string
  type: ButtonType
}

export interface TagSideCollectionAction {
  actionType: string
  title: string
  type: ButtonType
}

export interface SideCollectionModelStateType {
  books: []
  activeTab: string
  selectedBooks: Book[]
  isBookSelectMode: boolean
  bookActions: BookSideCollectionAction[]
  tags: Tag[]
  selectedTags: Tag[]
  isTagSelectMode: boolean
  tagActions: TagSideCollectionAction[]
}

export interface SideCollectionModelType {
  namespace: string,
  reducers: {
    addBookToCollection: Reducer
    setActiveTab: Reducer
    setSelectedBooks: Reducer
    setBookSelectMode: Reducer
    setSideCollectionBooksAction: Reducer
    removeSelectBookFromCollection: Reducer
    addTagsToCollection: Reducer
    setSelectedTags: Reducer
    setTagSelectMode: Reducer
    removeSelectTagFromCollection: Reducer
  }
  state: SideCollectionModelStateType
  effects: {
    addSelectTagToTag: Effect
  }
  subscriptions: {}
}

const SideCollectionModel: SideCollectionModelType = {
  namespace: 'sideCollection',
  state: {
    books: [],
    activeTab: "books",
    selectedBooks: [],
    isBookSelectMode: false,
    bookActions: [],
    tags: [],
    selectedTags: [],
    isTagSelectMode: false,
    tagActions: []
  },
  subscriptions: {},
  effects: {
    * addSelectTagToTag({payload: {toTagId}}, {call, put, select}) {
      const { selectedTags }:{ selectedTags:Tag[] } = yield select((state:ConnectState) => state.sideCollection)
      try {
        yield put({
          type:"dialog/openProgressDialog",
          payload:{
            progress:(1 / selectedTags.length * 100).toFixed(0),
            hint:"转移中",
            closeable:false
          }
        })
        for (let tag of selectedTags.filter(selectedTag => selectedTag.id !== toTagId)) {
          yield call(addTagBooksToTag,{ from:tag.id,to:toTagId })
          yield put({
            type:"dialog/updateProgressDialog",
            payload:{
              progress:(1 / selectedTags.length * 100).toFixed(0),
              hint:"转移中",
              closeable:false
            }
          })
        }
      }catch (e) {
        console.log(e)
      }finally {
        yield put({
          type:"dialog/updateProgressDialog",
          payload:{
            progress: 100,
            hint:"完成",
            closeable:true
          }
        })
      }

    }
  },
  reducers: {
    addBookToCollection(state, {payload: {books}}) {
      return {
        ...state,
        books: uniqBy([
          ...state.books,
          ...books
        ], "id")
      }
    },
    setActiveTab(state, {payload: {tab}}) {
      return {
        ...state,
        activeTab: tab
      }
    },
    setSelectedBooks(state, {payload: {books}}) {
      return {
        ...state,
        selectedBooks: books
      }
    },
    setBookSelectMode(state, {payload: {isSelect}}) {
      return {
        ...state,
        isBookSelectMode: isSelect
      }
    },
    setSideCollectionBooksAction(state, {payload: {actions}}) {
      return {
        ...state,
        bookActions: actions
      }
    },
    removeSelectBookFromCollection(state: SideCollectionModelStateType, _) {
      return {
        ...state,
        selectedBooks: [],
        books: differenceWith<Book, Book>(state.books, state.selectedBooks, (a, b) => a.id === b.id)
      }
    },
    addTagsToCollection(state, {payload: {tags}}) {
      return {
        ...state,
        tags: uniqBy([
          ...state.tags,
          ...tags
        ], "id")
      }
    },
    setSelectedTags(state, {payload: {tags}}) {
      return {
        ...state,
        selectedTags: tags
      }
    },
    setTagSelectMode(state, {payload: {isSelect}}) {
      return {
        ...state,
        isTagSelectMode: isSelect
      }
    },
    removeSelectTagFromCollection(state: SideCollectionModelStateType, _) {
      return {
        ...state,
        selectedTags: [],
        tags: differenceWith<Tag, Tag>(state.tags, state.selectedTags, (a, b) => a.id === b.id)
      }
    },
  },

};
export default SideCollectionModel;
