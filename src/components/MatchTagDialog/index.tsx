import React, { ReactElement, useState } from 'react';
import style from './style.less';
import { Checkbox, Input, List, Modal, ModalProps, Typography } from 'antd';
import { matchTagInfo } from '@/utils/match';
import { useSet } from 'ahooks';

export interface MatchTag {
  name: string;
  type: string;
}

export interface MatchTagDialogProps {
  onMatchOk: (title: string | undefined, tags: MatchTag[]) => void;
  text?: string;
}

const MatchTagDialog = ({
                          onMatchOk,
                          text = '',
                          ...props
                        }: MatchTagDialogProps & ModalProps): ReactElement => {
  const [value, setValue] = useState(text);
  const [_, { add, has, remove }] = useSet(['Artist', 'Title', 'Series', 'Theme', 'Translator']);
  const result = matchTagInfo(value);
  const data = [
    {
      title: result?.title,
      sub: 'Title',
    },
    {
      title: result?.artist,
      sub: 'Artist',
    },
    {
      title: result?.theme,
      sub: 'Theme',
    },
    {
      title: result?.series,
      sub: 'Series',
    },
    {
      title: result?.translator,
      sub: 'Translator',
    },
  ];
  const onModalOk = () => {
    if (!result) {
      return;
    }
    const tags: MatchTag[] = [];
    let title: string | undefined = undefined;
    if (result.title && has('Title')) {
      title = result.title;
    }
    if (result.artist && has('Artist')) {
      tags.push({
        name: result.artist,
        type: 'artist',
      });
    }
    if (result.series && has('Series')) {
      tags.push({
        name: result.series,
        type: 'series',
      });
    }
    if (result.theme && has('Theme')) {
      tags.push({
        name: result.theme,
        type:  'theme',
      });
    }
    if (result.translator && has('Translator')) {
      tags.push({
        name: result.translator,
        type: 'translator',
      });
    }
    onMatchOk(title, tags);
  };
  return (
    <Modal title={'匹配标签'} {...props} className={style.root} onOk={onModalOk}>
      <Input value={value} onChange={e => setValue(e.target.value)} />
      <Typography.Text>{text}</Typography.Text>
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Checkbox
              className={style.checkbox}
              checked={has(item.sub)}
              onChange={e => {
                e.target.checked ? add(item.sub) : remove(item.sub);
              }}
            />
            <List.Item.Meta title={item.title} description={item.sub} />
          </List.Item>
        )}
      />
    </Modal>
  );
};
export default MatchTagDialog;
