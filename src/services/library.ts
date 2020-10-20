import apiRequest from "@/utils/request";
import ApplicationConfig from "@/config";

export interface Library {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  path: string;
}

export const queryLibraryList = async (params: any) => {
  return apiRequest.get(ApplicationConfig.api.libraries, {params})
}

export const removeLibrary = async (id: number) => {
  return apiRequest.delete(ApplicationConfig.api.library.replace(":id", String(id)))
}

export const importExternalLibrary = async (path: string) => {
  return apiRequest.post(ApplicationConfig.api.libraryImport, {data: {"library_path": path}})
}

export const importDirectoryAsLibrary = async ({path}:{path:string}) => {
  return apiRequest.post(ApplicationConfig.api.scanTask, {data: {"dir_path": path}})
}
