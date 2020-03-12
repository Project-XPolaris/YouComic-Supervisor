import React from 'react';
import {Button, Upload} from "antd";
import FileIcon from '@ant-design/icons/FileImageFilled'
import DIRIcon from '@ant-design/icons/FolderFilled'
import {UploadProps} from "antd/es/upload";
import styles from './style.less'
import {BookPage} from "@/pages/book/create";
import Resizer from 'react-image-file-resizer';
import {connect, Dispatch} from 'dva';
import {ConnectState} from "@/models/connect";


interface PageUploadPropsType {
  onFilesChange: (imageFiles: BookPage[]) => void
  imageFiles: BookPage[],
  dispatch: Dispatch
}

function PageUpload({onFilesChange, imageFiles,dispatch}: PageUploadPropsType) {
  const uploadFileProps: UploadProps = {
    showUploadList: false,
    customRequest: options => {

      console.log(options)
      // Resizer.imageFileResizer(
      //   options.file,
      //   300,
      //   300,
      //   'JPEG',
      //   100,
      //   0,
      //   (uri:string) => {
      //     onFilesChange([
      //       ...imageFiles,
      //       {file:options.file,thumbnail:uri}
      //     ]);
      //   },
      // )
    }
  };
  const uploadDirProps: UploadProps = {
    customRequest: options => {
      dispatch({
        type:"createBook/generatePageImageThumbnail",
        payload:{
          file:options.file
        }
      });
      onFilesChange([
        ...imageFiles,
        {file:options.file,thumbnail:""}
      ])
    },
    directory: true,
    showUploadList: false
  };
  return (
    <div>
      <Upload {...uploadFileProps} className={styles.uploadButton}>
        <Button type="primary">
          <FileIcon/>选择文件
        </Button>
      </Upload>
      <Upload {...uploadDirProps} className={styles.uploadButton}>
        <Button type="primary">
          <DIRIcon/>选择文件夹
        </Button>
      </Upload>
    </div>
  );
}


export default connect(({}: ConnectState) => ({}))(PageUpload)
