import OrderFilterSection, {OrderFilterItem} from "@/components/FilterSection/OrderFilterSection";
import React from "react";
import {TagFilter} from "@/pages/tag/list/model";
export const tagOrderFilerItems: OrderFilterItem[] = [
  {
    title: "ID",
    key: "id"
  },
  {
    title: "名称",
    key: "name"
  },
  {
    title: "创建时间",
    key: "created_at"
  },
  {
    title: "修改时间",
    key: "updated_at"
  }
];
const TagOrderFilter = (
  {
    onFilterUpdate,
    filter
  }: {
    onFilterUpdate: (newFilter: TagFilter) => void
    filter:TagFilter
  }
) => {

  const onAddOrderFilter = (orderKey: string, order: "asc"|"desc") => {
    onFilterUpdate({
      ...filter,
      orders:[...filter.orders.filter(orderItem => orderItem.orderKey !== orderKey),{order,orderKey}]
    })
  };
  return (
    <OrderFilterSection orderItems={tagOrderFilerItems} onAddFilter={onAddOrderFilter} defaultOrderKey="id"/>
  )
};

export default TagOrderFilter
