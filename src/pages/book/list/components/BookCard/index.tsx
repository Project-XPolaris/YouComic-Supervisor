import React from 'react';
import {Card, Dropdown, Menu} from "antd";
import {Book} from "@/services/book";
import styles from './style.less'
import {getBookTagInfo} from "@/utils/book";
import CheckIcon from '@ant-design/icons/CheckOutlined'
import FolderIcon from '@ant-design/icons/FolderFilled'

interface BookCardPropsType {
  book: Book
  onSelectAction: (book: Book) => void
  onAddToCollectionAction: (book: Book) => void
  isSelected?: boolean
  onBookClick?: (book:Book) => void
}


export default function BookCard({
                                   book,
                                   onSelectAction,
                                   onAddToCollectionAction,
                                   isSelected = false,
                                   onBookClick
                                 }: BookCardPropsType) {

  const {author} = getBookTagInfo(book);
  const onMenuItemSelect = () => {
    onSelectAction(book)
  };
  const onMenuItemAddToCollection = () => {
    onAddToCollectionAction(book)
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onMenuItemSelect}><CheckIcon/>{isSelected ? "取消选中" : "选中"}</Menu.Item>
      <Menu.Item key="2" onClick={onMenuItemAddToCollection}><FolderIcon/>加入集合</Menu.Item>
    </Menu>
  );
  const onBookCardClick = () => {
    if (onBookClick === undefined){
      return
    }
    onBookClick(book)
  };
  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <Card
        className={styles.main}
        hoverable
        cover={
          <div className={styles.coverWrap}>
            <img alt="example" src={book.cover} className={styles.cover}/>
          </div>
        }
        style={{backgroundColor: isSelected ? "#1890ff" : undefined}}
        onClick={onBookCardClick}
      >
        <div>
          <div id="title" className={isSelected ? styles.titleSelected : styles.title}>{book.name}</div>
          <div id="author" className={isSelected ? styles.authorSelected : styles.author}>{author?.name}</div>
        </div>
      </Card>
    </Dropdown>
  );
}
