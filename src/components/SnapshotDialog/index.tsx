import React from 'react';
import {Form, Input, Modal} from "antd";
import {useForm} from "antd/es/form/Form";

const {Item} = Form

interface SnapshotDialogPropsType {
  isOpen?: boolean
  onOk: (name:string) => void
  onClose: () => void
}


export default function SnapshotDialog({isOpen = false, onOk, onClose}: SnapshotDialogPropsType) {
  const [form] = useForm();
  const onFormSubmit = (values:any) => {
    const {name} = values;
    onOk(name)
  };
  const onModalOk = () => {
    form.submit()
  };
  return (
    <Modal
      title="添加快照"
      visible={isOpen}
      onOk={onModalOk}
      onCancel={onClose}
    >
      <Form
        form={form}
        onFinish={onFormSubmit}
      >
        <Item name="name" label="名称">
          <Input />
        </Item>
      </Form>
    </Modal>
  );
}
