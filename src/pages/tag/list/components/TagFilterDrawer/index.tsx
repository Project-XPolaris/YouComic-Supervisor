import React from 'react';
import FilterDrawer from "@/components/FilterDrawer";
import {TagFilter} from "@/pages/tag/list/model";
import TagOrderFilter from "@/pages/tag/list/components/TagFilterDrawer/order";
import {encodeOrderToUrl, updateQueryParamAndReplaceURL} from "@/utils/uri";
import ActiveFilterSection from "@/pages/tag/list/components/TagFilterDrawer/active";
import TagNameSearchFilter from "@/pages/tag/list/components/TagFilterDrawer/name";
import TagTypeFilter from "@/pages/tag/list/components/TagFilterDrawer/type";


interface TagFilterDrawerPropsType {
  onClose: () => void
  isOpen?: boolean
  filter:TagFilter
}


export default function TagFilterDrawer({onClose, isOpen = false,filter}: TagFilterDrawerPropsType) {
  const onFilterUpdate = (newFilter:TagFilter) => {
    updateQueryParamAndReplaceURL({
      order:encodeOrderToUrl(newFilter.orders),
      nameSearch:newFilter.nameSearch,
      type:newFilter.type
    })
  };
  const sections = [
    <ActiveFilterSection key={0} filter={filter} onUpdateTag={onFilterUpdate}/>,
    <TagOrderFilter key={1} filter={filter} onFilterUpdate={onFilterUpdate}/>,
    <TagNameSearchFilter key={2} filter={filter} onUpdate={onFilterUpdate}/>,
    <TagTypeFilter key={3} filter={filter} onUpdate={onFilterUpdate}/>
  ];
  return (
    <FilterDrawer
      onClose={onClose}
      isOpen={isOpen}
      filterSections={sections}
    />
  );
}
