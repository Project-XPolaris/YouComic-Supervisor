import React, {ChangeEvent, useState} from 'react';
import SectionContainer from '@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer';
import {Button, Input} from 'antd';
import styles from './style.less';
// @ts-ignore
import {formatMessage} from 'umi';
import {useIntl} from "@@/plugin-locale/localeExports";

interface SearchNameFilterSectionPropsType {
  onSetSearchName: (searchName: string) => void;
  title: string
}

export default (
  {
    onSetSearchName,
    title
  }: SearchNameFilterSectionPropsType) => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const intl = useIntl()
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
    <SectionContainer title={title}>
      <Input
        placeholder={intl.formatMessage({id: 'global.filter.filter-name-search.input.hint'})}
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
        {formatMessage({id: 'global.filter.add'})}
      </Button>
    </SectionContainer>
  );
}
