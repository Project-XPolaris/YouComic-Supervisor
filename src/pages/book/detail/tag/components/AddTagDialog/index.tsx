import React from 'react';
import styles from './style.less'
import {Form, Input, Modal} from "antd";
import {useForm} from "antd/es/form/util";

interface AddTagDialogPropsType {
  isOpen: boolean
  onCancel: () => void
  onAdd: (name: string, type: string) => void
}


export default function AddTagDialog({isOpen, onCancel, onAdd}: AddTagDialogPropsType) {
  const onSubmit = (values: any) => {
    const {name, type} = values;
    onAdd(name, type)
  };
  const [addTagForm] = useForm();
  const onOkClick = () => {
    addTagForm.submit()
  };
  return (
    <Modal
      title="添加标签"
      visible={isOpen}
      onCancel={onCancel}
      onOk={onOkClick}
    >
      <Form
        form={addTagForm}
        onFinish={onSubmit}
      >
        <Form.Item label="名称" name="name" rules={[{required: true}]}>
          <Input className={styles.inputField}/>
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{required: true}]}>
          <Input className={styles.inputField}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}
