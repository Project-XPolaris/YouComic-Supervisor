import React from 'react';
import { Card, Dropdown, Menu } from 'antd';
import { Book } from '@/services/book';
import ImageLoader from '@/components/ImageLoader';
import styles from './style.less';
import { getBookTagInfo } from '@/utils/book';
import { UserOutlined, BookOutlined, GlobalOutlined, EditOutlined } from '@ant-design/icons/lib';
import CheckIcon from '@ant-design/icons/CheckOutlined';
import FolderIcon from '@ant-design/icons/FolderFilled';

export interface BookCardHorizonPropsType {
  book?: Book;
  onSelectAction: (book: Book) => void;
  onAddToCollectionAction: (book: Book) => void;
  isSelected?: boolean;
  onBookClick?: (book: Book) => void;
  onParseFromName: (book: Book) => void;
}

const BookCardHorizon = ({
  book,
  onSelectAction,
  onAddToCollectionAction,
  isSelected = false,
  onBookClick,
  onParseFromName,
}: BookCardHorizonPropsType) => {
  const { author, series, theme } = getBookTagInfo(book);
  const onMenuItemSelect = () => {
    if (!book) {
      return;
    }
    onSelectAction(book);
  };
  const onMenuItemAddToCollection = () => {
    if (!book) {
      return;
    }
    onAddToCollectionAction(book);
  };
  const onMenuItemParseFromName = () => {
    if (!book) {
      return;
    }
    onParseFromName(book);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onMenuItemSelect}>
        <CheckIcon />
        {isSelected ? '取消选中' : '选中'}
      </Menu.Item>
      <Menu.Item key="2" onClick={onMenuItemAddToCollection}>
        <FolderIcon />
        加入集合
      </Menu.Item>
      <Menu.Item key="3" onClick={onMenuItemParseFromName}>
        <EditOutlined />
        从文件名解析
      </Menu.Item>
    </Menu>
  );
  const onBookCardClick = () => {
    if (onBookClick === undefined || !book) {
      return;
    }
    onBookClick(book);
  };
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Card bodyStyle={{ padding: 0 }} className={styles.main} hoverable onClick={onBookCardClick}>
        <div
          className={styles.content}
          style={{ backgroundColor: isSelected ? '#1890ff' : undefined }}
        >
          <ImageLoader className={styles.cover} url={book?.cover} />
          <div className={styles.info}>
            <div className={styles.title} style={{ color: isSelected ? '#FFFFFF' : undefined }}>
              {book?.name || '未知'}
            </div>
            <div className={styles.meta} style={{ color: isSelected ? '#FFFFFF' : undefined }}>
              <div className={styles.icon}>
                <UserOutlined />
              </div>
              {author?.name || '未知作者'}
            </div>
            <div className={styles.meta} style={{ color: isSelected ? '#FFFFFF' : undefined }}>
              <div className={styles.icon}>
                <BookOutlined />
              </div>
              {series?.name || '未知系列'}
            </div>
            <div className={styles.meta} style={{ color: isSelected ? '#FFFFFF' : undefined }}>
              <div className={styles.icon}>
                <GlobalOutlined />
              </div>
              {theme?.name || '未知主题'}
            </div>
          </div>
        </div>
      </Card>
    </Dropdown>
  );
};

export default BookCardHorizon;
