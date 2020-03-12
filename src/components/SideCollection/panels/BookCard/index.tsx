import React from 'react';
import {Card, Typography} from "antd";
import styles from './style.less'
import {Book} from "@/services/book";

const {Text} = Typography;

interface BookCardPropsType {
  book: Book
  onClick:(book:Book) => void
  isSelect?:boolean
}

export default function BookCard({book,onClick,isSelect=false}: BookCardPropsType) {
  const onCardClick = () => {
    onClick(book)
  };
  return (
    <Card className={styles.main} hoverable onClick={onCardClick}>
      <div className={styles.content}>
        <img src={book.cover} alt={book.name} className={styles.cover}/>
        <div>
          <Text ellipsis className={styles.title} style={{color:isSelect?"#1890ff" : undefined}}>{book.name}</Text>
        </div>
      </div>
    </Card>
  );
}
