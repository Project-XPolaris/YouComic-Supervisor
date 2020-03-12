import React from 'react';
import {Tag} from "@/services/tag";
import TagCard from "@/pages/book/detail/tag/components/TagCard";
import {Col, Row} from "antd";

interface TagsCollectionPropsType {
  tags?:Tag[]
  onDelete:(tag:Tag) => void
  onTagTitleClick?:(tag:Tag) => void
}


export default function TagsCollection({tags = [],onDelete,onTagTitleClick}: TagsCollectionPropsType) {
    const items = tags.map((tag:Tag) => (
        <Col key={tag.id}>
        <TagCard tag={tag} onDelete={onDelete} onTitleClick={onTagTitleClick}/>
        </Col>
      ));
    return (
        <Row gutter={16}>
          {items}
        </Row>
    );
}
