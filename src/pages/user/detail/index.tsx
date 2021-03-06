import React from 'react';
import {connect, Dispatch} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {ConnectState} from "@/models/connect";
import {UserDetailStateType} from "@/pages/user/detail/model";
import UserPermissionSection from "@/pages/user/detail/section/UserPermissionSection";
import UserDetailUserGroups from "@/pages/user/detail/section/UserGroupSection";


interface UserDetailPagePropsType {
  dispatch: Dispatch,
  userDetail: UserDetailStateType
}

function UserDetailPage({dispatch, userDetail}: UserDetailPagePropsType) {

  return (
    <PageHeaderWrapper title={userDetail.user?.nickname}>
      <UserDetailUserGroups />
      <UserPermissionSection />
    </PageHeaderWrapper>
  );
}

export default connect(({userDetail}: ConnectState) => ({userDetail}))(UserDetailPage);
