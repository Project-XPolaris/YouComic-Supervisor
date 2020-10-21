import { Reducer } from '@@/plugin-dva/connect';
import { updateQueryParamAndReplaceURL } from '@/utils/uri';

export interface PaginationModule<> {
  data: any;
  reducers: { [key: string]: Reducer };
  getData: (state: any) => any;
  onPageChange: (newPage: number, newPageSize: number) => void;
  setPageFromUrl: (location: any, dispatch: any) => void;
}

export function createPaginationModule({
  dataName,
  defaultPage = 1,
  defaultPageSize = 20,
}: {
  dataName: string;
  defaultPage?: number;
  defaultPageSize?: number;
}): PaginationModule {
  const pageKey = `${dataName}Page`;
  const pageSizeKey = `${dataName}PageSize`;
  return {
    setPageFromUrl: (location, dispatch) => {
      const { page = defaultPage, pageSize = defaultPageSize } = location.query;
      dispatch({
        type: `${dataName}PageChange`,
        payload: {
          page: Number(page),
          pageSize: Number(pageSize),
        },
      });
    },
    onPageChange: (newPage, newPageSize) => {
      updateQueryParamAndReplaceURL({ page: newPage, pageSize: newPageSize });
    },
    getData: state => {
      return {
        [pageKey]: state[pageKey],
        [pageSizeKey]: state[pageSizeKey],
      };
    },
    data: {
      [pageKey]: defaultPage,
      [pageSizeKey]: defaultPageSize,
    },
    reducers: {
      [`${dataName}PageChange`](state: any, { payload: { page, pageSize } }) {
        return {
          ...state,
          [pageKey]: page,
          [pageSizeKey]: pageSize,
        };
      },
    },
  };
}
