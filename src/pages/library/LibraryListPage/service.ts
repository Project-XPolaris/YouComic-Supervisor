import { importExternalLibrary, queryLibraryList, removeLibrary } from '@/services/library';

export async function queryBookLibrary(params: any) {
  return queryLibraryList(params);
}

export async function removeBookLibrary({ id }: { id: number }) {
  return removeLibrary(id);
}

export async function importExternalBookLibrary({ path }: { path: string }) {
  return importExternalLibrary(path);
}
