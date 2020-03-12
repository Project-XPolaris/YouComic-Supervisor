import React, {useState} from 'react';
import SectionContainer from "@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer";
import {Button, Select} from "antd";
import styles from './style.less'

const {Option} = Select;

export interface SelectFilterSectionOptionItem {
  title: string,
  value: string
}

interface SelectFilterSectionPropsType {
  title: string
  defaultSelect: any
  options: SelectFilterSectionOptionItem[]
  onAdd:(value:any) => void
}


export default function SelectFilterSection({title, defaultSelect, options,onAdd}: SelectFilterSectionPropsType) {
  const [selectValue,setStateValue] = useState<any>(defaultSelect);
  const onSelectChange = (value:any) => {
    setStateValue(value)
  };
  const items = options.map(optionItem => {
    return (
      <Option key={optionItem.value} value={optionItem.value}>{optionItem.title}</Option>
    )
  });
  const onAddClick = () => {
    onAdd(selectValue)
  };
  return (
    <SectionContainer title={title}>
      <Select defaultValue={defaultSelect} onChange={onSelectChange} className={styles.input}>
        {items}
      </Select>
      <Button type="primary" htmlType="submit" className={styles.addButton} onClick={onAddClick}>添加</Button>
    </SectionContainer>
  );
}
