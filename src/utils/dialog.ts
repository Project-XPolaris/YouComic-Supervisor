import {Dispatch} from "dva";

export function setDialogActive({dispatch,dialogName,isActive}:{dispatch:Dispatch,dialogName:string,isActive:boolean}) {
  dispatch({
    type:"dialog/setDialogActive",
    payload:{
      key:dialogName,
      isActive
    }
  })
}
