import React from 'react';
import {Dispatch} from "@@/plugin-dva/connect";
import {connect} from "@@/plugin-dva/exports";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Card, Steps} from "antd";

const {Step} = Steps

interface CreateUserPagePropsType {
  dispatch: Dispatch,
}

function CreateUserPage({dispatch}: CreateUserPagePropsType) {
  return (
    <div>
      <PageHeaderWrapper>
        <Card>
          <Steps current={1}>
            <Step title="Finished" description="This is a description." />
            <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
            <Step title="Waiting" description="This is a description." />
          </Steps>
        </Card>
      </PageHeaderWrapper>
    </div>
  );
}

export default connect(({}) => ({}))(CreateUserPage);
