import React from 'react';
import {connect, Dispatch} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Card, Table} from "antd";
import {ColumnProps} from "antd/es/table/Column";
import {Permission} from "@/services/permission";
import {ConnectState} from "@/models/connect";
import {PermissionListModelStateType} from "@/pages/permission/list/model";
import {PaginationConfig} from "antd/es/pagination";
import {updateQueryParamAndReplaceURL} from "@/utils/uri";


interface PermissionListPagePropsType {
  dispatch: Dispatch,
  permissionList: PermissionListModelStateType
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

function PermissionListPage({permissionList}: PermissionListPagePropsType) {
  const onPageChange = (toPage: number, toPageSize: number = 20) => {
    updateQueryParamAndReplaceURL({page: toPage, pageSize: toPageSize})
  };
  const paginationProps: PaginationConfig = {
    current: permissionList.page,
    pageSize: permissionList.pageSize,
    total: permissionList.count,
    onChange: (page, pageSize) => onPageChange(page, pageSize)
  }
  return (
    <PageHeaderWrapper>
      <Card>
        <Table
          columns={permissionTableColumn}
          dataSource={permissionList.permissions}
          pagination={paginationProps}
        />
      </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({permissionList}: ConnectState) => ({permissionList}))(PermissionListPage);
