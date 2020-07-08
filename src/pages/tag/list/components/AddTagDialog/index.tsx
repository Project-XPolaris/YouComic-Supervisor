import React from 'react';
import {Form, Input, Modal} from "antd";
import styles from "@/pages/book/detail/tag/components/AddTagDialog/style.less";
import {useForm} from "antd/es/form/Form";


interface AddTagDialogPropsType {
  isOpen?:boolean
  onAdd:(name:string,type:string) => void
  onCancel:() => void
}


export default function AddTagDialog({isOpen=false,onCancel,onAdd}: AddTagDialogPropsType) {
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
