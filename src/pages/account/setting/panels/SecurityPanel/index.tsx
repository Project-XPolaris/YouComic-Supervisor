import React from 'react';
import { connect, Dispatch } from 'dva';
import { Button } from 'antd';
import styles from './style.less';
import ChangePasswordDialog from '@/pages/account/setting/panels/SecurityPanel/components/ChangePasswordDialog';
import { ConnectState } from '@/models/connect';
import { DialogStateType } from '@/models/dialog';

interface SecurityPanelPropsType {
  dispatch: Dispatch;
  dialog: DialogStateType;
}

export const ChangePasswordDialogKey = 'accountSetting/ChangePasswordDialog';

function SecurityPanel({ dispatch, dialog: { dialogs } }: SecurityPanelPropsType) {
  const openChangePasswordDialog = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: ChangePasswordDialogKey,
        isActive: true,
      },
    });
  };
  const closeChangePasswordDialog = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: ChangePasswordDialogKey,
        isActive: false,
      },
    });
  };
  const onChangePassword = (oldPassword: string, newPassword: string) => {
    dispatch({
      type: 'accountSetting/changePassword',
      payload: {
        oldPassword,
        newPassword,
      },
    });
  };
  return (
    <div>
      <div>
        <ChangePasswordDialog
          isOpen={Boolean(dialogs[ChangePasswordDialogKey])}
          onClose={closeChangePasswordDialog}
          onChange={onChangePassword}
        />
        <div className={styles.label}>密码</div>
        <div>
          <Button type="primary" onClick={openChangePasswordDialog}>
            修改密码
          </Button>
        </div>
      </div>
    </div>
  );
}

export default connect(({ dialog }: ConnectState) => ({ dialog }))(SecurityPanel);
