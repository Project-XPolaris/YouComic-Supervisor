import React from 'react';
import styles from './style.less'
import {Card} from "antd";
import {Tag} from "@/services/tag";
import DeleteIcon from '@ant-design/icons/DeleteFilled'

interface TagCardPropsType {
  tag: Tag
  onDelete: (tag: Tag) => void
  onTitleClick?:(tag:Tag) => void
  onTypeClick?:(tag:Tag) => void
}


export default function TagCard({tag, onDelete,onTitleClick,onTypeClick}: TagCardPropsType) {
  const onDeleteActionClick = () => {
    onDelete(tag)
  };
  const onCardTitleClick = () => {
    if (onTitleClick) {
      onTitleClick(tag)
    }
  };
  const onCardTypeClick = () => {
    if (onTitleClick) {
      onTitleClick(tag)
    }
  };
  return (
    <Card
      actions={[
        <DeleteIcon onClick={onDeleteActionClick}/>
      ]}
    >
      <a className={styles.tagName} onClick={onCardTitleClick}>{tag.name}</a>
      <a className={styles.tagType} onClick={onCardTypeClick}>{tag.type}</a>
    </Card>
  );
}
