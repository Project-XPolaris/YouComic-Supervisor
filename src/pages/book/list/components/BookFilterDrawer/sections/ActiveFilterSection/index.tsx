import React from 'react';
import {Tag} from "antd";
import SectionContainer from "@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer";
import {BookFilter} from "@/pages/book/list/components/BookFilterDrawer";

interface ActiveFilterSectionPropsType {
  filter: BookFilter
  orderItems: any[]
  onFilterChange:(filter:any) => void
}


export default function ActiveFilterSection({filter, orderItems,onFilterChange}: ActiveFilterSectionPropsType) {
  const renderOrderTag = () =>
    filter.order.map((filterOrderItem: { orderKey: string, order: string }) => {
      const filterItem = orderItems.find(orderItem => filterOrderItem.orderKey === orderItem.key);
      const onCloseTag = () => {
        onFilterChange({
          ...filter,
          order:filter.order.filter((item: { orderKey: string, order: string }) => filterOrderItem.orderKey !== item.orderKey)
        })
      };
      return (
        <Tag key={filterOrderItem.orderKey} color="geekblue" closable onClose={onCloseTag}>{filterItem?.title}{filterOrderItem.order === "asc"?" 升序":" 降序"}</Tag>
      )
    });
  const renderSearchTag = () => {
    if (filter.nameSearch !== undefined){
      const onSearchNameClose = () => {
        onFilterChange({
          ...filter,
          nameSearch:undefined
        })
      };
      return (
        <Tag color="geekblue" closable onClose={onSearchNameClose} key="nameSearch">{`搜索: ${filter.nameSearch}`}</Tag>
      )
    }
    return undefined
  };
  const renderTimeRange = () => {
    if(filter.endTime && filter.startTime){
      const onTimeRangeClose = () => {
        onFilterChange({
          ...filter,
          startTime:undefined,
          endTime:undefined
        })
      };
      return (
        <Tag color="geekblue" closable onClose={onTimeRangeClose} key="createTimeRange">{`创建时间:${filter.startTime} 至 ${filter.endTime}`}</Tag>
      )
    }
    return undefined
  };
  const renderTagFilter = () => {
    return filter.tags.map(item => {
      const onTagClose = () => {
        onFilterChange({
          ...filter,
          tags:filter.tags.filter(filterTag => filterTag.id !== item.id)
        })
      };
      return (
        <Tag color="geekblue" closable onClose={onTagClose} key="nameSearch">{`标签:${item.name}`}</Tag>
      )
    })
  };
  return (
    <SectionContainer title="已激活">
      {renderOrderTag()}
      {renderSearchTag()}
      {renderTimeRange()}
      {renderTagFilter()}
    </SectionContainer>
  );
}
