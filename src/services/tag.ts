import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';

export interface Tag {
  id: number;
  created_at: Date;
  name: string;
  type: string;
}


export function queryTagBooks({page, pageSize, id}: { page?: number, pageSize?: number, id: number }) {
  return apiRequest(
    ApplicationConfig.api.TagBooksURL.replace(':id', String(id)),
    {
      params: {
        page,
        page_size: pageSize,
      },
    },
  );
}


export function queryTags({...query}) {
  return apiRequest.get(
    ApplicationConfig.api.tags,
    {
      params: query,
    },
  );
}

export function createTag(data: { name: string, type: string }) {
  return apiRequest.post(
    ApplicationConfig.api.tags,
    {
      data
    }
  )
}

export function tagBatch(data) {
  return apiRequest(
    ApplicationConfig.api.tagBatch, {
      method: "post",
      data
    }
  )
}

export function addBooksToTag({tagId, bookIds}) {
  return apiRequest(
    ApplicationConfig.api.TagBooksURL.replace(':id', String(tagId)),
    {
      method: "put",
      data: {
        books: bookIds
      }
    }
  )
}

export function removeBooksFromTag({tagId,bookIds}) {
  return apiRequest(
    ApplicationConfig.api.TagBooksURL.replace(':id', String(tagId)),
    {
      method: "delete",
      data: {
        books: bookIds
      }
    }
  )
}
