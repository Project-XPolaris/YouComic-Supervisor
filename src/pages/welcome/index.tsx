import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Col, Row} from 'antd';
import InfoCard from "@/components/InfoCard";
import {BookOutlined, FileOutlined, InboxOutlined, TagsOutlined} from "@ant-design/icons/lib";
import {connect} from "@@/plugin-dva/exports";
import {ConnectState} from "@/models/connect";
import {HomeModelStateType} from "@/pages/welcome/model";
import {Loading} from "@@/plugin-dva/connect";
import BookDailyCard from "@/pages/welcome/parts/BookDailyCard";
import style from './style.less';
import TagCard from "@/pages/welcome/parts/TagCard";
import RecentlyAddTagCard from "@/pages/welcome/parts/RecentlyAddTagCard";
import TagTypeCard from "@/pages/welcome/parts/TagTypeCard";

export interface HomePagePropsType {
  home: HomeModelStateType
  loading: Loading
}

const HomePage = ({home, loading}: HomePagePropsType) => {
  const infoItems: any[] = [
    {
      title: "最近七日添加",
      value: home.bookDailyCountList ? home.bookDailyCountList.map(it => it.total).reduce((a, b) => a + b) : 0,
      icon: <FileOutlined/>
    },
    {
      title: "标签",
      value: home.totalTagCount,
      icon: <TagsOutlined/>,
      loading: loading.effects["home/queryTotalTagCount"]
    },
    {
      title: "Library",
      value: home.libraryCount,
      icon: <InboxOutlined/>
    },
    {
      title: "书籍总数",
      value: home.totalBookCount,
      icon: <BookOutlined/>,
      loading: loading.effects["home/queryTotalBookCount"]
    }
  ]
  return (
    <PageHeaderWrapper>
      <Row gutter={16}>
        {
          infoItems.map((item, idx) => (
            <Col span={6} key={idx}>
              <InfoCard {...item}/>
            </Col>
          ))
        }
      </Row>
      <Row className={style.rowWrap} gutter={16}>
        <Col span={24}>
          <BookDailyCard/>
        </Col>
      </Row>
      <Row className={style.rowWrap} gutter={16}>
        <Col span={24}>
          <TagCard/>
        </Col>
      </Row>
      <Row className={style.rowWrap} gutter={16}>
        <Col span={16}>
          <RecentlyAddTagCard/>
        </Col>
        <Col span={8}>
          <TagTypeCard/>
        </Col>
      </Row>
    </PageHeaderWrapper>
  )
};

export default connect(({home, loading}: ConnectState) => ({home, loading}))(HomePage)
