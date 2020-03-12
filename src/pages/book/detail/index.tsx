import React from 'react';

import {connect, Dispatch} from 'dva';
import BookDetailPageHeader from "@/pages/book/detail/components/BookDetailPageHeader";
import {ConnectState} from "@/models/connect";
import {DetailModelStateType} from "@/pages/book/detail/model";


interface BookDetailPropsType {
  dispatch: Dispatch,
  bookDetail: DetailModelStateType
  children:any
}

function BookDetail({bookDetail,children}: BookDetailPropsType) {

  return (
      <BookDetailPageHeader book={bookDetail.book}>
        {children}
      </BookDetailPageHeader>
  );
}

export default connect(({bookDetail}: ConnectState) => ({bookDetail}))(BookDetail);
