import React from 'react';
import { Col, Row } from 'antd';
import { Page } from '@/services/page';
import PageCard from '@/pages/book/detail/page/components/PageCard';
import styles from './style.less';

interface PageCollectionPropsType {
  pages?: Page[];
  onDelete: (page: Page) => void;
  onSetOrderActionClick: (page: Page) => void;
  selectedItems: any[];
  onSelect: (id: any) => void;
  onUnselect: (id: any) => void;
}

export default function PageCollection({
  pages = [],
  onDelete,
  onSetOrderActionClick,
  selectedItems = [],
  onSelect,
  onUnselect,
}: PageCollectionPropsType) {
  const items = pages?.map((page: Page) => {
    return (
      <Col key={page.id} className={styles.col}>
        <PageCard
          page={page}
          onDelete={onDelete}
          onSetOrderActionClick={onSetOrderActionClick}
          onSelect={() => onSelect(page.id)}
          onUnSelect={() => onUnselect(page.id)}
          isSelected={selectedItems.find(it => it === page.id) !== undefined}
        />
      </Col>
    );
  });
  return <Row gutter={8}>{items}</Row>;
}
