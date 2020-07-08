import React from 'react';
import {Form, Input, Modal} from "antd";
import styles from "@/pages/book/detail/tag/components/AddTagDialog/style.less";
import {Tag} from "@/services/tag";
import {useForm} from "antd/es/form/Form";


interface UpdateTagDialogPropsType {
  isOpen?: boolean
  onUpdate: (name: string, type: string) => void
  onCancel: () => void
  tag?: Tag
}


export default function UpdateTagDialog({isOpen = false, onCancel, onUpdate,tag}: UpdateTagDialogPropsType) {
  const onSubmit = (values: any) => {
    const {name, type} = values;
    onUpdate(name, type)
  };
  const [updateTagForm] = useForm();
  updateTagForm.resetFields(["name","type"]);
  const onOkClick = () => {
    updateTagForm.submit()
  };
  const onDialogClose = () => {
    updateTagForm.resetFields(["name","type"]);
    onCancel()
  };
  return <Modal
    title="修改标签"
    visible={isOpen}
    onCancel={onDialogClose}
    onOk={onOkClick}
  >
    <Form
      form={updateTagForm}
      onFinish={onSubmit}
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[{required: true}]}
      >
        <Input className={styles.inputField} defaultValue={tag?.name}/>
      </Form.Item>
      <Form.Item label="类型" name="type" rules={[{required: true}]}>
        <Input className={styles.inputField} defaultValue={tag?.type}/>
      </Form.Item>
    </Form>
  </Modal>;
}
