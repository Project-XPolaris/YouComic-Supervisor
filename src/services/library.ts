import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';
import { Slot } from '@/utils/tag';
import { ListQueryContainer } from '@/services/base';

export interface Library {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  path: string;
}

export const queryLibraryList = async (params: any): Promise<ListQueryContainer<Library>> => {
  return apiRequest.get(ApplicationConfig.api.libraries, { params });
};

export const removeLibrary = async (id: number) => {
  return apiRequest.delete(ApplicationConfig.api.library.replace(':id', String(id)));
};

export const importExternalLibrary = async (path: string) => {
  return apiRequest.post(ApplicationConfig.api.libraryImport, { data: { library_path: path } });
};

export const importDirectoryAsLibrary = async ({ path }: { path: string }) => {
  return apiRequest.post(ApplicationConfig.api.scanTask, { data: { dir_path: path } });
};

export const scanLibraryById = async ({ id }: { id: number }) => {
  return apiRequest.put(ApplicationConfig.api.scanLibrary.replace(':id', String(id)), {});
};

export const matchLibraryById = async ({ id }: { id: number }) => {
  return apiRequest.put(ApplicationConfig.api.matchLibrary.replace(':id', String(id)), {});
};

export const renameLibraryBookDirectory = async ({
  id,
  pattern,
  slots,
}: {
  id: number;
  pattern: string;
  slots: Slot;
}) => {
  return apiRequest.put(
    ApplicationConfig.api.renameLibraryBookDirectory.replace(':id', String(id)),
    {
      data: {
        pattern,
        slots,
      },
    },
  );
};
export const createWriteBookMetaTask = async ({ id }: { id: number }) => {
  return apiRequest.post(ApplicationConfig.api.createWriteBookMetaTask.replace(':id', String(id)), {
    data: {},
  });
};
