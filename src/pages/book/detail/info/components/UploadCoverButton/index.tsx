import React from 'react';
import {Button, Upload} from "antd";
import ImgCrop from 'antd-img-crop';

interface UploadCoverButtonPropsType {
  targetURL: string
}


export default function UploadCoverButton({targetURL}: UploadCoverButtonPropsType) {
  return (
    <ImgCrop contain={true} width={1400} height={2000}>
    <Upload name="image" action={targetURL} method="put" headers={{'X-Requested-With': null}}>
      <Button>
        Select File
      </Button>
    </Upload>
    </ImgCrop>
  );
}
