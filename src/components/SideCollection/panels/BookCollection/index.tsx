import React from 'react';
import {Book} from "@/services/book";
import BookCard from "@/components/SideCollection/panels/BookCard";
import {Col, Row} from "antd";
import styles from './style.less'

interface BookCollectionPropsType {
  books?: Book[]
  onBookCardClick: (book: Book) => void
  selectedBooks?:Book[]
}


export default function BookCollection({books = [], onBookCardClick,selectedBooks=[]}: BookCollectionPropsType) {
  const renderBookCards = () => {
    return books?.map((book: Book) => {
      return (
        <Col key={book.id} className={styles.itemCol}>
          <BookCard book={book} onClick={onBookCardClick} isSelect={Boolean(selectedBooks.find(selectedBook => selectedBook.id === book.id))}/>
        </Col>
      )
    })
  };
  return (
    <div className={styles.content}>
      <Row gutter={6}>
        {renderBookCards()}
      </Row>
    </div>
  );
}
