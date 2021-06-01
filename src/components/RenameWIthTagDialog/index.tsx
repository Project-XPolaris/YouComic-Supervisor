import { Book } from '@/services/book';
import { Button, Divider, Input, List, Modal, Select, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import style from './style.less';
import AddIcon from '@ant-design/icons/PlusOutlined';
import { useLocalStorageState, useSet } from 'ahooks';
import { Slot } from '@/utils/tag';
import classNames from 'classnames';

const { Option } = Select;

const tagSlots = ['title', 'artist', 'theme', 'series', 'translator'];
export const RenameWithTagDialog = ({
  onCancel,
  onOk,
  isOpen = false,
}: {
  book?: Book;
  isOpen: boolean;
  onCancel: () => void;
  onOk: (pattern: string, slots: Slot[]) => void;
}) => {
  const [savedSlot, setSaveSlot] = useLocalStorageState<{id:string,pattern:string,slots:Slot[]}[]>('rename_pattern', []);
  const [slots, slotController] = useSet<Slot>();
  const [slotRender, setSlotRender] = useState<string>('%content%');
  const [slotType, setSlotType] = useState<string>('title');
  const [pattern, setPattern] = useState<string>('');
  const [useSaveId,setUseSaveId] = useState<string>()
  const onAddSlot = () => {
    slotController.add({
      type: slotType,
      pattern: slotRender,
    });
  };
  const getRenderTag = (renderSlots:Slot[],type: string, content: string = type) => {
    const slot = Array.from(renderSlots).find(it => it.type === type);
    if (slot) {
      return slot.pattern.replace('%content%', content);
    }
    return undefined;
  };
  const renderPreview = (renderPattern : string,renderSlots:Slot[]) => {
    let preview = renderPattern;
    for (let tagSlot of tagSlots) {
      const slotText = getRenderTag(renderSlots,tagSlot);
      if (slotText) {
        preview = preview.replace(`%${tagSlot}%`, slotText);
      }
    }
    return preview;
  };
  const compare = () => {
    if (!savedSlot) {
      return false
    }
    const data = savedSlot.find(it => it.id === useSaveId)
    if (!data) {
      return false
    }
    // different pattern
    if (pattern !== data.pattern ) {
      return false
    }
    for (let slot of data.slots) {
      // must has same type
      const compareSlot = Array.from(slots).find(it => it.type === slot.type)
      if (!compareSlot) {
        return false
      }
      // must has same slot pattern
      if (compareSlot.pattern !== slot.pattern) {
        return false
      }
    }
    return true
  }
  const onDialogOk = () => {
    // compare
    if (!compare()){
      setSaveSlot([...(savedSlot ?? []),{id:Math.random().toString(36).substr(2, 5),pattern,slots:Array.from(slots)}])
    }
    onOk(pattern, Array.from(slots));
  };
  const onAddSave = (id:string) => {
    if (!savedSlot) {
      return
    }
    const data = savedSlot.find(it => it.id === id)
    if (!data) {
      return;
    }
    setPattern(data.pattern)
    slotController.reset()
    data.slots.forEach(it => slotController.add(it))
    setUseSaveId(data.id)
  }
  const reset = () => {
    setPattern("")
    slotController.reset()
  }
  const onRemoveSave = (id:string) => {
    setSaveSlot((savedSlot ?? []).filter(it => it.id !== id))
  }
  return (
    <Modal
      visible={isOpen}
      title={'重命名文件夹'}
      onOk={onDialogOk}
      onCancel={onCancel}
      maskClosable={false}
    >
      <Input
        placeholder={'格式'}
        className={style.input}
        value={pattern}
        onChange={e => setPattern(e.target.value)}
      />
      <Typography.Text strong className={style.label}>
        使用Slot
      </Typography.Text>
      <div className={style.tags}>
        {Array.from(slots).map((slot, idx) => {
          return (
            <Tag key={idx} onClose={() => slotController.remove(slot)} closable>
              {slot.type}
            </Tag>
          );
        })}
      </div>
      <Typography.Text strong className={classNames(style.label)}>
        预览
      </Typography.Text>
      <div className={classNames(style.preview)}>{renderPreview(pattern,Array.from(slots))}</div>
      <Button className={style.reset} onClick={reset}>重置</Button>
      <Divider />
      <Typography.Text strong className={style.label}>
        添加渲染Slot
      </Typography.Text>
      <div className={style.action}>
        <Select
          defaultValue="title"
          className={style.select}
          onChange={value => setSlotType(value)}
        >
          <Option value="title">Title</Option>
          <Option value="artist">Artist</Option>
          <Option value="theme">Theme</Option>
          <Option value="series">Series</Option>
          <Option value="translator">Translator</Option>
        </Select>
        <Input
          placeholder={'渲染格式'}
          className={style.renderInput}
          value={slotRender}
          onChange={e => {
            setSlotRender(e.target.value);
          }}
        />
        <Button type={'primary'} icon={<AddIcon />} onClick={onAddSlot}>
          添加
        </Button>
      </div>
      <Divider/>
      <Typography.Text strong className={style.label}>
        使用过的模板
      </Typography.Text>
        <List
          className={style.saveContainer}
          itemLayout="horizontal"
          dataSource={savedSlot}
          renderItem={it => (
            <List.Item
              actions={[<a onClick={() => onRemoveSave(it.id)} >delete</a>]}
            >
              <List.Item.Meta
                title={<a onClick={() => onAddSave(it.id)}>{renderPreview(it.pattern,it.slots)}</a>}
              />
            </List.Item>
          )}
        />
    </Modal>
  );
};
