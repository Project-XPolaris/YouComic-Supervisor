import React from 'react';
import {Form, Input, Modal} from "antd";
import {useForm} from "antd/es/form/util";

interface PageOrderDialogPropsType {
  isOpen: boolean
  onCancel: () => void
  onSetOrder: (order:number) => void
}


export default function PageOrderDialog({isOpen, onCancel, onSetOrder}: PageOrderDialogPropsType) {
  const onSubmit = (values: any) => {
    const {order} = values;
    onSetOrder(order)
  };
  const [pageOrderForm] = useForm();
  const onOkClick = () => {
    pageOrderForm.submit()
  };
  return (
    <Modal
      title="更改顺序"
      visible={isOpen}
      onCancel={onCancel}
      onOk={onOkClick}
    >
      <Form
        form={pageOrderForm}
        onFinish={onSubmit}
      >
        <Form.Item label="顺序" name="order" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
}
