import React from 'react';
import { Button, Form, Select } from 'antd';
import styles from './style.less';
import { useForm } from 'antd/es/form/util';
import SectionContainer from '@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer';
// @ts-ignore
import { formatMessage } from 'umi';
const { Option } = Select;
export interface OrderFilterItem {
  title: string;
  key: string;
}
interface OrderFilterSectionPropsType {
  orderItems: OrderFilterItem[];
  onAddFilter: (orderKey: string, order: 'asc' | 'desc') => void;
  defaultOrderKey: string;
}

export default function OrderFilterSection({
  orderItems,
  onAddFilter,
  defaultOrderKey,
}: OrderFilterSectionPropsType) {
  const [form] = useForm();
  const orderSelections = orderItems.map((orderItem: OrderFilterItem) => (
    <Option value={orderItem.key} key={orderItem.key}>
      {orderItem.title}
    </Option>
  ));
  const onAddSubmit = (values: any) => {
    const { orderKey = defaultOrderKey, order = 'asc' } = values;
    onAddFilter(orderKey, order);
  };
  return (
    <SectionContainer title={formatMessage({ id: 'global.filter.order.title' })}>
      <Form form={form} onFinish={onAddSubmit}>
        <Form.Item label={formatMessage({ id: 'global.filter.field' })} name="orderKey">
          <Select
            size="small"
            defaultValue={defaultOrderKey}
            className={styles.selectInput}
            style={{ width: 120 }}
          >
            {orderSelections}
          </Select>
        </Form.Item>
        <Form.Item label={formatMessage({ id: 'global.filter.order' })} name="order">
          <Select
            defaultValue="asc"
            size="small"
            className={styles.selectInput}
            style={{ width: 120 }}
          >
            <Option value="asc">{formatMessage({ id: 'global.order.asc' })}</Option>
            <Option value="desc">{formatMessage({ id: 'global.order.desc' })}</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit" className={styles.addButton}>
          {formatMessage({ id: 'global.filter.add' })}
        </Button>
      </Form>
    </SectionContainer>
  );
}
