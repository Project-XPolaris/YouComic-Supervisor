import {Reducer} from 'redux';
import {Book} from "@/services/book";
import {differenceWith,uniqBy} from 'lodash'
import {Tag} from "@/services/tag";
import {ButtonType} from "antd/es/button";
export interface BookSideCollectionAction {
  actionType:string
  title:string
  type:ButtonType
}
export interface TagSideCollectionAction {
  actionType:string
  title:string
  type:ButtonType
}
export interface SideCollectionModelStateType {
  books: []
  activeTab: string
  selectedBooks: Book[]
  isBookSelectMode: boolean
  bookActions:BookSideCollectionAction[]
  tags:Tag[]
  selectedTags:Tag[]
  isTagSelectMode:boolean
  tagActions:TagSideCollectionAction[]
}

export interface SideCollectionModelType {
  namespace: string,
  reducers: {
    addBookToCollection: Reducer
    setActiveTab: Reducer
    setSelectedBooks: Reducer
    setBookSelectMode: Reducer
    setSideCollectionBooksAction:Reducer
    removeSelectBookFromCollection:Reducer
    addTagsToCollection:Reducer
    setSelectedTags:Reducer
    setTagSelectMode:Reducer
    removeSelectTagFromCollection:Reducer
  }
  state: SideCollectionModelStateType
  effects: {}
  subscriptions: {}
}

const SideCollectionModel: SideCollectionModelType = {
  namespace: 'sideCollection',
  state: {
    books: [],
    activeTab: "books",
    selectedBooks: [],
    isBookSelectMode: false,
    bookActions:[],
    tags:[],
    selectedTags:[],
    isTagSelectMode:false,
    tagActions:[]
  },
  subscriptions: {},
  effects: {},
  reducers: {
    addBookToCollection(state, {payload: {books}}) {
      return {
        ...state,
        books: uniqBy([
          ...state.books,
          ...books
        ],"id")
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
    setSideCollectionBooksAction(state,{payload:{actions}}){
      return {
        ...state,
        bookActions:actions
      }
    },
    removeSelectBookFromCollection(state:SideCollectionModelStateType,_){
      return {
        ...state,
        selectedBooks:[],
        books:differenceWith<Book,Book>(state.books,state.selectedBooks,(a,b) => a.id === b.id)
      }
    },
    addTagsToCollection(state, {payload: {tags}}) {
      return {
        ...state,
        tags: uniqBy([
          ...state.tags,
          ...tags
        ],"id")
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
    removeSelectTagFromCollection(state:SideCollectionModelStateType,_){
      return {
        ...state,
        selectedTags:[],
        tags:differenceWith<Tag,Tag>(state.tags,state.selectedTags,(a,b) => a.id === b.id)
      }
    },
  },

};
export default SideCollectionModel;
