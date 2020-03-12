import React, {useState} from 'react';
import {Button} from "antd";
import styles from './style.less'
import SearchTagDialog from "@/pages/book/create/panels/TagsPanel/components/SearchTagDialog";
import {connect, Dispatch} from 'dva'
import {ConnectState} from "@/models/connect";
import {CreateBookPageModelStateType} from "@/pages/book/create/model";
import {setDialogActive} from "@/utils/dialog";
import {DialogStateType} from "@/models/dialog";
import {Tag} from "@/services/tag";
import AddTagDialog from "@/pages/tag/list/components/AddTagDialog";
import MatchTagDialog from "@/pages/book/create/panels/TagsPanel/components/MatchTagDialog";
import {differenceWith, uniqWith} from 'lodash';
import BookTagCardCollection from "@/pages/book/create/panels/TagsPanel/components/BookTagCardCollection";
import SelectIcon from '@ant-design/icons/TagsFilled'
import AddIcon from '@ant-design/icons/PlusOutlined'
import MatchIcon from '@ant-design/icons/FileSearchOutlined'
import DeleteIcon from '@ant-design/icons/DeleteFilled'

const searchTagDialogKey = "createBook/searchTagDialog";
const createTagDialogKey = "createBook/createTagDialog";
const matchTagDialogKey = "createBook/matchTagDialog";

export interface TagItem {
  id?: number
  name: string
  needCreate: boolean
  type: string
}

interface TagsPanelPropsType {
  createBook: CreateBookPageModelStateType,
  dispatch: Dispatch
  dialog: DialogStateType
  bookTags: TagItem[]
  onBookTagChange: (tags: TagItem[]) => void
}

function addTagToBookTag(tags: Tag[], bookTags: TagItem[]) {
  return uniqWith<TagItem>([
    ...bookTags,
    ...tags.map(tag => ({id: tag.id, name: tag.name, type: tag.type, needCreate: false}))
  ], (a: TagItem, b: TagItem) => a.name === b.name)
}

let createTagId = -100;

const TagsPanel = ({dispatch, dialog: {dialogs}, createBook, onBookTagChange, bookTags}: TagsPanelPropsType) => {
  const onAddTagClick = () => {
    setDialogActive({dispatch, dialogName: searchTagDialogKey, isActive: true})
  };
  const renderSelectTagDialog = () => {
    const onAddTagDialogClose = () => {
      setDialogActive({dispatch, dialogName: searchTagDialogKey, isActive: false})
    };
    const onSearchTag = (key: string) => {
      dispatch({
        type: "createBook/searchTags",
        payload: {
          key
        }
      })
    };
    const onSelectTagDialogAdd = (addTags: Tag[]) => {
      onBookTagChange(addTagToBookTag(addTags, bookTags));
      onAddTagDialogClose()
    };
    return (
      <SearchTagDialog
        onCancel={onAddTagDialogClose}
        onSearch={onSearchTag}
        isOpen={Boolean(dialogs[searchTagDialogKey])}
        tags={createBook.searchTags}
        onOk={onSelectTagDialogAdd}/>
    )
  };

  const onCreateTagDialogOpen = () => {
    setDialogActive({dispatch, dialogName: createTagDialogKey, isActive: true})
  };
  const renderCreateTagDialog = () => {
    const onCreateTagDialogClose = () => {
      setDialogActive({dispatch, dialogName: createTagDialogKey, isActive: false})
    };
    const onAdd = (name: string, type: string) => {
      onBookTagChange(uniqWith<TagItem>([
        ...bookTags,
        {name, type, needCreate: true, id: createTagId - 1}
      ], (a: TagItem, b: TagItem) => a.name === b.name));
      createTagId -= 1;
      onCreateTagDialogClose()
    };
    return (
      <AddTagDialog onAdd={onAdd} onCancel={onCreateTagDialogClose} isOpen={Boolean(dialogs[createTagDialogKey])}/>
    )
  };

  const onMatchTagDialogOpen = () => {
    setDialogActive({dispatch, dialogName: matchTagDialogKey, isActive: true})
  };
  const renderMatchTagDialog = () => {
    const onMatchTagDialogClose = () => {
      setDialogActive({dispatch, dialogName: matchTagDialogKey, isActive: false})
    };
    const onSearchMatchInfo = (series?: string, artist?: string, theme?: string, translator?: string) => {
      dispatch({
        type: "createBook/getMatchTags",
        payload: {
          tagKeys: {series, artist, theme, translator}
        }
      })
    };
    const onOk = (tags: TagItem[]) => {
      onBookTagChange(uniqWith([
        ...bookTags,
        ...tags
      ], (a: TagItem, b: TagItem) => a.name === b.name));
      onMatchTagDialogClose()
    };
    return (
      <MatchTagDialog
        onCancel={onMatchTagDialogClose}
        isOpen={Boolean(dialogs[matchTagDialogKey])}
        onSearchMatchInfo={onSearchMatchInfo}
        tags={createBook.relateTags}
        onOk={onOk}
      />
    )
  };
  const [selectedTags, setSelectTags] = useState<TagItem[]>([]);
  const onTagCardClick = (tag: TagItem) => {
    const isExist = selectedTags.find(selectedTag => selectedTag.id === tag.id) !== undefined
    if (isExist) {
      setSelectTags(selectedTags.filter(selectedTag => selectedTag.id !== tag.id))
    } else {
      setSelectTags([
        ...selectedTags,
        tag
      ])
    }
  };
  const renderMultipleAction = () => {
    const onDelete = () => {
      onBookTagChange(differenceWith<TagItem, TagItem>(bookTags, selectedTags, (a: TagItem, b: TagItem) => a.id === b.id))
      setSelectTags([])
    };
    return (
      <div>
        <span className={styles.selectTagCountText}>
          已选择{selectedTags.length}项
        </span>
        <Button className={styles.actionButton} type="danger" onClick={onDelete}><DeleteIcon/>移除</Button>
      </div>
    )
  };
  return (
    <div>
      {renderSelectTagDialog()}
      {renderCreateTagDialog()}
      {renderMatchTagDialog()}
      <div className={styles.actionButtonContainer}>
        <div>
          <Button className={styles.actionButton} onClick={onAddTagClick}><SelectIcon/>添加标签</Button>
          <Button className={styles.actionButton} onClick={onCreateTagDialogOpen}><AddIcon/>创建标签</Button>
          <Button className={styles.actionButton} onClick={onMatchTagDialogOpen}><MatchIcon/>识别标签</Button>
        </div>
        {selectedTags.length > 0 && renderMultipleAction()}
      </div>
      <div className={styles.cardCollectionWrap}>
        <BookTagCardCollection tags={bookTags} onCardClick={onTagCardClick} selectedTags={selectedTags}/>
      </div>
    </div>
  );
};
export default connect(({createBook, dialog}: ConnectState) => ({createBook, dialog}))(TagsPanel)
