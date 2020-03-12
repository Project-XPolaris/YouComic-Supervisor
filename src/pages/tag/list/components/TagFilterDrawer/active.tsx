import React from 'react';
import SectionContainer from "@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer";
import {TagFilter} from "@/pages/tag/list/model";
import {Tag} from "antd";
import {tagTypeFilterItem} from "./type"

interface ActiveFilterSectionPropsType {
  filter: TagFilter
  onUpdateTag: (newTag: TagFilter) => void
}


export default function ActiveFilterSection({filter, onUpdateTag}: ActiveFilterSectionPropsType) {
  const renderOrderTags = () => {
    return filter.orders.map(orderItem => {
      const onCloseTag = () => {
        onUpdateTag({
          ...filter,
          orders: filter.orders.filter(activeOrderItem => activeOrderItem.orderKey !== orderItem.orderKey)
        })
      };
      return (
        <Tag key={orderItem.orderKey} color="geekblue" closable
             onClose={onCloseTag}>{orderItem.orderKey}{orderItem.order === "asc" ? " 升序" : " 降序"}</Tag>
      )
    })
  };
  const renderSearchNameTag = () => {
    if (filter.nameSearch === undefined) {
      return undefined
    }
    const onSearchNameClose = () => {
      onUpdateTag({
        ...filter,
        nameSearch: undefined
      })
    };
    return (
      <Tag color="geekblue" closable onClose={onSearchNameClose} key="nameSearch">{`搜索: ${filter.nameSearch}`}</Tag>
    )
  };
  const renderTypeFilterTags = () => {
    return filter.type.map(activeTypeItem => {
      const optionItem = tagTypeFilterItem.find(option => option.value === activeTypeItem);
      if (optionItem === undefined) {
        return undefined
      }
      const onCloseTag = () => {
        onUpdateTag({
          ...filter,
          type: filter.type.filter(item => item !== activeTypeItem)
        })
      };
      return (
        <Tag key={activeTypeItem} color="geekblue" closable
             onClose={onCloseTag}>{`标签:${optionItem.title}`}</Tag>
      )
    })
  };
  return (
    <SectionContainer title="已激活">
      {renderOrderTags()}
      {renderSearchNameTag()}
      {renderTypeFilterTags()}
    </SectionContainer>
  );
}
