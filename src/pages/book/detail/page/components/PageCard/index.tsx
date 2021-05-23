import React from 'react';
import { Card, Modal } from 'antd';
import DeleteIcon from '@ant-design/icons/DeleteFilled';
import OrderIcon from '@ant-design/icons/OrderedListOutlined';
import { Page } from '@/services/page';
import styles from './style.less';
import ImageLoader from '@/components/ImageLoader';

const { confirm } = Modal;

interface PageCardPropsType {
  page: Page;
  onDelete: (page: Page) => void;
  onSetOrderActionClick: (page: Page) => void;
}

export default function PageCard({ page, onDelete, onSetOrderActionClick }: PageCardPropsType) {
  const renderCardActions = () => {
    const onDeleteDialogOkClick = () => {
      onDelete(page);
    };
    const onDeleteClick = () => {
      confirm({
        title: '删除当前页面',
        content: '会删除当前页面',
        okType: 'danger',
        onOk: onDeleteDialogOkClick,
      });
    };

    return [
      <DeleteIcon onClick={onDeleteClick} />,
      <OrderIcon onClick={() => onSetOrderActionClick(page)} />,
    ];
  };

  return (
    <Card actions={renderCardActions()}>
      <ImageLoader className={styles.pageImage} alt={`page ${page.id}`} url={page.path} />
      <div>
        <div className={styles.orderField}>第{page.order}页</div>
      </div>
    </Card>
  );
}
