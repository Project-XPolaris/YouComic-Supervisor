import {AnyAction} from 'redux';
import {MenuDataItem} from '@ant-design/pro-layout';
import {RouterTypes} from 'umi';
import {GlobalModelState} from './global';
import {DefaultSettings as SettingModelState} from '../../config/defaultSettings';
import {UserModelState} from './user';
import {BookListModelStateType} from '@/pages/book/list/model';
import {StateType} from "@/models/login";
import {Dispatch} from "dva";
import BookDetail from "@/pages/book/detail";
import {DetailModelStateType} from "@/pages/book/detail/model";
import {BookDetailInfoStateType} from "@/pages/book/detail/info/model";
import {BookDetailTagsStateType} from "@/pages/book/detail/tag/model";
import {DialogStateType} from "@/models/dialog";
import {BookDetailPageModelStateType} from "@/pages/book/detail/page/model";
import {ImageEditorModelStateType} from "@/pages/editor/model";
import {TagListModelStateType} from "@/pages/tag/list/model";
import {SideCollectionModelStateType} from "@/models/side";
import {TagDetailModelStateType} from "@/pages/tag/detail/model";
import {CreateBookPageModelStateType} from "@/pages/book/create/model";

export {GlobalModelState, SettingModelState, UserModelState};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: StateType;
  bookList: BookListModelStateType
  bookDetail: DetailModelStateType
  bookDetailInfo: BookDetailInfoStateType
  bookDetailTags: BookDetailTagsStateType
  bookDetailPages: BookDetailPageModelStateType
  dialog: DialogStateType
  editor:ImageEditorModelStateType
  tagList:TagListModelStateType
  sideCollection:SideCollectionModelStateType
  tagDetail:TagDetailModelStateType
  createBook:CreateBookPageModelStateType
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}
