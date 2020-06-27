import React from 'react';
import { connect, Dispatch } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import { ColumnProps } from 'antd/es/table/Column';
import { User } from '@/services/user';
import { ConnectState } from '@/models/connect';
import { UserListModelStateType } from '@/pages/user/list/model';
import { PaginationConfig } from 'antd/es/pagination';
import { updateQueryParamAndReplaceURL } from '@/utils/uri';
import { Link } from 'umi';
import UserListActionHeader from '@/pages/user/list/components/ActionHeader';
import RegisterUserDialog from "@/pages/user/list/components/RegisterDialog";

interface UserListPagePropsType {
  dispatch: Dispatch;
  userList: UserListModelStateType;
}

const userTableColumn: ColumnProps<User>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'username',
    title: '用户名',
    dataIndex: 'username',
  },
  {
    key: 'nickname',
    title: '昵称',
    dataIndex: 'nickname',
    render: (_, record) => <Link to={`/users/${record.id}`}>{record.nickname}</Link>,
  },
];

function UserListPage({ userList }: UserListPagePropsType) {
  const onPageChange = (toPage: number, toPageSize: number = 20) => {
    updateQueryParamAndReplaceURL({ page: toPage, pageSize: toPageSize });
  };
  const paginationProps: PaginationConfig = {
    current: userList.page,
    pageSize: userList.pageSize,
    total: userList.count,
    onChange: (page, pageSize) => onPageChange(page, pageSize),
  };
  return (
    <PageHeaderWrapper extra={<UserListActionHeader />}>
      <RegisterUserDialog/>
      <Card>
        <Table columns={userTableColumn} dataSource={userList.users} pagination={paginationProps} />
      </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({ userList }: ConnectState) => ({ userList }))(UserListPage);
