import React from 'react';
import { Col, Row } from 'antd';
import { Page } from '@/services/page';
import PageCard from '@/pages/book/detail/page/components/PageCard';
import styles from './style.less';

interface PageCollectionPropsType {
  pages?: Page[];
  onDelete: (page: Page) => void;
  onSetCover: (page: Page) => void;
  onSetOrderActionClick: (page: Page) => void;
}

export default function PageCollection({
  pages = [],
  onDelete,
  onSetCover,
  onSetOrderActionClick,
}: PageCollectionPropsType) {
  const items = pages?.map((page: Page) => {
    return (
      <Col key={page.id} className={styles.col}>
        <PageCard
          page={page}
          onDelete={onDelete}
          onSetCover={onSetCover}
          onSetOrderActionClick={onSetOrderActionClick}
        />
      </Col>
    );
  });
  return <Row gutter={8}>{items}</Row>;
}
