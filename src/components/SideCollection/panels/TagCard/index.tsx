import React from 'react';
import {Card} from "antd";
import styles from "@/pages/book/detail/tag/components/TagCard/style.less";
import {Tag} from "@/services/tag";


interface TagCardPropsType {
  tag: Tag
  onClick?: (tag: Tag) => void
  isSelect?: boolean
}


export default function TagCard({tag, onClick, isSelect = false}: TagCardPropsType) {

  const onCardClick = () => {
    if (onClick) {
      onClick(tag)
    }
  };
  return (
    <Card hoverable onClick={onCardClick}>
      <div className={styles.tagName} style={{color: isSelect ? "#1890ff" : undefined}}>{tag.name}</div>
      <div className={styles.tagType}>{tag.type}</div>
    </Card>
  );
}
