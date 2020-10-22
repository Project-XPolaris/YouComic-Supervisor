import React from 'react';
import {Divider, Drawer} from "antd";
import OrderFilterSection from "@/components/FilterSection/OrderFilterSection";
import ActiveFilterSection from "@/pages/book/list/components/BookFilterDrawer/sections/ActiveFilterSection";
import SearchNameFilterSection from "@/components/FilterSection/SearchNameFilterSection";
import TimeRangeFilterSection from "@/pages/book/list/components/BookFilterDrawer/sections/TimeRangeFilterSection";
import TagFilterSection from "@/pages/book/list/components/BookFilterDrawer/sections/TagFilterSection";
import {Tag} from "@/services/tag";


interface BookFilterDrawerPropsType {
  isOpen: boolean
  onClose: () => void
  onFilterChange: (filter: BookFilter) => void
  filter: BookFilter
  isTagFetching?: boolean
  onTagSearch: (key: string, type?: string) => void
  searchTags?: Tag[]
}

export interface BookFilter {
  order: { orderKey: string, order: "asc" | "desc" }[]
  nameSearch?: string
  startTime?: string
  endTime?: string
  tags: { id: number, name: string }[]
  tagIds:number[]
}

const orderItems = [
  {
    key: "id",
    title: "ID"
  },
  {
    key: "name",
    title: "名称"
  },
  {
    key: "created_at",
    title: "创建时间"
  },
  {
    key: "updated_at",
    title: "修改时间"
  },
];
export default function BookFilterDrawer({isOpen = false, onClose, onFilterChange, filter, isTagFetching, onTagSearch, searchTags}: BookFilterDrawerPropsType) {
  const onAddFilter = (orderKey: string, order: "asc" | "desc") => {
    const orderFilter = filter.order.filter(item => item.orderKey !== orderKey);
    onFilterChange({
      ...filter,
      order: [
        ...orderFilter,
        {orderKey, order}
      ]
    })
  };
  const onActiveFilterChange = (newFilter: any) => {
    onFilterChange(newFilter)
  };
  const onAddNameSearch = (searchText: string) => {
    onFilterChange({
      ...filter,
      nameSearch: searchText
    })
  };
  const onAddTimeRange = (startTime: string, endTime: string) => {
    onFilterChange({
      ...filter,
      startTime,
      endTime
    })
  };
  const onAddTagsFilter = (tags: { value: number, label: string, key: number }[]) => {
    onFilterChange({
      ...filter,
      tags: tags.map(item => ({id: item.value, name: item.label}))
    })
  };
  return (
    <Drawer
      title="过滤器"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={isOpen}
      width={320}
    >
      <ActiveFilterSection orderItems={orderItems} filter={filter} onFilterChange={onActiveFilterChange}/>
      <Divider/>
      <OrderFilterSection orderItems={orderItems} onAddFilter={onAddFilter} defaultOrderKey="id"/>
      <Divider/>
      <SearchNameFilterSection onSetSearchName={onAddNameSearch}/>
      <Divider/>
      <TimeRangeFilterSection onAddRangeChange={onAddTimeRange}/>
      <Divider/>
      <TagFilterSection isFetching={isTagFetching} onSearch={onTagSearch} tags={searchTags} onAddTag={onAddTagsFilter}/>
    </Drawer>
  );
}
