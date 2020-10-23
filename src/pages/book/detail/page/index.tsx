import React, { useState } from 'react';
import styles from './style.less';
import PageCollection from '@/pages/book/detail/page/components/PageCollection';
import { ConnectState } from '@/models/connect';
import {
  BookDetailPageModelStateType,
  pagePaginationModule,
  pageSelectModule,
} from '@/pages/book/detail/page/model';
import { Button, Pagination } from 'antd';
import { DialogStateType } from '@/models/dialog';
import PageOrderDialog from '@/pages/book/detail/page/components/PageOrderDialog';
import { Page } from '@/services/page';
import { Dispatch } from '@@/plugin-dva/connect';
import { connect } from '@@/plugin-dva/exports';

const setOrderDialogKey = 'bookDetailPages/setOrder';

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
  const onPageChange = (toPage: number = pagePage, toPageSize: number = pagePageSize) => {
    pagePaginationModule.onPageChange(toPage, toPageSize);
  };
  return (
    <div className={styles.main}>
      <Button onClick={onApply}>应用当前顺序</Button>
      <PageCollection
        pages={pages}
        onSetOrderActionClick={onSetOrderClick}
        onDelete={() => {}}
        selectedItems={pageSelectModule.getSelectedItems(bookDetailPages)}
        onSelect={id => pageSelectModule.select(dispatch, id)}
        onUnselect={id => pageSelectModule.unSelect(dispatch, id)}
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
