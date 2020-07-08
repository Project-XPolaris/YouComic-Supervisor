import apiRequest from "@/utils/request";
import ApplicationConfig from "@/config";

export interface BookDailyCount {
  date: string
  total: number
}
export interface TagTypeCount {
  name : string
  total : number
}
export async function getBookDailyCount(query: any) {
  return apiRequest(
    ApplicationConfig.api.bookDailyCount,
    {
      method: "get",
      params: query
    }
  )
}

export async function getTagTypeCount(query: any) {
  return apiRequest(
    ApplicationConfig.api.tagTypeCount,
    {
      method: "get",
      params: query
    }
  )
}
