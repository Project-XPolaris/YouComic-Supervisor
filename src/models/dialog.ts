import {Reducer} from 'redux';

export interface DialogStateType {
  dialogs: { [key: string]: boolean | undefined }
}

export interface DialogType {
  namespace: string,
  reducers: {
    setDialogActive: Reducer
  }
  state: DialogStateType
  effects: {}
  subscriptions: {}
}

const Dialog: DialogType = {
  namespace: 'dialog',
  state: {
    dialogs: {
      "bookList/filterDrawer":false
    }
  },
  subscriptions: {},
  effects: {},
  reducers: {
    setDialogActive(state, {payload: {key, isActive}}) {
      const {dialogs} = state;
      dialogs[key] = isActive;
      return {
        ...state,
        dialogs
      }
    }
  },

};
export default Dialog;
