import React from 'react';
import { connect, Dispatch } from 'dva';
import { Avatar, Button, Descriptions, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import { AccountSettingStateType } from '@/pages/account/setting/model';
import styles from './style.less';

interface AccountSettingPanelPropsType {
  dispatch: Dispatch;
  accountSetting: AccountSettingStateType;
}

function AccountSettingPanel({ dispatch, accountSetting }: AccountSettingPanelPropsType) {
  const setUpdateField = (field: string, value: string) => {
    dispatch({
      type: 'accountSetting/setUpdateUser',
      payload: {
        field,
        value,
      },
    });
  };
  const onApply = () => {
    dispatch({
      type: 'accountSetting/applyUserUpdate',
    });
  };
  return (
    <div className={styles.main}>
      {accountSetting.currentUser && (
        <>
          <div className={styles.avatarWrap}>
            {accountSetting.currentUser.avatar.length === 0 ? (
              <Avatar size={72} icon={<UserOutlined />} shape="square" />
            ) : (
              <Avatar size={72} src={accountSetting.currentUser.avatar} shape="square" />
            )}
          </div>
          <Descriptions column={1}>
            <Descriptions.Item label="账户名">
              <Typography.Text>{accountSetting.currentUser.username}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="昵称">
              <Typography.Text
                editable={{
                  onChange: text => setUpdateField('nickname', text),
                }}
              >
                {accountSetting.accountPanel.update?.nickname !== undefined
                  ? accountSetting.accountPanel.update.nickname
                  : accountSetting.currentUser.nickname}
              </Typography.Text>
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
      {accountSetting.accountPanel.update && (
        <div className={styles.footerAction}>
          <Button type="primary" onClick={onApply}>
            应用
          </Button>
        </div>
      )}
    </div>
  );
}

export default connect(({ accountSetting }: ConnectState) => ({ accountSetting }))(
  AccountSettingPanel,
);
