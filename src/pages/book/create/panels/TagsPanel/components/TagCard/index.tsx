import React from 'react';
import {Card} from "antd";
import {TagItem} from "@/pages/book/create/panels/TagsPanel";

import styles from './style.less'

interface BookTagCardPropsType {
  tag: TagItem
  isSelect?:boolean
  onClick:(tag:TagItem) => void
}


export default function BookTagCard({tag,isSelect=true,onClick}: BookTagCardPropsType) {
  const onCardClick = () => {
    onClick(tag)
  };
  return (
    <Card
      hoverable
      onClick={onCardClick}
    >
      <p className={isSelect?styles.titleSelect:styles.title}>{tag.name}</p>
      <div className={styles.type}>{tag.type}</div>
      <div className={styles.meta}>{tag.needCreate ? "被创建" : "已存在，添加"}</div>
    </Card>
  );
}
