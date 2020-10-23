import React from 'react';

import { connect, Dispatch } from 'umi';
import BookDetailPageHeader from '@/pages/book/detail/components/BookDetailPageHeader';
import { ConnectState } from '@/models/connect';
import { DetailModelStateType } from '@/pages/book/detail/model';

interface BookDetailPropsType {
  dispatch: Dispatch;
  bookDetail: DetailModelStateType;
  children: any;
}

function BookDetail({ bookDetail, children, dispatch }: BookDetailPropsType) {
  return (
    <BookDetailPageHeader
      book={bookDetail.book}
      showDescription={bookDetail.showDescription}
      onSwitchShowDescription={() => {
        dispatch({
          type: 'bookDetail/setShowDescription',
          payload: {
            isShow: !bookDetail.showDescription,
          },
        });
      }}
    >
      {children}
    </BookDetailPageHeader>
  );
}

export default connect(({ bookDetail }: ConnectState) => ({ bookDetail }))(BookDetail);
