import React from 'react';
import { connect, Dispatch } from 'dva';
import FilterDrawer from '@/components/FilterDrawer';
import { ConnectState } from '@/models/connect';
import { DialogStateType } from '@/models/dialog';
import UserListOrderFilterSection from '@/pages/user/list/components/FilterDrawer/sections/order';
import FilterTagCollection, { FilterTag } from '@/components/FilterSection/FilterTagCollection';
import { UserFilter, UserListModelStateType } from '@/pages/user/list/model';
import { encodeOrderToUrl, updateQueryParamAndReplaceURL } from '@/utils/uri';
// @ts-ignore
import { formatMessage } from 'umi/locale';
import UserListNameSearchSectionFilter from '@/pages/user/list/components/FilterDrawer/sections/namesearch';

export const UserListFilterDrawerKey = 'userList/filterDrawer';
interface UserListFilterDrawerPropsType {
  dispatch: Dispatch;
  dialog: DialogStateType;
  userList: UserListModelStateType;
}
const orderKeyTitleMapping = {
  id: formatMessage({ id: 'userList.filter.order.id.title' }),
  username: formatMessage({ id: 'userList.filter.order.username.title' }),
  create_at: formatMessage({ id: 'userList.filter.order.create_at.title' }),
};
function UserListFilterDrawer({
  dispatch,
  dialog: { dialogs },
  userList: { filter },
}: UserListFilterDrawerPropsType) {
  const onCloseDrawer = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: UserListFilterDrawerKey,
        isActive: false,
      },
    });
  };
  const renderFilterTag = () => {
    const updateFilter = (newFilter: UserFilter) => {
      updateQueryParamAndReplaceURL({
        order: encodeOrderToUrl(newFilter.orders),
      });
    };
    const filterTags: FilterTag[] = [];
    filter.orders.forEach(item => {
      filterTags.push({
        key: `order_${item.orderKey}`,
        text: `${orderKeyTitleMapping[item.orderKey]} ${
          item.order === 'desc'
            ? formatMessage({ id: 'global.order.desc' })
            : formatMessage({ id: 'global.order.asc' })
        }`,
        data: item,
        onRemove: data => {
          updateFilter({
            ...filter,
            orders: filter.orders.filter(activeOrder => activeOrder.orderKey !== data.orderKey),
          });
        },
      });
    });
    if (filter.nameSearch) {
      filterTags.push({
        key: `nameSearch`,
        text: `${formatMessage({ id: 'global.order.desc' })} `,
        data: filter.nameSearch,
        onRemove: () => {
          updateFilter({
            ...filter,
            nameSearch: undefined,
          });
        },
      });
    }
    return filterTags;
  };
  return (
    <FilterDrawer
      isOpen={Boolean(dialogs[UserListFilterDrawerKey])}
      onClose={onCloseDrawer}
      filterSections={[
        <FilterTagCollection tags={renderFilterTag()} key={1} />,
        <UserListOrderFilterSection key={2} />,
        <UserListNameSearchSectionFilter key={3} />,
      ]}
    />
  );
}

export default connect(({ dialog, userList }: ConnectState) => ({ dialog, userList }))(
  UserListFilterDrawer,
);
