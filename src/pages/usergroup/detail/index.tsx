import React from 'react';
import {connect, Dispatch} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Card, Tabs} from "antd";
import {ConnectState} from "@/models/connect";
import {UserGroupDetailStateType} from "@/pages/usergroup/detail/model";
import PermissionsPanel from "@/pages/usergroup/detail/Panel/PermissionPanel";
import UsersPanel from "@/pages/usergroup/detail/Panel/UsersPanel";
import HeaderAction from "@/pages/usergroup/detail/components/HeaderAction";

const {TabPane} = Tabs

interface UserGroupDetailPagePropsType {
  dispatch: Dispatch,
  userGroupDetail:UserGroupDetailStateType
}

function UserGroupDetailPage({dispatch,userGroupDetail}: UserGroupDetailPagePropsType) {

  return (
    <PageHeaderWrapper
      title={userGroupDetail.userGroup?.name}
      extra={<HeaderAction />}
    >
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab="权限" key="1">
          <PermissionsPanel />
        </TabPane>
        <TabPane tab="用户" key="2">
          <UsersPanel />
        </TabPane>
      </Tabs>
    </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({userGroupDetail}:ConnectState) => ({userGroupDetail}))(UserGroupDetailPage);
