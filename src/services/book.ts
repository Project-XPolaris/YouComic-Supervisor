import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';
import { Tag } from '@/services/tag';
import {Slot} from "@/utils/tag";

export interface Book {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  cover: string;
  tags: Tag[];
  dirName: string;
}

interface GetBookQuery {
  name?: string[] | string;
  id?: number | number[] | string | string[];
  nameSearch: string;
}

export function queryBooks(query: GetBookQuery) {
  return apiRequest.get(ApplicationConfig.api.BooksURL, {
    params: query,
  });
}

export function queryBookTags({ id }: { id: number }) {
  return apiRequest.get(ApplicationConfig.api.BookTagsURL.replace(':id', String(id)));
}

export function updateBook({ id, update }: { id: number; update: { name?: string } }) {
  return apiRequest(ApplicationConfig.api.Book.replace(':id', String(id)), {
    method: 'patch',
    data: update,
  });
}

export function addTagToBook({ id, tags }: { id: number; tags: number[] }) {
  return apiRequest(ApplicationConfig.api.BookTagsURL.replace(':id', String(id)), {
    method: 'put',
    data: {
      tags,
    },
  });
}

export function removeTagFromBook({ id, tagId }: { id: number; tagId: number }) {
  return apiRequest(
    ApplicationConfig.api.BookTagURL.replace(':id', String(id)).replace(':tag', String(tagId)),
    {
      method: 'delete',
    },
  );
}

export function DeleteBook({ id, permanently }: { id: number; permanently: string }) {
  return apiRequest(ApplicationConfig.api.Book.replace(':id', String(id)), {
    method: 'delete',
    params: {
      permanently,
    },
  });
}

export const bookBatch = ({ data }: { data: any }) =>
  apiRequest(ApplicationConfig.api.bookBatch, {
    method: 'post',
    data,
  });
export const renameBoolDirectory = ({ id, pattern,slots }: { id: number; pattern: string, slots:Slot }) =>
  apiRequest(ApplicationConfig.api.bookDirectory.replace(':id', String(id)), {
    method: 'put',
    data: {
      pattern,
      slots
    },
  });
