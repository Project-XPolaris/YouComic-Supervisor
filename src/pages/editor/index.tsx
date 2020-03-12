import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {connect, Dispatch} from 'dva';
import {ConnectState} from "@/models/connect";
import {ImageEditorModelStateType} from "@/pages/editor/model";
import ReactCrop from 'react-image-crop';
import {createImage, getCroppedImg} from "@/utils/image";


interface ImageEditorPagePropsType {
  dispatch: Dispatch,
  editor: ImageEditorModelStateType
}

function ImageEditorPage({dispatch, editor}: ImageEditorPagePropsType) {
  const [crop, setCrop] = useState();
  const onImageChange = newCrop => {
    setCrop(newCrop)
    console.log(newCrop)
    getCroppedImg(editor.imageURL,newCrop,"img").then(blob => console.log(blob))
  };
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <ReactCrop style={{width:400}} src={editor.imageURL} crop={crop} onChange={onImageChange} />
    </div>
  );
}

export default connect(({editor}: ConnectState) => ({editor}))(ImageEditorPage);
