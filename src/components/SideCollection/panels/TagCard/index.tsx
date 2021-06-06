import React from 'react';
import {Card, Dropdown, Menu} from "antd";
import styles from "@/pages/book/detail/tag/components/TagCard/style.less";
import {Tag} from "@/services/tag";


interface TagCardPropsType {
  tag: Tag
  onClick?: (tag: Tag) => void
  isSelect?: boolean
  onCopyToTag?:(tag:Tag) => void;
}


export default function TagCard({onCopyToTag,tag, onClick, isSelect = false}: TagCardPropsType) {

  const onCardClick = () => {
    if (onClick) {
      onClick(tag)
    }
  };
  const onCopyToTagHandler = () => {
    if (onCopyToTag) {
      onCopyToTag(tag)
    }
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onCopyToTagHandler}>将所选复制至此标签</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Card hoverable onClick={onCardClick}>
        <div className={styles.tagName} style={{color: isSelect ? "#1890ff" : undefined}}>{tag.name}</div>
        <div className={styles.tagType}>{tag.type}({tag.id})</div>
      </Card>
    </Dropdown>
  );
}
