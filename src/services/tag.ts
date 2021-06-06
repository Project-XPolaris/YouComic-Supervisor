import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';
import {ListQueryContainer} from "@/services/base";

export interface Tag {
  id: number;
  created_at: Date;
  name: string;
  type: string;
}

export interface TagCount {
  name: string
  total: number
}

export interface MatchTag {
  id:string
  name: string
  type: string
  source: 'raw' | 'pattern' | 'database' | 'custom'
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

export function tagBatch(data: any) {
  return apiRequest(
    ApplicationConfig.api.tagBatch, {
      method: "post",
      data
    }
  )
}

export function addBooksToTag({tagId, bookIds}: { tagId: number, bookIds: number }) {
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

export function removeBooksFromTag({tagId, bookIds}: { tagId: number, bookIds: number }) {
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

export async function getTagCount(queryParam: any): Promise<ListQueryContainer<TagCount>> {
  return apiRequest(
    ApplicationConfig.api.tagBooksCount,
    {
      method: "get",
      params: queryParam
    }
  )
}

export const addTagBooksToTag = ({from, to}: { from: number, to: number }) => {
  return apiRequest.post(ApplicationConfig.api.tagBooksAddToTag, {
    data: {
      from, to
    }
  })
}

export const matchTagFromRawString = ({text}: { text: string }):Promise<MatchTag[]> => {
  return apiRequest.post(ApplicationConfig.api.matchRawTag, {
    data: {
      text
    }
  })
}

export const cleanEmptyTag = ():Promise<any> => {
  return apiRequest.post(ApplicationConfig.api.clearEmptyTag, {})
}
