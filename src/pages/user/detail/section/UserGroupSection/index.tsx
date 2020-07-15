import React from 'react';
import {ConnectState} from "@/models/connect";
import {connect} from "@@/plugin-dva/exports";
import {UserDetailStateType} from "@/pages/user/detail/model";
import {Card, Table} from "antd";
import { Link } from 'umi';

export interface UserDetailUserGroupsPropsTypes {
  dispatch: any
  userDetail:UserDetailStateType
}

const UserDetailUserGroups = ({dispatch,userDetail}: UserDetailUserGroupsPropsTypes) => {
  return (
    <div>
      <Card title="用户组">
        <Table
          rowKey={(r) => r.id}
          columns={[
            {
              key: "id",
              dataIndex: "id",
              title: "ID"
            },
            {
              key: "name",
              dataIndex: "name",
              title: "Name",
              render:(v,r) => <Link to={`/usergroup/${r.id}`}>{v}</Link>
            },
          ]}
          dataSource={userDetail.groups.data || []}
        />
      </Card>
    </div>
  );
};

export default connect(({userDetail}:ConnectState) => ({userDetail}))(UserDetailUserGroups);
