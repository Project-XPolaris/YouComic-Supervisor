import React, { useState } from 'react';
import { connect, Dispatch } from 'dva';
import { Card, Col, Menu, Row } from 'antd';
import SecuritySettingIcon from '@ant-design/icons/LockFilled';
import PersonSettingIcon from '@ant-design/icons/UserOutlined';
import styles from './style.less';
import SecurityPanel from '@/pages/account/setting/panels/SecurityPanel';
import AccountSettingPanel from '@/pages/account/setting/panels/UserAccountPanel';

interface AccountSettingPropsType {
  dispatch: Dispatch;
}

function AccountSetting({}: AccountSettingPropsType) {
  const [activeTab, setActiveTab] = useState('security');
  const panelMapping = {
    security: <SecurityPanel />,
    account: <AccountSettingPanel />,
  };

  return (
    <Card className={styles.content}>
      <Row gutter={12}>
        <Col span={3}>
          <Menu
            selectedKeys={[activeTab]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            onSelect={select => setActiveTab(select.key)}
            className={styles.nav}
          >
            <Menu.Item key="account">
              <PersonSettingIcon />
              基本信息
            </Menu.Item>
            <Menu.Item key="security">
              <SecuritySettingIcon />
              安全设置
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={21}>{panelMapping[activeTab]}</Col>
      </Row>
    </Card>
  );
}

export default connect(({}) => ({}))(AccountSetting);
