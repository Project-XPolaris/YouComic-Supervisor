import React from 'react';
import {connect, Dispatch} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {ConnectState} from "@/models/connect";
import {UserGroupListStateType} from "@/pages/usergroup/list/model";
import {ColumnProps} from "antd/es/table/Column";
import {Link} from "umi";
import {Card, Table} from "antd";
import {UserGroup} from "@/services/usergroup";
import {updateQueryParamAndReplaceURL} from "@/utils/uri";
import {PaginationConfig} from "antd/es/pagination";
import HeaderAction from "@/pages/usergroup/list/components/HeaderAction";
import {TableRowSelection} from "antd/es/table/interface";


interface UserGroupPagePropsType {
  dispatch: Dispatch,
  userGroupList: UserGroupListStateType
}

const userGroupTableColumn: ColumnProps<UserGroup>[] = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id"
  },
  {
    key: "name",
    title: "名称",
    dataIndex: "name",
    render: (_, record) => (<Link to={`/usergroup/${record.id}`}>{record.name}</Link>)

  },
]

function UserGroupPage({dispatch, userGroupList}: UserGroupPagePropsType) {
  const onPageChange = (toPage: number, toPageSize: number = 20) => {
    updateQueryParamAndReplaceURL({page: toPage, pageSize: toPageSize})
  };
  const paginationProps: PaginationConfig = {
    current: userGroupList.page,
    pageSize: userGroupList.pageSize,
    total: userGroupList.count,
    onChange: (page, pageSize) => onPageChange(page, pageSize)
  }
  const rowSelectProps : TableRowSelection<UserGroup> = {
    selectedRowKeys:userGroupList.selectedUserGroupId,
    onChange:(keys,_) => {
      dispatch({
        type:"userGroupList/setSelectUserGroup",
        payload:{
          userGroupIds:keys
        }
      })
    }
  }
  return (
    <PageHeaderWrapper
      extra={<HeaderAction/>}
    >
      <Card>
        <Table
          columns={userGroupTableColumn}
          dataSource={userGroupList.userGroups}
          pagination={paginationProps}
          rowKey={(rec) => rec.id}
          rowSelection={rowSelectProps}
        />
      </Card>

    </PageHeaderWrapper>
  );
}

export default connect(({userGroupList}: ConnectState) => ({userGroupList}))(UserGroupPage);
