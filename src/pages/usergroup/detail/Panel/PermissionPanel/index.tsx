import React from 'react';
import {connect, Dispatch} from 'dva';
import {Table} from "antd";
import {ColumnProps} from "antd/es/table/Column";
import {Link} from "umi";
import {Permission} from "@/services/permission";
import {UserGroupDetailStateType} from "@/pages/usergroup/detail/model";
import {ConnectState} from "@/models/connect";
import {TableRowSelection} from "antd/es/table/interface";


interface PermissionsPanelPropsType {
  dispatch: Dispatch,
  userGroupDetail:UserGroupDetailStateType
}

function PermissionsPanel({userGroupDetail,dispatch}: PermissionsPanelPropsType) {
  const {permissions,selectedPermissionIds} = userGroupDetail.permissionsPanel
  const permissionTableColumn: ColumnProps<Permission>[] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "name",
      title: "名称",
      dataIndex: "name",
      render: (_, record) => (<Link to="#">{record.name}</Link>)
    },
  ]
  const selectionProps : TableRowSelection<Permission> = {
    selectedRowKeys:selectedPermissionIds,
    onChange:keys => {
      dispatch({
        type:"userGroupDetail/setSelectedPermissionIds",
        payload:{
          selectedPermissionIds:keys
        }
      })
    }
  }
  return (
    <div>
      <Table
        columns={permissionTableColumn}
        dataSource={permissions}
        rowKey={(rec:Permission) => rec.id}
        rowSelection={selectionProps}
      />
    </div>
  );
}

export default connect(({userGroupDetail}:ConnectState) => ({userGroupDetail}))(PermissionsPanel);
