import {connect} from "@@/plugin-dva/exports";
import {Card, Table} from "antd";
import React from "react";
import {ConnectState} from "@/models/connect";
import {HomeModelStateType} from "@/pages/welcome/model";

export interface RecentlyAddTagCardPropsType {
  home: HomeModelStateType
}

const RecentlyAddTagCard = ({home}: RecentlyAddTagCardPropsType) => {
  return (
    <Card title="最近添加">
      <Table
        dataSource={home.recentlyAddTag || []}
        pagination={false}
        rowKey="id"
        columns={[
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
          {
            key: "type",
            title: "类型",
            dataIndex: "type"
          },
        ]}
      />
    </Card>
  );
};

export default connect(({home}: ConnectState) => ({home}))(RecentlyAddTagCard);
