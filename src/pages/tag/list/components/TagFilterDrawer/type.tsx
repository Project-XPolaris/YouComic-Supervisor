import React from 'react';
import SelectFilterSection, {SelectFilterSectionOptionItem} from "@/components/FilterSection/SelectFilterSection";
import {TagFilter} from "@/pages/tag/list/model";

export const tagTypeFilterItem: SelectFilterSectionOptionItem[] = [
  {
    title: "作者",
    value: "artist"
  },
  {
    title: "主题",
    value: "theme"
  },
  {
    title: "系列",
    value: "series"
  },
  {
    title: "翻译",
    value: "translator"
  },
];

interface TagTypeFilterPropsType {
  filter: TagFilter
  onUpdate: (newFilter: TagFilter) => void
}


export default function TagTypeFilter({filter, onUpdate}: TagTypeFilterPropsType) {
  const onAdd = (type: string) => {
    if (filter.type.find(activeTypeFilter => activeTypeFilter === type) !== undefined) {
      return
    }
    onUpdate({
      ...filter,
      type: [...filter.type, type]
    })
  };
  return (
    <SelectFilterSection
      options={tagTypeFilterItem.filter(item => filter.type.find(activeTypeFilter => activeTypeFilter === item.value) === undefined)}
      title="标签类型" defaultSelect="artist" onAdd={onAdd}/>
  );
}
