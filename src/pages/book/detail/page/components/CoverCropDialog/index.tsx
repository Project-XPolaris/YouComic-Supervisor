import React, {useState} from 'react';
import {Modal} from "antd";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


interface CoverCropDialogPropsType {
  isShow: boolean
  onOk: () => void
  onCancel: () => void
  imgURL: string
}


export default function CoverCropDialog({isShow, onOk, onCancel, imgURL}: CoverCropDialogPropsType) {
  const [crop, setCrop] = useState({});
  return (
    <Modal
      visible={isShow}
      onOk={onOk}
      onCancel={onCancel}
      closeIcon={undefined}
    >
      <div style={{marginTop: 24}}>
        <ReactCrop
          src={imgURL}
          crop={crop}
          onChange={
            newCrop => {
              console.log(newCrop)
              setCrop(newCrop)
            }
          }/>
      </div>
    </Modal>
  );
}
