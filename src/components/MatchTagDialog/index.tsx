import React, {ReactElement, useEffect, useState} from 'react';
import style from './style.less';
import {Checkbox, Input, List, Modal, ModalProps, Select, Typography} from 'antd';
import {useDebounce} from 'ahooks';
import {MatchTag, matchTagFromRawString} from "@/services/tag";


export interface MatchTagDialogProps {
  onMatchOk: (title: string | undefined, tags: MatchTag[]) => void;
  text?: string;
}

const MatchTagDialog = (
  {
    onMatchOk,
    text = '',
    ...props
  }: MatchTagDialogProps & ModalProps): ReactElement => {
  const [value, setValue] = useState(text);
  const [matchTags, setMatchTags] = useState<MatchTag[]>([])
  const [selectIds, setSelectIds] = useState<string[]>([])
  const matchText = useDebounce(
    value,
  );
  const pickUpWithType = (type: string, tags: MatchTag[]): MatchTag | undefined => {
    let tag = tags.find(it => it.type === type && it.source === 'pattern')
    if (tag) {
      return tag
    }
    tag = tags.find(it => it.type === type && it.source === 'database')
    return tag
  }
  const refreshPickUp = (tags: MatchTag[]) => {
    const pickupType: string[] = ["artist", "name", "series", "theme", "translator"]
    const pickUpIds: string[] = []
    for (let typeString of pickupType) {
      const tag = pickUpWithType(typeString, tags)
      if (tag) {
        pickUpIds.push(tag.id)
      }
    }
    setSelectIds(pickUpIds)
  }
  const refreshMatchResult = async (text: string) => {
    const result = await matchTagFromRawString({text})
    setMatchTags(result)
    refreshPickUp(result)
  }

  useEffect(() => {
    refreshMatchResult(matchText)
  }, [matchText])
  const onModalOk = () => {
    let selectTags:MatchTag[] = [];
    for (let selectId of selectIds) {
      const selectTag = matchTags.find(it => it.id === selectId)
      if (selectTag) {
        selectTags.push(selectTag)
      }
    }
    let title: string | undefined = undefined;
    const titleTag = selectTags.find(it => it.type === "name")
    if (titleTag) {
      title = titleTag.name;
    }
    selectTags = selectTags.filter(it => it.type !== "name")
    onMatchOk(title,selectTags)
  };
  const renderDesc = (tag: MatchTag) => {
    if (tag.source === 'raw') {
      const onSelectChange = (type: string) => {
        setMatchTags(matchTags.map(it => {
          if (it.id === tag.id) {
            return {
              ...it,
              type,
            }
          }
          return {
            ...it
          }
        }))
      }
      return (
        <div>
          <Select size='small' className={style.selectType} onChange={onSelectChange}>
            <Select.Option value={"artist"}>artist</Select.Option>
            <Select.Option value={"series"}>series</Select.Option>
            <Select.Option value={"theme"}>theme</Select.Option>
            <Select.Option value={"translator"}>translator</Select.Option>
          </Select>
          | raw
        </div>

      )
    }
    return (
      <div>
        <Typography.Text strong>
          {tag.type}
        </Typography.Text> | {tag.source}
      </div>
    )
  }
  const getCheckboxDisable = (tag: MatchTag) => {
    return tag.source === 'raw' && tag.type.length === 0
  }
  const onCheckChange = (id: string, isChecked: boolean) => {
    let newIds = selectIds;
    if (isChecked) {
      newIds = [...newIds.filter(it => it !== id), id]
    } else {
      newIds = newIds.filter(it => it !== id)
    }
    setSelectIds(newIds)
  }
  return (
    <Modal title={'匹配标签'} {...props} className={style.root} onOk={onModalOk}>
      <Input value={value} onChange={e => setValue(e.target.value)}/>
      <Typography.Text>{text}</Typography.Text>
      <List
        dataSource={matchTags}
        renderItem={item => (
          <List.Item>
            <Checkbox
              disabled={getCheckboxDisable(item)}
              className={style.checkbox}
              checked={Boolean(selectIds.find(it => it === item.id))}
              onChange={e => {
                onCheckChange(item.id, e.target.checked)
              }}
            />
            <List.Item.Meta title={item.name} description={renderDesc(item)}/>
          </List.Item>
        )}
      />
    </Modal>
  );
};
export default MatchTagDialog;
