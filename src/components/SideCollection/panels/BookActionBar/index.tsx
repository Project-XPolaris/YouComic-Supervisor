import React from 'react';
import {connect, Dispatch} from 'dva';
import {Button} from "antd";
import styles from './style.less'
import {ConnectState} from "@/models/connect";
import {SideCollectionModelStateType} from "@/models/side";
import {Book} from "@/services/book";
import ActionBar from "@/components/SideCollection/panels/ActionBar";

interface BookActionBarPropsType {
  dispatch: Dispatch,
  sideCollection: SideCollectionModelStateType
}

function BookActionBar({dispatch, sideCollection}: BookActionBarPropsType) {
  const {isBookSelectMode, selectedBooks,bookActions} = sideCollection;
  const onSelectAllBooks = () => {
    dispatch({
      type: "sideCollection/setSelectedBooks",
      payload: {
        books: sideCollection.books
      }
    })
  };
  const onInverseSelectBooks = () => {
    dispatch({
      type: "sideCollection/setSelectedBooks",
      payload: {
        books: sideCollection.books?.filter((book: Book) => selectedBooks.find(selectedBook => selectedBook.id === book.id) === undefined)
      }
    })
  };
  const onUnSelectBooks = () => {
    dispatch({
      type: "sideCollection/setSelectedBooks",
      payload: {
        books: []
      }
    })
  };
  const onRemoveSelectBook = () => {
    dispatch({
      type: "sideCollection/removeSelectBookFromCollection",
    })
  };
  const onSwitchBookSelectModeButtonClick = () => {
    dispatch({
      type: "sideCollection/setBookSelectMode",
      payload: {
        isSelect: !isBookSelectMode,
      }
    })
  };
  const actions = bookActions.map(action => {
    const onClick = () => {
      dispatch({
        type:action.actionType
      })
    };
    return (
      <Button type={action.type} onClick={onClick} size='small' className={styles.actionButton}>{action.title}</Button>
    )
  });
  return (
    <ActionBar
      onSwitchSelectMode={onSwitchBookSelectModeButtonClick}
      onSelectAll={onSelectAllBooks}
      onInverseSelect={onInverseSelectBooks}
      onUnSelect={onUnSelectBooks}
      onRemoveFromCollection={onRemoveSelectBook}
      isSelectMode={isBookSelectMode}
      selectCount={selectedBooks.length}
      extraMultipleAction={actions}
    />
  );
}

export default connect(({sideCollection}: ConnectState) => ({sideCollection}))(BookActionBar);
