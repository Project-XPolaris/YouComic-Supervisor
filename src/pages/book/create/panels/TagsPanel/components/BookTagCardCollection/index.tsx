import React from 'react';
import {TagItem} from "@/pages/book/create/panels/TagsPanel";
import {Col, Empty, Row} from "antd";
import BookTagCard from "@/pages/book/create/panels/TagsPanel/components/TagCard";
import styles from './style.less'

interface BookTagCardCollectionPropsType {
  tags?: TagItem[]
  onCardClick:(tag:TagItem) => void
  selectedTags:TagItem[]
}


export default function BookTagCardCollection({tags,onCardClick,selectedTags}: BookTagCardCollectionPropsType) {
  const renderCards = () => {
    return tags?.map(tag => {
      return (
        <Col key={tag.id} className={styles.row}>
          <BookTagCard tag={tag} onClick={onCardClick} isSelect={selectedTags.find(selectedTag => selectedTag.id === tag.id) !== undefined}/>
        </Col>
      )
    })
  };
  const renderEmpty = () => {
    return (
      <div className={styles.emptyContainer}>
      <Empty/>
      </div>
    )
  };
  return (
    <Row gutter={6}>
      {tags?.length === 0?renderEmpty():renderCards()}
    </Row>
  );
}
