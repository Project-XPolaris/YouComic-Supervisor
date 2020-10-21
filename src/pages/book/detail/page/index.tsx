import React, { useState } from 'react';
import { connect, Dispatch } from 'dva';
import styles from './style.less';
import PageCollection from '@/pages/book/detail/page/components/PageCollection';
import { ConnectState } from '@/models/connect';
import { BookDetailPageModelStateType, pagePaginationModule } from '@/pages/book/detail/page/model';
import { Button, Pagination } from 'antd';
import { DialogStateType } from '@/models/dialog';
import PageOrderDialog from '@/pages/book/detail/page/components/PageOrderDialog';
import { Page } from '@/services/page';
import CoverCropDialog from '@/pages/book/detail/page/components/CoverCropDialog';
import { history } from 'umi';

const setOrderDialogKey = 'bookDetailPages/setOrder';
const coverCropDialogKey = 'bookDetailPages/coverCrop';

interface BookDetailPagesPagePropsType {
  dispatch: Dispatch;
  bookDetailPages: BookDetailPageModelStateType;
  dialog: DialogStateType;
}

function BookDetailPagesPage({ dispatch, bookDetailPages, dialog }: BookDetailPagesPagePropsType) {
  const { pages, count } = bookDetailPages;
  const { pagePage, pagePageSize } = pagePaginationModule.getData(bookDetailPages);
  const { dialogs } = dialog;
  const [setOrderTarget, setSetOrderTarget] = useState(0);
  const [croverURL, setCroverURL] = useState('');
  const onSetOrderDialogCancel = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: setOrderDialogKey,
        isActive: false,
      },
    });
  };
  const onSetOrderClick = (targetPage: Page) => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: setOrderDialogKey,
        isActive: true,
      },
    });
    setSetOrderTarget(targetPage.id);
  };

  const onSetOrder = (order: number) => {
    dispatch({
      type: 'bookDetailPages/setPageOrder',
      payload: {
        id: setOrderTarget,
        order: Number(order),
      },
    });
  };
  const onApply = () => {
    dispatch({
      type: 'bookDetailPages/applyPage',
    });
  };
  const onCropCoverDialogClose = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: coverCropDialogKey,
        isActive: false,
      },
    });
  };
  const onCropCoverDialogOpen = (targetPage: Page) => {
    dispatch({
      type: 'editor/setEditorImageURL',
      payload: {
        url: targetPage.path,
      },
    });
    history.push('/editor');
  };
  const onPageChange = (toPage: number = pagePage, toPageSize: number = pagePageSize) => {
    pagePaginationModule.onPageChange(toPage, toPageSize);
  };
  return (
    <div className={styles.main}>
      <Button onClick={onApply}>应用当前顺序</Button>
      <PageCollection
        pages={pages}
        onSetOrderActionClick={onSetOrderClick}
        onSetCover={onCropCoverDialogOpen}
      />
      <CoverCropDialog
        isShow={Boolean(dialogs[coverCropDialogKey])}
        onCancel={onCropCoverDialogClose}
        onOk={onCropCoverDialogClose}
        imgURL={croverURL}
      />
      <PageOrderDialog
        isOpen={Boolean(dialogs[setOrderDialogKey])}
        onCancel={onSetOrderDialogCancel}
        onSetOrder={onSetOrder}
      />
      <div className={styles.pageWrap}>
        <Pagination
          defaultCurrent={1}
          total={count}
          current={pagePage}
          pageSize={pagePageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default connect(({ bookDetailPages, dialog }: ConnectState) => ({
  bookDetailPages,
  dialog,
}))(BookDetailPagesPage);
