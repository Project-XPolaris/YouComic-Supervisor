import {connect} from "@@/plugin-dva/exports";
import {ConnectState} from "@/models/connect";
import React from "react";
import {Pie, TagCloud, yuan} from "ant-design-pro/lib/Charts";
import {Card, Col, Grid, Row, Tag} from "antd";
import style from './style.less';
import {TagCount} from "@/services/tag";
import {HomeModelStateType} from "@/pages/welcome/model";

export interface TagCardPropsType {
  home: HomeModelStateType
}

const TagCard = ({home}: TagCardPropsType) => {
  const getTotalPercent = (value: TagCount) => {
    if (home.totalBookCount) {
      return Math.round((value.total / home.totalBookCount) * 100)
    }
    return 100
  }
  return (
    <Card className={style.root} title="标签Top">
      <div className={style.content}>
        <div>
          <Row gutter={16}>
            {
              home.tagCount && home.totalBookCount &&
              home.tagCount.map((count: TagCount,idx:number) => (
                <Col span={4} key={idx}>
                  <Pie percent={getTotalPercent(count)} subTitle={count.name} total={`${getTotalPercent(count)}%`} key={count.name} height={140}/>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default connect(({home}: ConnectState) => ({home}))(TagCard);
