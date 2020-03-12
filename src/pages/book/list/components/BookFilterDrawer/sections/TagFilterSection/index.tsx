import React, {useState} from 'react';
import SectionContainer from "@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer";
import {Tag} from "@/services/tag";
import {Button, Select, Spin} from "antd";
import {debounce} from 'lodash'
import styles from './style.less'

const {Option} = Select;

interface TagFilterSectionPropsType {
  isFetching?: boolean
  onSearch: (key: string,type?:string) => void
  tags?: Tag[]
  onAddTag:(tags:any[]) => void
}


export default function TagFilterSection({isFetching = false, onSearch, tags = [],onAddTag}: TagFilterSectionPropsType) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchType,setSearchType] = useState<string | undefined>(undefined);
  const onSelectChange = (values:any) => {
    setSelectedTags(values)
  };
  const renderSelectItem = () =>
    tags?.map((tag: Tag) => (
      <Option key={tag.id} value={tag.id}>
        {tag.name}
      </Option>
    ));
  const onSelectSearch = debounce((searchKey: string) => {
    onSearch(searchKey,searchType)
  }, 800);
  const onSearchTypeChange =(type:string) => {
    if (type === 'all'){
      setSearchType(undefined)
    }else{
      setSearchType(type)
    }

  };
  const onAddButtonClick = () => {
    onAddTag(selectedTags)
  };
  return (
    <SectionContainer title="标签">
      <div className={styles.field}>
        <span className={styles.fieldLabel}>类别</span>
        <Select  size="small" defaultValue="all" className={styles.selectTypeInput} onChange={onSearchTypeChange}>
          <Option key="all" value="all">
            所有
          </Option>
          <Option key="artist" value="artist">
            艺术家
          </Option>
          <Option key="translator" value="translator">
            翻译
          </Option>
          <Option key="series" value="series">
            系列
          </Option>
          <Option key="theme" value="theme">
            主题
          </Option>
        </Select>
      </div>
      <Select
        mode="multiple"
        labelInValue
        size="small"
        value={selectedTags}
        placeholder="选择标签"
        notFoundContent={isFetching ? <Spin size="small"/> : null}
        filterOption={false}
        onSearch={onSelectSearch}
        onChange={onSelectChange}
        style={{width: '100%'}}
      >
        {renderSelectItem()}
      </Select>
      <Button type="primary" className={styles.addButton} onClick={onAddButtonClick} disabled={selectedTags.length === 0}>添加</Button>
    </SectionContainer>
  );
}
