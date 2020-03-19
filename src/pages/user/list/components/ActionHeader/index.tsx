import React from 'react';
import { connect, Dispatch } from 'dva';
import { Button, Tooltip } from 'antd';
import { Snapshot } from '@/services/snapshot';
import { generateSnapshotId } from '@/utils/utils';
import SnapshotDialog from '@/components/SnapshotDialog';
import { ConnectState } from '@/models/connect';
import { DialogStateType } from '@/models/dialog';
import CameraIcon from '@ant-design/icons/CameraFilled';
import { formatMessage } from 'umi/locale';

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
  return (
    <>
      <SnapshotDialog
        onOk={onAddToSnapshotClick}
        onClose={onAddToSnapshotDialogCancel}
        isOpen={Boolean(dialogs[AddToSnapshotDialogKey])}
      />
      <Tooltip title={formatMessage({ id: 'list.action.add-to-snapshot.tooltip' })}>
        <Button onClick={onAddToSnapshotButtonClick} icon={<CameraIcon />}>
          {formatMessage({ id: 'list.action.add-to-snapshot.button' })}
        </Button>
      </Tooltip>
    </>
  );
}

export default connect(({ dialog }: ConnectState) => ({ dialog }))(UserListActionHeader);
