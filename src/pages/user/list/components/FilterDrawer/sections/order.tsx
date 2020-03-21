import React from 'react';
import { connect, Dispatch } from 'dva';
import OrderFilterSection from '@/components/FilterSection/OrderFilterSection';
import { ConnectState } from '@/models/connect';
import { UserListModelStateType } from '@/pages/user/list/model';
import { encodeOrderToUrl, updateQueryParamAndReplaceURL } from '@/utils/uri';
// @ts-ignore
import { formatMessage } from 'umi/locale';

interface UserListOrderFilterSectionPropsType {
  dispatch: Dispatch;
  userList: UserListModelStateType;
}

function UserListOrderFilterSection({ userList }: UserListOrderFilterSectionPropsType) {
  const { filter } = userList;
  const onAddOrderFilter = (orderKey: string, order: any) => {
    updateQueryParamAndReplaceURL({
      order: encodeOrderToUrl([
        ...filter.orders.filter(activeOrder => activeOrder.orderKey !== orderKey),
        { orderKey, order },
      ]),
    });
  };
  return (
    <OrderFilterSection
      orderItems={[
        {
          key: 'id',
          title: formatMessage({ id: 'userList.filter.order.id.title' }),
        },
        {
          key: 'username',
          title: formatMessage({ id: 'userList.filter.order.username.title' }),
        },
        {
          key: 'create_at',
          title: formatMessage({ id: 'userList.filter.order.create_at.title' }),
        },
      ]}
      onAddFilter={onAddOrderFilter}
      defaultOrderKey="id"
    />
  );
}

export default connect(({ userList }: ConnectState) => ({ userList }))(UserListOrderFilterSection);
