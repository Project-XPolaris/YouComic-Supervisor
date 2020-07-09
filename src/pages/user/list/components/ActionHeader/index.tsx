import React from 'react';
import {Button, Dropdown, Menu, Tooltip} from 'antd';
// @ts-ignore
import FilterIcon from '@ant-design/icons/FilterFilled';
import CameraIcon from '@ant-design/icons/CameraFilled';
import {Snapshot} from '@/services/snapshot';
import {generateSnapshotId} from '@/utils/utils';
import SnapshotDialog from '@/components/SnapshotDialog';
import {ConnectState} from '@/models/connect';
import {DialogStateType} from '@/models/dialog';
import UserListFilterDrawer, {UserListFilterDrawerKey,} from '@/pages/user/list/components/FilterDrawer';
import {connect} from "@@/plugin-dva/exports";
import {formatMessage} from "@@/plugin-locale/localeExports";
import {Dispatch} from "@@/plugin-dva/connect";
import {MenuOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {RegisterUserModalKey} from "@/pages/user/list/components/RegisterDialog";
import {history} from "@@/core/history";

const AddToSnapshotDialogKey = 'userList/AddToSnapshotDialog';

interface UserListActionHeaderPropsType {
  dispatch: Dispatch;
  dialog: DialogStateType;
}

function UserListActionHeader({dispatch, dialog: {dialogs}}: UserListActionHeaderPropsType) {
  const onAddToSnapshotButtonClick = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: AddToSnapshotDialogKey,
        isActive: true,
      },
    });
  };
  const onAddToSnapshotDialogCancel = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: AddToSnapshotDialogKey,
        isActive: false,
      },
    });
  };
  const onAddToSnapshotClick = (name: string) => {
    const snapshot: Snapshot = {
      id: generateSnapshotId(),
      icon: 'userList',
      name,
      url: history.location.pathname + history.location.search,
      extra: {},
      type: 'userList',
    };
    dispatch({
      type: 'global/addSnapshots',
      payload: {
        snapshotList: [snapshot],
      },
    });
    onAddToSnapshotDialogCancel();
  };
  const onOpenFilterDrawer = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: UserListFilterDrawerKey,
        isActive: true,
      },
    });
  };
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={
          () => dispatch({
            type: "dialog/setDialogActive",
            payload: {
              key: RegisterUserModalKey,
              isActive: true
            }
          })
        }>
        <PlusOutlined/> 注册用户
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <SnapshotDialog
        onOk={onAddToSnapshotClick}
        onClose={onAddToSnapshotDialogCancel}
        isOpen={Boolean(dialogs[AddToSnapshotDialogKey])}
      />
      <UserListFilterDrawer/>
      <Tooltip title={formatMessage({id: 'list.action.filter.tooltip'})}>
        <Button onClick={onOpenFilterDrawer} icon={<FilterIcon/>}>
          {formatMessage({id: 'list.action.filter.button'})}
        </Button>
      </Tooltip>
      <Tooltip title={formatMessage({id: 'list.action.add-to-snapshot.tooltip'})}>
        <Button onClick={onAddToSnapshotButtonClick} icon={<CameraIcon/>}>
          {formatMessage({id: 'list.action.add-to-snapshot.button'})}
        </Button>
      </Tooltip>
      <Dropdown overlay={menu}>
        <Button type="primary">
          菜单<MenuOutlined/>
        </Button>
      </Dropdown>
    </>
  );
}

export default connect(({dialog}: ConnectState) => ({dialog}))(UserListActionHeader);
