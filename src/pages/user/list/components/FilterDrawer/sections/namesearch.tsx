import React from 'react';
import SearchNameFilterSection from '@/components/FilterSection/SearchNameFilterSection';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { updateQueryParamAndReplaceURL } from '@/utils/uri';
import {useIntl} from "@@/plugin-locale/localeExports";

interface UserListNameSearchSectionFilterPropsType {}

function UserListNameSearchSectionFilter({}: UserListNameSearchSectionFilterPropsType) {
  const intl = useIntl()
  const onSetSearchName = (nameSearch: string) => {
    updateQueryParamAndReplaceURL({
      nameSearch,
    });
  };
  return (
    <>
      <SearchNameFilterSection onSetSearchName={onSetSearchName} title={intl.formatMessage({id: 'global.filter.filter-name-search.title'})} />
    </>
  );
}
export default connect(({ userList }: ConnectState) => ({ userList }))(
  UserListNameSearchSectionFilter,
);
