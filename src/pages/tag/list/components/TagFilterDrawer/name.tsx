import React from 'react';
import SearchNameFilterSection from "@/components/FilterSection/SearchNameFilterSection";
import {TagFilter} from "@/pages/tag/list/model";
import {useIntl} from "@@/plugin-locale/localeExports";

interface TagNameSearchFilterPropsType {
  filter:TagFilter
  onUpdate:(newFilter:TagFilter) => void
}


export default function TagNameSearchFilter({onUpdate,filter}: TagNameSearchFilterPropsType) {
  const intl = useIntl()
    const onSetSearchName = (nameSearch:string) => {
      onUpdate({
        ...filter,
        nameSearch
      })
    };
    return (
        <SearchNameFilterSection onSetSearchName={onSetSearchName} title={intl.formatMessage({id: 'global.filter.filter-name-search.title'})}/>
    );
}
