import React, {useState} from 'react';
import {Modal, Select} from "antd";
import debounce from 'lodash/debounce';
import {uniqWith} from 'lodash'
import {Tag} from "@/services/tag";
import styles from './style.less'
import {getTagTypeIcon} from "@/utils/icon";

const {Option} = Select;


interface SearchTagDialogPropsType {
  isOpen?: boolean
  onOk?: (tag: Tag[]) => void
  onCancel: () => void
  onSearch: (key: string) => void
  tags?: Tag[]
}


export default function SearchTagDialog({isOpen = false, onCancel, onSearch, tags, onOk}: SearchTagDialogPropsType) {
  const [selectTags, setSelectTags] = useState<Tag[]>([]);
  const onSelectSearch = debounce((key: string) => {
    onSearch(key)
  }, 300);
  const renderOptions = () => {
    return tags?.map((tag: Tag) => {
      return (
        <Option key={tag.id} value={tag.id}><span className={styles.typeIcon}>{getTagTypeIcon(tag.type)}</span>{tag.name}</Option>
      )
    })
  };
  const onSelectChange = (values: any[]) => {
    let tagList = selectTags;
    if (tags !== undefined) {
      tagList.push(...tags)
    }
    tagList = uniqWith(tagList,(a:Tag,b:Tag) => a.id === b.id);
    setSelectTags(tagList.filter((tag: Tag) => values.find(val => val.value === tag.id) !== undefined))
  };
  const onModalOKClick = () => {
    if (onOk === undefined || selectTags.length === 0) {
      return
    }
    onOk(selectTags)
  };
  return (
    <Modal
      visible={isOpen}
      onCancel={onCancel}
      onOk={onModalOKClick}
      title="搜索标签"
    >
      <Select
        onSearch={onSelectSearch}
        mode="multiple"
        labelInValue
        filterOption={false}
        onChange={onSelectChange}
        className={styles.selection}
      >
        {renderOptions()}
      </Select>
    </Modal>
  );
}
