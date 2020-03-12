import React from 'react';
import SearchNameFilterSection from "@/components/FilterSection/SearchNameFilterSection";
import {TagFilter} from "@/pages/tag/list/model";

interface TagNameSearchFilterPropsType {
  filter:TagFilter
  onUpdate:(newFilter:TagFilter) => void
}


export default function TagNameSearchFilter({onUpdate,filter}: TagNameSearchFilterPropsType) {
    const onSetSearchName = (nameSearch:string) => {
      onUpdate({
        ...filter,
        nameSearch
      })
    };
    return (
        <SearchNameFilterSection onSetSearchName={onSetSearchName}/>
    );
}
