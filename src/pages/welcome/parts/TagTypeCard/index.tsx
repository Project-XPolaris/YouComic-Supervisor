import {connect} from "@@/plugin-dva/exports";
import React from "react";
import {Card} from "antd";
import TagTypeItem from "@/pages/welcome/parts/TagTypeCard/components";
import style from './style.less';
import {ConnectState} from "@/models/connect";
import {HomeModelStateType} from "@/pages/welcome/model";
import {TagTypeCount} from "@/services/dashboard";

export interface TagTypeCardPropsType {
  home: HomeModelStateType
}

const TagTypeCard = ({home}: TagTypeCardPropsType) => {
  return (
    <Card title="标签类别">
      {
        home.tagTypeCount &&
        home.tagTypeCount.map((item: TagTypeCount) => (
          <div className={style.item} key={item.name}>
            <TagTypeItem name={item.name} value={item.total}/>
          </div>
        ))
      }
    </Card>
  );
};

export default connect(({home}: ConnectState) => ({home}))(TagTypeCard);
