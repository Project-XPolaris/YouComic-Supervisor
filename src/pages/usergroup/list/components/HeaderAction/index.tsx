import React from 'react';
import {connect, Dispatch} from 'dva';
import {ConnectState} from "@/models/connect";
import {UserGroupListStateType} from "@/pages/usergroup/list/model";
import {Button, Dropdown, Menu} from "antd";
import MenuIcon from '@ant-design/icons/MenuOutlined'
import AddIcon from '@ant-design/icons/PlusOutlined'
import InputTextDialog from "@/components/InputTextDialog";
import {DialogStateType} from "@/models/dialog";

interface HeaderActionPropsType {
  userGroupList: UserGroupListStateType
  dispatch: Dispatch
  dialog: DialogStateType
}

export const CreateUserGroupDialogKey = "usergroups/create"
const HeaderAction = ({userGroupList, dispatch, dialog}: HeaderActionPropsType) => {
  const openCreateDialog = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: CreateUserGroupDialogKey,
        isActive: true
      }
    })
  }
  const closeCreateDialog = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: CreateUserGroupDialogKey,
        isActive: false
      }
    })
  }
  const onCreateUserGroup = (name: string) => {
    dispatch({
      type: "userGroupList/createUserGroup",
      payload: {
        name
      }
    })
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={openCreateDialog}>
        <AddIcon/>创建新用户组
      </Menu.Item>
    </Menu>
  );
  const multipleActionMenu = (
    <Menu>
      <Menu.Item key="1">
        <AddIcon/>创建新用户组
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <InputTextDialog
        visible={Boolean(dialog.dialogs[CreateUserGroupDialogKey])}
        onCreate={onCreateUserGroup}
        onCancel={closeCreateDialog}
        inputLabel="名称"
        dialogTitle="创建用户组"
      />
      {
        userGroupList.selectedUserGroupId.length > 0 &&
        <Dropdown overlay={multipleActionMenu}>
          <Button type="ghost">
            <MenuIcon/>多选
          </Button>
        </Dropdown>
      }
      {

      }
      <Dropdown overlay={menu}>
        <Button type="primary">
          <MenuIcon/>操作
        </Button>
      </Dropdown>
    </>
  );
}

export default connect(({userGroupList, dialog}: ConnectState) => ({userGroupList, dialog}))(HeaderAction)
