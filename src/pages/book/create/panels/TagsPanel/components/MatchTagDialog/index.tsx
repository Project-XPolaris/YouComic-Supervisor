import React, {useState} from 'react';
import {Tag} from "@/services/tag";
import {Input, Modal, Tag as TagChip} from "antd";
import styles from './style.less'
import {matchTagInfo} from "@/utils/match";
import {getTagTypeIcon} from "@/utils/icon";
import {uniqWith} from 'lodash'
import {TagItem} from "@/pages/book/create/panels/TagsPanel";

const {CheckableTag} = TagChip;
const {Search} = Input;

interface MatchTagDialogPropsType {
  isOpen?: boolean
  onOk?: (tag: TagItem[]) => void
  onCancel: () => void
  onSearchMatchInfo: (series?: string, artist?: string, theme?: string, translator?: string) => void
  tags: { [key: string]: Tag[] }
}



const matchInfoTagId = {
  artist: -1,
  theme: -2,
  series: -3,
  translator: -4
};
export default function MatchTagDialog({isOpen, onOk, onCancel, onSearchMatchInfo, tags}: MatchTagDialogPropsType) {
  const [selectedTags, setSelectTags] = useState<TagItem[]>([]);
  const [matchInfo, setMatchInfo] = useState();
  const onMatchStringInputChange = (text: string) => {
    if (text !== undefined && text.length > 0) {
      const result = matchTagInfo(text);
      if (result === null) {
        return
      }
      const {series, artist, theme, translator} = result;
      setMatchInfo(result);
      onSearchMatchInfo(series, artist, theme, translator)
    }
  };
  const renderRelateTags = (type: string) => {
    if (tags === undefined || !(type in tags) || matchInfo === null || matchInfo === undefined) {
      return undefined
    }
    let tagItems: TagItem[] = tags[type].map(relateTag => ({
      id: relateTag.id,
      name: relateTag.name,
      type: relateTag.type,
      needCreate: false
    }));
    if (type in matchInfo) {
      tagItems.push({id: matchInfoTagId[type], name: matchInfo[type], type, needCreate: true})
    }
    tagItems = uniqWith<TagItem>(tagItems, (a: TagItem, b: TagItem) => a.name === b.name)
    return tagItems.map(item => {
      const isSelected = selectedTags.find(selectedTag => selectedTag.id === item.id) !== undefined;
      const onTagSelect = (checked: boolean) => {
        if (checked) {
          setSelectTags([
            ...selectedTags,
            item
          ])
        } else {
          setSelectTags(selectedTags.filter(selectedTag => selectedTag.id !== item.id))
        }
      };
      return (
        <CheckableTag
          className={styles.tag}
          key={item.id}
          checked={isSelected}
          onChange={onTagSelect}
        ><span className={styles.tagIcon}>{getTagTypeIcon(item.type)}</span>{item.name}
        </CheckableTag>
      )
    })
  };
  const onOkClick = () => {
    if (onOk) {
      onOk(selectedTags)
    }
  };
  return (
    <Modal
      visible={isOpen}
      onCancel={onCancel}
      maskClosable={false}
      closable={false}
      className={styles.main}
      onOk={onOkClick}
    >
      <Search
        placeholder="要匹配的名称"
        enterButton="匹配"
        onSearch={onMatchStringInputChange}
      />
      <div className={styles.tagsContainer}>
        <div className={styles.tagContainerTitle}>作者</div>
        {renderRelateTags("artist")}
      </div>
      <div className={styles.tagsContainer}>
        <div className={styles.tagContainerTitle}>主题</div>
        {renderRelateTags("theme")}
      </div>
      <div className={styles.tagsContainer}>
        <div className={styles.tagContainerTitle}>系列</div>
        {renderRelateTags("series")}
      </div>
      <div className={styles.tagsContainer}>
        <div className={styles.tagContainerTitle}>翻译</div>
        {renderRelateTags("translator")}
      </div>
    </Modal>
  );
}
