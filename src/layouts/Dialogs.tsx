import React from "react"
import {connect, Dispatch} from "umi";
import {ConnectState} from "@/models/connect";
import {DialogStateType} from "@/models/dialog";
import {ProgressDialog} from "@/components/ProgressDialog";

const Dialogs = ({ dialog,dispatch }:{ dialog:DialogStateType,dispatch:Dispatch }) => {
  return (
    <>
      <ProgressDialog
        isOpen={dialog.progress.isOpen}
        hint={dialog.progress.hint}
        progress={dialog.progress.progress}
        onClose={() => dispatch({ type:"dialog/closeProgressDialog" })}
        closeable={dialog.progress.closeable}
      />
    </>
  )
}
export default connect(({ dialog }: ConnectState) => ({
  dialog
  // @ts-ignore
}))(Dialogs);
