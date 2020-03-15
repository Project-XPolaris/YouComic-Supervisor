import React from 'react';
import {connect, Dispatch} from 'dva';
import {Button, Dropdown, Menu, Modal} from "antd";
import MenuIcon from "@ant-design/icons/MenuOutlined";
import AddIcon from "@ant-design/icons/PlusOutlined";
import UserIcon from "@ant-design/icons/UserOutlined";
import UserGroupIcon from "@ant-design/icons/TeamOutlined";
import DeleteIcon from "@ant-design/icons/DeleteFilled";
import PermissionIcon from "@ant-design/icons/KeyOutlined";
import AddPermissionDialog from "@/pages/usergroup/detail/components/AddPermissionDialog";
import {ConnectState} from "@/models/connect";
import {DialogStateType} from "@/models/dialog";
import {UserGroupDetailStateType} from "@/pages/usergroup/detail/model";
import AddUserDialog from "@/pages/usergroup/detail/components/AddUserDialog";

const { confirm } = Modal;


interface HeaderActionPropsType {
  dispatch: Dispatch,
  dialog: DialogStateType,
  userGroupDetail: UserGroupDetailStateType
}

export const AddPermissionDialogKey = "userGroupDetail/addPermissionDialog"
export const AddUserDialogKey = "userGroupDetail/addUserDialog"

function HeaderAction({dispatch, dialog: {dialogs}, userGroupDetail}: HeaderActionPropsType) {
  const openAddPermissionDialog = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: AddPermissionDialogKey,
        isActive: true
      }
    })
  }
  const renderAddPermissionDialog = () => {

    const closeAddPermissionDialog = () => {
      dispatch({
        type: "dialog/setDialogActive",
        payload: {
          key: AddPermissionDialogKey,
          isActive: false
        }
      })
    }
    const onSearchPermission = (key: string) => {
      dispatch({
        type: "userGroupDetail/searchPermission",
        payload: {
          key
        }
      })
    }
    const onAddPermissionDialogOK = (options:any[]) => {
      dispatch({
        type: "userGroupDetail/addPermissionsToUserGroup",
        payload: {
          permissionIds:options.map(option => option.value)
        }
      })
    }
    return (
      <AddPermissionDialog
        isOpen={Boolean(dialogs[AddPermissionDialogKey])}
        onClose={closeAddPermissionDialog}
        permissions={userGroupDetail.searchPermissions.permissions}
        onSearch={onSearchPermission}
        onOk={onAddPermissionDialogOK}
      />
    )
  }

  const openAddUserDialog = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: AddUserDialogKey,
        isActive: true
      }
    })
  }
  const renderAddUserDialog = () => {

    const closeAddUserDialog = () => {
      dispatch({
        type: "dialog/setDialogActive",
        payload: {
          key: AddUserDialogKey,
          isActive: false
        }
      })
    }
    const onSearchUser = (key: string) => {
      dispatch({
        type: "userGroupDetail/searchUser",
        payload: {
          key
        }
      })
    }
    const onAddUserDialogOK = (options:any[]) => {
      dispatch({
        type: "userGroupDetail/addUsersToUserGroup",
        payload: {
          userIds:options.map(option => option.value)
        }
      })
    }
    return (
      <AddUserDialog
        isOpen={Boolean(dialogs[AddUserDialogKey])}
        onClose={closeAddUserDialog}
        users={userGroupDetail.searchUsers.users}
        onSearch={onSearchUser}
        onOk={onAddUserDialogOK}
      />
    )
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={openAddPermissionDialog}>
        <AddIcon/>添加权限
      </Menu.Item>
      <Menu.Item key="2" onClick={openAddUserDialog}>
        <UserIcon/>添加用户
      </Menu.Item>
    </Menu>
  );
  const MultipleUserSelectMenu = () => {
    const onRemoveClick = () => {
      confirm({
        title:"删除确认",
        content:"将会从当前的用户组中移除所选用户",
        onOk:() => {
          dispatch({
            type:"userGroupDetail/removeSelectedUserFromUserGroup"
          })
        }
      })
    }
    return (
      <Menu>
        <Menu.Item key="1" onClick={onRemoveClick}>
          <DeleteIcon/>从当前用户组移除
        </Menu.Item>
      </Menu>
    )
  }
  const MultiplePermissionSelectMenu = () => {
    const onRemoveClick = () => {
      confirm({
        title:"删除确认",
        content:"将会从当前的用户组中移除所选权限",
        onOk:() => {
          dispatch({
            type:"userGroupDetail/removeSelectedPermissionFromUserGroup"
          })
        }
      })
    }
    return (
      <Menu>
        <Menu.Item key="1" onClick={onRemoveClick}>
          <DeleteIcon/>从当前用户组移除
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <>
      {renderAddPermissionDialog()}
      {renderAddUserDialog()}
      {
        userGroupDetail.usersPanel.selectedUserIds.length > 0 &&
        <Dropdown overlay={MultipleUserSelectMenu}>
          <Button type="primary">
            <UserGroupIcon/>操作用户
          </Button>
        </Dropdown>
      }
      {
        userGroupDetail.permissionsPanel.selectedPermissionIds.length > 0 &&
        <Dropdown overlay={MultiplePermissionSelectMenu}>
          <Button type="primary">
            <PermissionIcon/>操作权限
          </Button>
        </Dropdown>
      }
      <Dropdown overlay={menu}>
        <Button type="primary">
          <MenuIcon/>操作
        </Button>
      </Dropdown>
    </>
  );
}

export default connect(({dialog, userGroupDetail}: ConnectState) => ({dialog, userGroupDetail}))(HeaderAction);
