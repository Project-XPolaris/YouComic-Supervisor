import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';

export interface Page {
  id: number;
  created_at: Date;
  order: number;
  book_id: number;
  path: string;
}

export function queryPages({book, page, pageSize, order}: { book: string | number, page: number, pageSize: number, order: number }) {
  return apiRequest(
    ApplicationConfig.api.PagesURL, {
      params: {
        book,
        page,
        page_size: pageSize,
        order
      },
    },
  );
}

export function pagesBatch(data: any) {
  return apiRequest.post(
    ApplicationConfig.api.pageBatch,
    {
      data
    }
  )
}
