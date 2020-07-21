import React from 'react';
import {Book} from "@/services/book";
import BookCard from "@/components/BookCard";
import {Col, Row} from "antd";
import styles from './style.less'
import BookCardHorizon from "@/components/BookCardHorizon";

interface BooksCollectionPropsType {
  books?: Book[]
  onSelectAction: (book: Book) => void
  onAddToCollectionAction: (book: Book) => void
  selectedBooks?: Book[]
  onBookClick?: (book: Book) => void
  type?: "vertical" | "horizon"
}


export default function BooksCollection(
  {
    books = [],
    selectedBooks = [],
    onSelectAction,
    onAddToCollectionAction,
    onBookClick,
    type = "vertical"
  }: BooksCollectionPropsType) {
  const items = books?.map((book: Book) => {
    return (
      <Col key={book.id}>
        {type === "vertical" && <BookCard
          book={book}
          onSelectAction={onSelectAction}
          onAddToCollectionAction={onAddToCollectionAction}
          isSelected={Boolean(selectedBooks?.find(selectedBook => selectedBook.id === book.id))}
          onBookClick={onBookClick}
        />}
        {
          type === "horizon" &&
          <BookCardHorizon
            book={book}
            onSelectAction={onSelectAction}
            onAddToCollectionAction={onAddToCollectionAction}
            isSelected={Boolean(selectedBooks?.find(selectedBook => selectedBook.id === book.id))}
            onBookClick={onBookClick}
          />
        }

      </Col>
    )
  });
  return (
    <Row gutter={16} className={styles.main}>
      {items}
    </Row>
  );
}
