import React from 'react';
import {connect, Dispatch} from 'umi';
import {Form, Input, Modal} from "antd";
import {ConnectState} from "@/models/connect";
import {DialogStateType} from "@/models/dialog";
import {useIntl} from '@@/plugin-locale/localeExports'

export const RegisterUserModalKey = "userList/register"

interface RegisterUserDialogPropsType {
  dispatch: Dispatch,
  dialog: DialogStateType
}

function RegisterUserDialog({dispatch, dialog: {dialogs}}: RegisterUserDialogPropsType) {
  const intl = useIntl()
  const [form] = Form.useForm();
  const onCancel = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: RegisterUserModalKey,
        isActive: false
      }
    })
  }
  return (
    <Modal
      visible={Boolean(dialogs[RegisterUserModalKey])}
      title={intl.formatMessage({id: "userList.modal.register.title"})}
      okText={intl.formatMessage({id: "userList.modal.register.ok"})}
      cancelText={intl.formatMessage({id: "global.modal.cancel"})}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCancel();
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="user_list_register"
        initialValues={{modifier: 'public'}}
      >
        <Form.Item
          name="username"
          label={intl.formatMessage({id: "global.username"})}
          rules={[{required: true, message: intl.formatMessage({id: "global.error.required-field.message"})}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="description"
          label={intl.formatMessage({id: "global.password"})}
          rules={[{required: true, message: intl.formatMessage({id: "global.error.required-field.message"})}]}
        >
          <Input type="password"/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default connect(({dialog}: ConnectState) => ({dialog}))(RegisterUserDialog);
