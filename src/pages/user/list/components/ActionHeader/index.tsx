import React from 'react';
import { connect, Dispatch } from 'dva';
import { Button, Tooltip } from 'antd';
// @ts-ignore
import { formatMessage } from 'umi/locale';
import FilterIcon from '@ant-design/icons/FilterFilled';
import CameraIcon from '@ant-design/icons/CameraFilled';
import { Snapshot } from '@/services/snapshot';
import { generateSnapshotId } from '@/utils/utils';
import SnapshotDialog from '@/components/SnapshotDialog';
import { ConnectState } from '@/models/connect';
import { DialogStateType } from '@/models/dialog';
import UserListFilterDrawer, {
  UserListFilterDrawerKey,
} from '@/pages/user/list/components/FilterDrawer';

const AddToSnapshotDialogKey = 'userList/AddToSnapshotDialog';

interface UserListActionHeaderPropsType {
  dispatch: Dispatch;
  dialog: DialogStateType;
}

function UserListActionHeader({ dispatch, dialog: { dialogs } }: UserListActionHeaderPropsType) {
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
      url: window.location.pathname + window.location.search,
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
  return (
    <>
      <SnapshotDialog
        onOk={onAddToSnapshotClick}
        onClose={onAddToSnapshotDialogCancel}
        isOpen={Boolean(dialogs[AddToSnapshotDialogKey])}
      />
      <UserListFilterDrawer />
      <Tooltip title={formatMessage({ id: 'list.action.filter.tooltip' })}>
        <Button type="primary" onClick={onOpenFilterDrawer} icon={<FilterIcon />}>
          {formatMessage({ id: 'list.action.filter.button' })}
        </Button>
      </Tooltip>
      <Tooltip title={formatMessage({ id: 'list.action.add-to-snapshot.tooltip' })}>
        <Button onClick={onAddToSnapshotButtonClick} icon={<CameraIcon />}>
          {formatMessage({ id: 'list.action.add-to-snapshot.button' })}
        </Button>
      </Tooltip>
    </>
  );
}

export default connect(({ dialog }: ConnectState) => ({ dialog }))(UserListActionHeader);
