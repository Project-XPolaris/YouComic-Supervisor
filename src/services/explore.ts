import apiRequest from "@/utils/request";
import ApplicationConfig from "@/config";

export type  FileItemType = "Directory" | "File"

export interface FileItem {
  name: string
  path: string
  type: FileItemType
  ext: string
}

export const readDir = ({target}: { target: string }): Promise<{
  items: FileItem[]
  sep: string
  back: string
}> => {
  return apiRequest.get(ApplicationConfig.api.readDir, {
    params: {
      target
    }
  })
}
