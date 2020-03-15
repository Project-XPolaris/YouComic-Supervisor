import React from 'react';
import {connect, Dispatch} from 'dva';
import {ConnectState} from "@/models/connect";
import {UserGroupDetailStateType} from "@/pages/usergroup/detail/model";
import {ColumnProps} from "antd/es/table/Column";
import {Link} from "umi";
import {Table} from "antd";
import {User} from "@/services/user";
import {TableRowSelection} from "antd/es/table/interface";


interface UsersPanelPropsType {
  dispatch: Dispatch,
  userGroupDetail: UserGroupDetailStateType
}

function UsersPanel({dispatch, userGroupDetail}: UsersPanelPropsType) {
  const {users,selectedUserIds} = userGroupDetail.usersPanel
  const userTableColumn: ColumnProps<User>[] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "nickname",
      title: "昵称",
      dataIndex: "nickname",
      render: (_, record) => (<Link to="#">{record.nickname}</Link>)

    },
  ]
  const selectionProps : TableRowSelection<User> = {
    selectedRowKeys:selectedUserIds,
    onChange:keys => {
      dispatch({
        type:"userGroupDetail/setSelectedUserIds",
        payload:{
          selectedUserIds:keys
        }
      })
    }
  }
  return (
    <div>
      <Table
        columns={userTableColumn}
        dataSource={users}
        rowKey={(rec:User) => rec.id}
        rowSelection={selectionProps}
      />
    </div>
  );
}

export default connect(({userGroupDetail}: ConnectState) => ({userGroupDetail}))(UsersPanel);
