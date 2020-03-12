import React from 'react';
import {Card, Modal} from "antd";
import DeleteIcon from "@ant-design/icons/DeleteFilled"
import BooKIcon from '@ant-design/icons/BookFilled'
import OrderIcon from '@ant-design/icons/OrderedListOutlined'
import {Page} from "@/services/page";
import styles from './style.less'

const {confirm} = Modal;
interface PageCardPropsType {
  page: Page
  onDelete:(page:Page) => void
  onSetCover:(page:Page) => void
  onSetOrderActionClick:(page:Page) => void
}


export default function PageCard({page,onSetCover,onDelete,onSetOrderActionClick}: PageCardPropsType) {
  const renderCardActions = () => {
    const onCoverDialogOkClick = () =>{
      onSetCover(page)
    };
    const onDeleteDialogOkClick = () =>{
      onDelete(page)
    };
    const onDeleteClick = () => {
      confirm({
        title:"删除当前页面",
        content:"会删除当前页面，但不会删除文件",
        okType:"danger",
        onOk:onDeleteDialogOkClick
      })
    };


    return [
      <DeleteIcon onClick={onDeleteClick}/>,
      <BooKIcon onClick={onCoverDialogOkClick}/>,
      <OrderIcon onClick={() => onSetOrderActionClick(page)}/>
    ]
  };
  return (
    <Card actions={renderCardActions()}>
      <img src={page.path} className={styles.pageImage} alt={`page ${page.id}`}/>
      <div>
        <div className={styles.orderField}>第{page.order}页</div>
      </div>
    </Card>
  );
}
