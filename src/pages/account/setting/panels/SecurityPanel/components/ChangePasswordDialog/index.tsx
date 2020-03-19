import React from 'react';
import { Form, Input, Modal } from 'antd';

interface ChangePasswordDialogPropsType {
  isOpen: boolean;
  onClose: () => void;
  onChange: (oldPassword: string, newPassword: string) => void;
}

export default function ChangePasswordDialog({
  isOpen,
  onClose,
  onChange,
}: ChangePasswordDialogPropsType) {
  const [form] = Form.useForm();

  const onOk = () => {
    form.validateFields().then(values => {
      const { oldPassword, newPassword } = values;
      onChange(oldPassword, newPassword);
      form.resetFields();
    });
  };
  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      maskClosable={false}
      closable={false}
      title="修改密码"
      onOk={onOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="oldPassword"
          label="原密码"
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="reNewPassword"
          label="确认新密码"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: '请输入确认新密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密码与确认密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
