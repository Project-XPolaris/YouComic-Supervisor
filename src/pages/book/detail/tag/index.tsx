import React from 'react';
import {connect, Dispatch} from 'dva';
import TagsCollection from "@/pages/book/detail/tag/components/TagsCollection";
import {ConnectState} from "@/models/connect";
import {BookDetailTagsStateType} from "@/pages/book/detail/tag/model";
import styles from './style.less'
import {Button, Modal, Pagination} from "antd";
import AddTagDialog from "@/pages/book/detail/tag/components/AddTagDialog";
import {Tag} from "@/services/tag";
import {router} from "umi";

const {confirm} = Modal;

interface BookDetailTagsPagePropsType {
  dispatch: Dispatch,
  bookDetailTags: BookDetailTagsStateType
}

function BookDetailTagsPage({dispatch, bookDetailTags}: BookDetailTagsPagePropsType) {
  const {tags, count, page, pageSize, isAddTagDialogOpen} = bookDetailTags;
  const onPageChange = (toPage: number, toPageSize: number = 20) => {
    dispatch({
      type: "bookDetailTags/setPage",
      payload: {
        page: toPage,
        pageSize: toPageSize
      }
    });
    dispatch({
      type: "bookDetailTags/queryTags",
    })
  };
  const onAddTagDialogCancel = () => {
    dispatch({
      type: "bookDetailTags/setAddTagDialog",
      payload: {
        isOpen: false
      }
    })
  };
  const onAddTagClick = () => {
    dispatch({
      type: "bookDetailTags/setAddTagDialog",
      payload: {
        isOpen: true
      }
    })
  };

  const onAddTag = (name: string, type: string) => {
    dispatch({
      type:"bookDetailTags/addTagToBook",
      payload:{
        name,type
      }
    })
  };
  const onTagDeleteClick = (tag: Tag) => {
    confirm({
      title: `确定要删除标签 ${tag.name}`,
      content: '会解除当前标签的关联',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch({
          type:"bookDetailTags/deleteTagFromBook",
          payload:{
            tagId:tag.id
          }
        })
      },
    });
  };
  const onTagTitleClick = (tag:Tag) => {
    router.push(`/tag/${tag.id}`)
  };
  return (
    <div className={styles.main}>
      <Button type="dashed" className={styles.addBtn} onClick={onAddTagClick}>添加</Button>
      <TagsCollection tags={tags} onDelete={onTagDeleteClick} onTagTitleClick={onTagTitleClick}/>
      <div className={styles.pageWrap}>
        <Pagination defaultCurrent={1} total={count} current={page} pageSize={pageSize} onChange={onPageChange}/>
      </div>
      <AddTagDialog isOpen={isAddTagDialogOpen} onCancel={onAddTagDialogCancel} onAdd={onAddTag}/>
    </div>
  );
}

export default connect(({bookDetailTags}: ConnectState) => ({bookDetailTags}))(BookDetailTagsPage);
