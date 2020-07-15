import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {connect, Dispatch} from 'dva';
import {Card, Table} from "antd";
import {ColumnProps} from "antd/es/table/Column";
import {Permission} from "@/services/permission";
import {ConnectState} from "@/models/connect";
import {UserDetailStateType} from "@/pages/user/detail/model";


interface UserPermissionSectionPropsType {
  dispatch: Dispatch,
  userDetail: UserDetailStateType
}

const permissionTableColumn: ColumnProps<Permission>[] = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id"
  },
  {
    key: "name",
    title: "名称",
    dataIndex: "name"
  },
]

function UserPermissionSection({dispatch,userDetail}: UserPermissionSectionPropsType) {

  return (
    <Card title="权限">
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
            title: "Name"
          },
        ]}
        dataSource={userDetail.permissions.data || []}
      />
    </Card>
  );
}

export default connect(({userDetail}: ConnectState) => ({userDetail}))(UserPermissionSection);
