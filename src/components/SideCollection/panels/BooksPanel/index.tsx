import React from 'react';
import BookCollection from "@/components/SideCollection/panels/BookCollection";
import {connect, Dispatch} from 'dva'
import {ConnectState} from "@/models/connect";
import {SideCollectionModelStateType} from "@/models/side";
import {Book} from "@/services/book";

interface BooksPanelPropsType {
  sideCollection: SideCollectionModelStateType,
  dispatch: Dispatch
}

const BooksPanel = ({sideCollection, dispatch}: BooksPanelPropsType) => {
  const {isBookSelectMode, selectedBooks} = sideCollection
  const onBookCardClick = (book: Book) => {
    if (isBookSelectMode) {
      const isAlreadySelect = Boolean(selectedBooks.find(selectedBook => selectedBook.id === book.id))
      if (isAlreadySelect) {
        dispatch({
          type: "sideCollection/setSelectedBooks",
          payload: {
            books: selectedBooks.filter(selectedBook => selectedBook.id !== book.id)
          }
        })
      } else {
        dispatch({
          type: "sideCollection/setSelectedBooks",
          payload: {
            books: [
              ...selectedBooks,
              book
            ]
          }
        })
      }
    }
  };
  return (
    <div>
      <BookCollection books={sideCollection.books} onBookCardClick={onBookCardClick} selectedBooks={selectedBooks}/>
    </div>
  );
};

export default connect(({sideCollection}: ConnectState) => ({sideCollection}))(BooksPanel)
