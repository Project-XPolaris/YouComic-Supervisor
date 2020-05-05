import React from 'react';
import SectionContainer from '@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer';
import { Tag } from 'antd';
// @ts-ignore
import { formatMessage } from 'umi';

interface FilterTagCollectionPropsType {
  tags: FilterTag[];
}

export interface FilterTag {
  key: any;
  text: string;
  data: any;
  onRemove?: (data: any) => void;
}

export default function FilterTagCollection({ tags }: FilterTagCollectionPropsType) {
  return (
    <SectionContainer title={formatMessage({ id: 'global.filter.filter-tag.title' })}>
      {tags.map(tag => (
        <Tag
          color="geekblue"
          closable={Boolean(tag.onRemove)}
          onClose={() => {
            if (tag.onRemove) {
              tag.onRemove(tag.data);
            }
          }}
          key={tag.key}
          visible
        >
          {tag.text}
        </Tag>
      ))}
    </SectionContainer>
  );
}
