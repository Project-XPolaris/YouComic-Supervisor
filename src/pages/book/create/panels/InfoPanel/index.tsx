import React from 'react';
import {Button, Form, Input, Upload} from "antd";
import FormItem from "antd/es/form/FormItem";
import {FormInstance} from "antd/lib/form";
import UploadIcon from '@ant-design/icons/UploadOutlined'
import ImgCrop from 'antd-img-crop';
import {UploadProps} from "antd/es/upload";
import styles from './style.less'

interface InfoPanelPropsType {
  form:FormInstance
  onFinish:(values:any) => void
  onSetUploadCover:(file:File) => void
  cover?:File
}


export default function InfoPanel({form,onFinish,onSetUploadCover,cover}: InfoPanelPropsType) {
  const uploadProps:UploadProps = {
    customRequest:(options => {
      onSetUploadCover(options.file)
    })
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <FormItem label="名称" name="name">
          <Input/>
        </FormItem>
        <FormItem label="封面" name="cover">
          <ImgCrop contain width={1400} height={2000}>
            <Upload showUploadList={false} {...uploadProps}>
              <Button>
                <UploadIcon/>点击上传封面
              </Button>
            </Upload>
          </ImgCrop>
        </FormItem>
        <FormItem label="封面预览">
          {cover &&  <img src={URL.createObjectURL(cover)} className={styles.previewImg} alt="preview cover"/>}
        </FormItem>
      </Form>
    </div>
  );
}
