import React, { ChangeEvent, useState } from 'react';
import SectionContainer from '@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer';
import { Button, Input } from 'antd';
import styles from './style.less';
// @ts-ignore
import { formatMessage } from 'umi';

interface SearchNameFilterSectionPropsType {
  onSetSearchName: (searchName: string) => void;
}

export default function SearchNameFilterSection({
  onSetSearchName,
}: SearchNameFilterSectionPropsType) {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.currentTarget.value;
    if (searchString !== undefined && searchString.length !== 0) {
      setSearchText(searchString);
    }
  };
  const onAddClick = () => {
    if (searchText !== undefined) {
      onSetSearchName(searchText);
    }
  };
  return (
    <SectionContainer title={formatMessage({ id: 'global.filter.filter-name-search.title' })}>
      <Input
        placeholder={formatMessage({ id: 'global.filter.filter-name-search.input.hint' })}
        size="small"
        className={styles.nameInput}
        onChange={onTextChange}
      />
      <Button
        type="primary"
        htmlType="submit"
        className={styles.addButton}
        onClick={onAddClick}
        disabled={searchText === undefined || searchText.length === 0}
      >
        {formatMessage({ id: 'global.filter.add' })}
      </Button>
    </SectionContainer>
  );
}
