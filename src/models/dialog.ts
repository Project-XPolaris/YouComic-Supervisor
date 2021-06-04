import {Reducer} from 'redux';


export interface DialogStateType {
  dialogs: { [key: string]: boolean | undefined }
  progress: {
    isOpen: boolean
    hint?: string
    progress?: number
    closeable:boolean
  }
}

export interface DialogType {
  namespace: string,
  reducers: {
    setDialogActive: Reducer,
    openProgressDialog: Reducer
    closeProgressDialog: Reducer
    updateProgressDialog: Reducer
  }
  state: DialogStateType
  effects: {}
  subscriptions: {}
}

const Dialog: DialogType = {
  namespace: 'dialog',
  state: {
    dialogs: {
      "bookList/filterDrawer": false
    },
    progress: {
      isOpen: false,
      closeable:false
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
    },
    openProgressDialog(state, {payload: {progress, hint,closeable = false}}) {
      return {
        ...state,
        progress: {
          isOpen: true,
          progress, hint
        }
      }
    },
    closeProgressDialog(state, { }) {
      return {
        ...state,
        progress: {
          isOpen: false,
        }
      }
    },
    updateProgressDialog(state, { payload: {progress, hint,closeable = false} }) {
      return {
        ...state,
        progress: {
          progress,hint
        }
      }
    }
  },

};
export default Dialog;
