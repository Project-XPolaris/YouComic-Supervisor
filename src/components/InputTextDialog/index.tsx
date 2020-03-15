import React from 'react';
import {Form, Input, Modal} from "antd";


interface InputTextDialogPropsType {
  visible: boolean
  onCreate: (value: string) => void
  onCancel: () => void
  inputLabel: string
  dialogTitle: string
}


export default function InputTextDialog({visible, onCancel, onCreate, inputLabel, dialogTitle}: InputTextDialogPropsType) {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={dialogTitle}
      okText="OK"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values.text);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{modifier: 'public'}}
      >
        <Form.Item
          name="text"
          label={inputLabel}
          rules={[{required: true, message: 'Please input the title of collection!'}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
}
