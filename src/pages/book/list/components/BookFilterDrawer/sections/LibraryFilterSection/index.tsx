import React, {useEffect, useState} from 'react';
import SectionContainer from "@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer";
import {Button, Select} from "antd";
import styles from './style.less'
import {Library, queryLibraryList} from "@/services/library";


interface LibraryFilterSectionPropsType {
  onAddLibrary: (libraryList:Library) => void
}


export default function LibraryFilterSection({ onAddLibrary }: LibraryFilterSectionPropsType) {
  const [libraryList,setLibraryList] = useState<Library[]>([])
  const [value,setValue] = useState<number>()
  const refreshLibraryList = async () => {
    const response = await queryLibraryList({ "pageSize":1000 })
    setLibraryList(response.result)
  }
  useEffect(() => {
    refreshLibraryList()
  },[])
  const onAddLibraryButtonClick = () => {
    if (!value) {
      return
    }
    const library =libraryList.find(it => it.id === value)
    if (!library) {
      return;
    }
    onAddLibrary(library)
  };

  return (
    <SectionContainer title="书库">
      <Select
        onChange={(v) => setValue(Number(v))}
        className={styles.select}
      >
        {
          libraryList.map(it => {
            return (
              <Select.Option value={it.id} >
                {`${it.name} (${it.id})`}
              </Select.Option>
            )
          })
        }
      </Select>
      <Button type="primary" htmlType="submit" className={styles.addButton} onClick={onAddLibraryButtonClick}>添加</Button>
    </SectionContainer>
  );
}
