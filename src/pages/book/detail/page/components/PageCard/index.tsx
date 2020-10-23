import React from 'react';
import { Card, Dropdown, Menu, Modal } from 'antd';
import DeleteIcon from '@ant-design/icons/DeleteFilled';
import OrderIcon from '@ant-design/icons/OrderedListOutlined';
import { Page } from '@/services/page';
import styles from './style.less';
import ImageLoader from '@/components/ImageLoader';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface PageCardPropsType {
  page: Page;
  onDelete: (page: Page) => void;
  onSetOrderActionClick: (page: Page) => void;
  isSelected?: boolean;
  onSelect: () => void;
  onUnSelect: () => void;
}

export default function PageCard({
  page,
  onDelete,
  onSetOrderActionClick,
  isSelected = false,
  onSelect,
  onUnSelect,
}: PageCardPropsType) {
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
  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === '1') {
          onUnSelect();
        } else if (key === '2') {
          onSelect();
        }
      }}
    >
      {isSelected ? (
        <Menu.Item key="1" icon={<CloseOutlined />}>
          取消选择
        </Menu.Item>
      ) : (
        <Menu.Item key="2" icon={<CheckOutlined />}>
          选择
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Card actions={renderCardActions()} className={isSelected ? styles.card : undefined}>
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <ImageLoader className={styles.pageImage} alt={`page ${page.id}`} url={page.path} />
      </Dropdown>
      <div>
        <div className={styles.orderField}>第{page.order}页</div>
      </div>
    </Card>
  );
}
