import { Effect } from 'dva';
import { Reducer } from 'redux';
import { Book, updateBook } from '@/services/book';
import { ConnectState } from '@/models/connect';

export interface BookDetailInfoStateType {
  activeEditMode: boolean;
}

export interface BookDetailInfoType {
  namespace: string;
  reducers: {
    setEditMode: Reducer;
  };
  state: BookDetailInfoStateType;
  effects: {
    updateBook: Effect;
  };
  subscriptions: {};
}

const BookDetailInfo: BookDetailInfoType = {
  namespace: 'bookDetailInfo',
  state: {
    activeEditMode: false,
  },
  subscriptions: {},
  effects: {
    *updateBook({ payload: { name } }, { call, put, select }) {
      const { book }: { book: Book } = yield select((state: ConnectState) => state.bookDetail);
      if (book === undefined) {
        return;
      }
      yield call(updateBook, {
        id: book.id,
        update: {
          name,
        },
      });
      yield put({
        type: 'bookDetail/queryBook',
      });
      yield put({
        type: 'setEditMode',
        payload: {
          editMode: false,
        },
      });
    },
  },
  reducers: {
    setEditMode(state, { payload }) {
      return {
        ...state,
        activeEditMode: payload.editMode,
      };
    },
  },
};
export default BookDetailInfo;
