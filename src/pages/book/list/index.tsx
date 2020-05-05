import React from 'react';
import {connect, Dispatch, history} from 'umi';
import BooksCollection from '@/pages/book/list/components/BookCollection';
import {ConnectState} from '@/models/connect';
import {BookListModelStateType} from '@/pages/book/list/model';
import {BackTop, Pagination} from 'antd';
import style from './style.less';
import {DialogStateType} from '@/models/dialog';
import BookFilterDrawer, {BookFilter} from '@/pages/book/list/components/BookFilterDrawer';
import {Book} from '@/services/book';
import {encodeOrderToUrl, updateQueryParamAndReplaceURL} from '@/utils/uri';
import {Snapshot} from '@/services/snapshot';
import SnapshotDialog from '@/components/SnapshotDialog';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {generateSnapshotId} from '@/utils/utils';
import BookListHeaderAction, {AddToSnapshotDialogKey, BooksFilterDrawerKey,} from '@/pages/book/list/header';

interface BookListPagePropsType {
  dispatch: Dispatch;
  bookList: BookListModelStateType;
  dialog: DialogStateType;
}

function BookListPage({ dispatch, bookList, dialog }: BookListPagePropsType) {
  const { page, pageSize, count, filter, searchTags, selectedBooks } = bookList;
  const { dialogs } = dialog;
  const onPageChange = (toPage: number, toPageSize: number = 20) => {
    updateQueryParamAndReplaceURL({ page: toPage, pageSize: toPageSize });
  };

  const onCloseFilterDrawer = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: BooksFilterDrawerKey,
        isActive: false,
      },
    });
  };
  const onSetFilter = (newFilter: BookFilter) => {
    if (newFilter.tags.length !== 0) {
      dispatch({
        type: 'bookList/updateFilter',
        payload: {
          filter: {
            ...filter,
            tags: newFilter.tags,
          },
        },
      });
    }
    updateQueryParamAndReplaceURL({
      filterTags: newFilter.tags.map(tag => tag.id),
      nameSearch: newFilter.nameSearch,
      startTime: newFilter.startTime,
      endTime: newFilter.endTime,
      order: encodeOrderToUrl(newFilter.order),
    });
  };
  const onTagSearch = (key: string, type?: string) => {
    dispatch({
      type: 'bookList/searchTags',
      payload: {
        searchKey: key,
        type,
      },
    });
  };
  const onBookSelect = (book: Book) => {
    const isSelected = Boolean(selectedBooks.find(selectedBook => selectedBook.id === book.id));
    if (isSelected) {
      dispatch({
        type: 'bookList/setSelectedBookIds',
        payload: {
          books: selectedBooks.filter(selectedBook => selectedBook.id !== book.id),
        },
      });
    } else {
      dispatch({
        type: 'bookList/setSelectedBookIds',
        payload: {
          books: [...selectedBooks, book],
        },
      });
    }
  };
  const onAddBookToSideCollection = (book: Book) => {
    dispatch({
      type: 'sideCollection/addBookToCollection',
      payload: {
        books: [book],
      },
    });
  };

  const onBookClick = (book: Book) => {
    if (selectedBooks.length > 0) {
      onBookSelect(book);
    } else {
      history.push(`/book/${book.id}/info`);
    }
  };

  const onAddToSnapshotDialogCancel = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: AddToSnapshotDialogKey,
        isActive: false,
      },
    });
  };
  const onAddToSnapshotClick = (name: string) => {
    const snapshot: Snapshot = {
      id: generateSnapshotId(),
      icon: 'bookList',
      name,
      url: window.location.pathname + window.location.search,
      extra: {},
      type: 'bookList',
    };
    dispatch({
      type: 'global/addSnapshots',
      payload: {
        snapshotList: [snapshot],
      },
    });
    onAddToSnapshotDialogCancel();
  };
  return (
    <PageHeaderWrapper extra={<BookListHeaderAction />}>
      <div>
        <BackTop />
        <div className={style.filterWrap}>
          <SnapshotDialog
            onOk={onAddToSnapshotClick}
            onClose={onAddToSnapshotDialogCancel}
            isOpen={Boolean(dialogs[AddToSnapshotDialogKey])}
          />
        </div>
        <BookFilterDrawer
          onClose={onCloseFilterDrawer}
          isOpen={Boolean(dialogs[BooksFilterDrawerKey])}
          filter={filter}
          onFilterChange={onSetFilter}
          searchTags={searchTags}
          onTagSearch={onTagSearch}
        />
        <BooksCollection
          books={bookList.books}
          onSelectAction={onBookSelect}
          selectedBooks={selectedBooks}
          onAddToCollectionAction={onAddBookToSideCollection}
          onBookClick={onBookClick}
        />
        <div className={style.pageWrap}>
          <Pagination
            defaultCurrent={1}
            total={count}
            current={page}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      </div>
    </PageHeaderWrapper>
  );
}

export default connect(({ bookList, dialog, loading }: ConnectState) => ({
  bookList,
  dialog,
  loading,
}))(BookListPage);
