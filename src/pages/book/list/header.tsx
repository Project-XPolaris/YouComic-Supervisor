import React from 'react';
import {connect, Dispatch} from 'dva';
import {Button, Dropdown, Menu, message} from "antd";
import style from "@/pages/book/list/style.less";
import {ConnectState} from "@/models/connect";
import {BookListModelStateType} from "@/pages/book/list/model";
import MenuIcon from "@ant-design/icons/MenuOutlined"
import SelectAllIcon from '@ant-design/icons/CheckOutlined'
import UnSelectAllIcon from '@ant-design/icons/MinusOutlined'
import RevertSelectIcon from '@ant-design/icons/ReloadOutlined'
import AddToCollectionIcon from '@ant-design/icons/FolderFilled'
import {Book} from "@/services/book";

export const BooksFilterDrawerKey = "bookList/filterDrawer";
export const AddToSnapshotDialogKey = "bookList/addToSnapshot"

interface BookListHeaderActionPropsType {
  dispatch:Dispatch
  bookList:BookListModelStateType
}

function BookListHeaderAction({dispatch,bookList}: BookListHeaderActionPropsType) {
  const {selectedBooks} = bookList
  const onOpenFilterDrawer = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: BooksFilterDrawerKey,
        isActive: true
      }
    })
  };
  const onAddToSnapshotButtonClick = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: AddToSnapshotDialogKey,
        isActive: true
      }
    })
  };
  const onSelectAllBooks = () => {
    dispatch({
      type: "bookList/setSelectedBookIds",
      payload: {
        books: bookList.books
      }
    })
  };
  const onAddMultipleBookToCollection = () => {
    if (selectedBooks.length === 0) {
      return
    }
    dispatch({
      type: "sideCollection/addBookToCollection",
      payload: {
        books: selectedBooks
      }
    });
    message.success(`添加${selectedBooks[0].name} 等${selectedBooks.length}添加至集合`)
  };
  const onInverseSelectBooks = () => {
    dispatch({
      type: "bookList/setSelectedBookIds",
      payload: {
        books: bookList.books?.filter((book: Book) => selectedBooks.find(selectedBook => selectedBook.id === book.id) === undefined)
      }
    })
  };
  const onUnSelectBooks = () => {
    dispatch({
      type: "bookList/setSelectedBookIds",
      payload: {
        books: []
      }
    })
  };
  const menu = (
    <Menu >
      <Menu.Item key="1" onClick={onSelectAllBooks}>
        <SelectAllIcon />
        全选
      </Menu.Item>
      <Menu.Item key="2" onClick={onUnSelectBooks}>
        <UnSelectAllIcon />
        不选
      </Menu.Item>
      <Menu.Item key="3" onClick={onInverseSelectBooks}>
        <RevertSelectIcon />
        反选
      </Menu.Item>
      <Menu.Item key="4" onClick={onAddMultipleBookToCollection}>
        <AddToCollectionIcon />
        添加至集合
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {
        bookList.selectedBooks.length > 0 &&
        <Dropdown overlay={menu}>
          <Button type="primary">
            {`已选${bookList.selectedBooks.length}项`} <MenuIcon />
          </Button>
        </Dropdown>
      }

      <Button type="primary" onClick={onOpenFilterDrawer} key={1}>过滤器</Button>
      <Button className={style.actionButton} onClick={onAddToSnapshotButtonClick} key={2}>添加至快照</Button>
    </>
  );
}

export default connect(({bookList}:ConnectState) => ({bookList}))(BookListHeaderAction)
