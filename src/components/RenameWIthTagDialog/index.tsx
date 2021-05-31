import { Book } from '@/services/book';
import { Button, Divider, Input, Modal, Select, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import style from './style.less';
import AddIcon from '@ant-design/icons/PlusOutlined';
import { useSet } from 'ahooks';
import { Slot } from '@/utils/tag';

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
  const [slots, slotController] = useSet<Slot>();
  const [slotRender, setSlotRender] = useState<string>('%content%');
  const [slotType, setSlotType] = useState<string>('title');
  const [pattern, setPattern] = useState<string>('');
  const onAddSlot = () => {
    slotController.add({
      type: slotType,
      pattern: slotRender,
    });
  };
  const getRenderTag = (type: string, content: string = type) => {
    const slot = Array.from(slots).find(it => it.type === type);
    if (slot) {
      return slot.pattern.replace('%content%', content);
    }
    return undefined;
  };
  const renderPreview = () => {
    let preview = pattern;
    for (let tagSlot of tagSlots) {
      const slotText = getRenderTag(tagSlot);
      if (slotText) {
        preview = preview.replace(`%${tagSlot}%`, slotText);
      }
    }
    return preview;
  };
  const onDialogOk = () => {
    onOk(pattern, Array.from(slots));
  };
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
      <Typography.Text strong className={style.label}>
        预览
      </Typography.Text>
      <div>{renderPreview()}</div>
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
    </Modal>
  );
};
