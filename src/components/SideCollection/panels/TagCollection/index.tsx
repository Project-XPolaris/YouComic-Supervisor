import React from 'react';
import {Tag} from "@/services/tag";
import {Col, Row} from "antd";
import TagCard from "@/components/SideCollection/panels/TagCard";
import styles from "@/components/SideCollection/panels/BookCollection/style.less";


interface TagCollectionPropsType {
  tags?: Tag[]
  selectedTags?:Tag[]
  onTagClick:(tag:Tag) => void
  onCopyToTag?:(tag:Tag) => void;
}


export default function TagCollection({onCopyToTag,tags = [],selectedTags,onTagClick}: TagCollectionPropsType) {
  const renderTagCards = () => {
    return tags?.map((tag: Tag) => {
      return (
        <Col key={tag.id} className={styles.itemCol}>
        <TagCard
          tag={tag}
          isSelect={Boolean(selectedTags?.find((selectedTag:Tag) => selectedTag.id === tag.id))}
          onClick={onTagClick}
          onCopyToTag={onCopyToTag}
        />
        </Col>
      )
    })
  };
  return (
    <Row gutter={8} className={styles.content}>
      {renderTagCards()}
    </Row>
  );
}
