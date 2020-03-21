import React from 'react';
import SearchNameFilterSection from '@/components/FilterSection/SearchNameFilterSection';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { updateQueryParamAndReplaceURL } from '@/utils/uri';

interface UserListNameSearchSectionFilterPropsType {}

function UserListNameSearchSectionFilter({}: UserListNameSearchSectionFilterPropsType) {
  const onSetSearchName = (nameSearch: string) => {
    updateQueryParamAndReplaceURL({
      nameSearch,
    });
  };
  return (
    <>
      <SearchNameFilterSection onSetSearchName={onSetSearchName} />
    </>
  );
}
export default connect(({ userList }: ConnectState) => ({ userList }))(
  UserListNameSearchSectionFilter,
);
