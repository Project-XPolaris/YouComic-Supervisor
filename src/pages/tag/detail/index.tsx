import React, {useEffect} from 'react';
import {connect, Dispatch,history} from 'umi';
import {ConnectState} from "@/models/connect";
import {TagDetailModelStateType} from "@/pages/tag/detail/model";
import {Button, message, PageHeader, Pagination} from "antd";
import styles from './style.less'
import BooksCollection from "@/components/BookCollection";
import {Book} from "@/services/book";
import BookListHeader from "@/pages/book/list/components/BookListHeader";
import {BookSideCollectionAction} from "@/models/side";
import DeleteIcon from '@ant-design/icons/DeleteFilled'

interface TagDetailPagePropsType {
  dispatch: Dispatch,
  tagDetail: TagDetailModelStateType
}

function TagDetailPage({dispatch, tagDetail}: TagDetailPagePropsType) {
  const {tag, count, page, pageSize, selectedBooks} = tagDetail;
  useEffect(() => {
    return () => {
      dispatch({
        type: "sideCollection/setSideCollectionBooksAction",
        payload: {
          actions: []
        }
      })
      dispatch({
        type:"tagDetail/setSelectedBooks",
        payload:{
          books:[]
        }
      })
    }
  }, []);
  useEffect(() => {
    const actions: BookSideCollectionAction[] = [
      {
        title: "添加至当前标签",
        actionType: "tagDetail/addCollectionBooksToTag",
        type: "primary"
      }
    ];
    dispatch({
      type: "sideCollection/setSideCollectionBooksAction",
      payload: {
        actions
      }
    })
  }, []);

  const onPageChange = (toPage: number, toPageSize: number = 20) => {
    dispatch({
      type: "tagDetail/setPage",
      payload: {
        page: toPage,
        pageSize: toPageSize
      }
    });
    dispatch({
      type: "tagDetail/queryBooks",
    })
  };
  const onBookSelect = (book: Book) => {
    const isSelected = Boolean(selectedBooks.find(selectedBook => selectedBook.id === book.id));
    if (isSelected) {
      dispatch({
        type: "tagDetail/setSelectedBooks",
        payload: {
          books: selectedBooks.filter(selectedBook => selectedBook.id !== book.id)
        }
      })
    } else {
      dispatch({
        type: "tagDetail/setSelectedBooks",
        payload: {
          books: [
            ...selectedBooks,
            book
          ]
        }
      })
    }
  };
  const onBookClick = (book: Book) => {
    if (selectedBooks.length > 0) {
      onBookSelect(book)
    } else {
      history.push(`/book/${book.id}/info`)
    }
  };
  const onAddBookToSideCollection = (book: Book) => {
    dispatch({
      type: "sideCollection/addBookToCollection",
      payload: {
        books: [book,]
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
  const onSelectAllBooks = () => {
    dispatch({
      type: "tagDetail/setSelectedBooks",
      payload: {
        books: tagDetail.books
      }
    })
  };
  const onInverseSelectBooks = () => {
    dispatch({
      type: "tagDetail/setSelectedBooks",
      payload: {
        books: tagDetail.books?.filter((book: Book) => selectedBooks.find(selectedBook => selectedBook.id === book.id) === undefined)
      }
    })
  };
  const onUnSelectBooks = () => {
    dispatch({
      type: "tagDetail/setSelectedBooks",
      payload: {
        books: []
      }
    })
  };
  const extraAction = () => {
    const onRemoveSelectBooksFromTag = () => {
      dispatch({
        type:"tagDetail/removeSelectBookFromTag"
      })
    };
    return [
      <Button type="danger" key="removeFromTag" className={styles.actionButton} onClick={onRemoveSelectBooksFromTag}><DeleteIcon/>从当前标签中移除</Button>
    ]
  };
  return (
    <div>
      <div className={styles.header}>
        <PageHeader
          onBack={() => window.history.back()}
          title={tag?.name}
          subTitle={ `${tag?.type} - 共 ${tagDetail.count}`}
        />

      </div>
      <div className={styles.content}>
        <BookListHeader
          selectedBookIds={selectedBooks}
          onAddToCollection={onAddMultipleBookToCollection}
          onInverseSelect={onInverseSelectBooks}
          onSelectAll={onSelectAllBooks}
          onUnSelectAll={onUnSelectBooks}
          extraAction={extraAction()}
        />
        <BooksCollection
          books={tagDetail.books}
          onSelectAction={onBookSelect}
          selectedBooks={selectedBooks}
          onAddToCollectionAction={onAddBookToSideCollection}
          onBookClick={onBookClick}
        />
        <div className={styles.pageWrap}>
          <Pagination defaultCurrent={1} total={count} current={page} pageSize={pageSize} onChange={onPageChange}/>
        </div>
      </div>
    </div>
  );
}

export default connect(({tagDetail}: ConnectState) => ({tagDetail}))(TagDetailPage);
