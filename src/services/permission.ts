import apiRequest from "@/utils/request";
import ApplicationConfig from "@/config";

export interface Permission {
  id: number
  name:string
}
export function queryPermissionList({...params}) {
  return apiRequest.get(
    ApplicationConfig.api.permissions,
    {
      params
    }
  )

}
