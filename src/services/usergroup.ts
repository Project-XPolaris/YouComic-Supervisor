import apiRequest from "@/utils/request";
import ApplicationConfig from "@/config";

export interface UserGroup {
  id: number
  name: string
}

export function queryUserGroupList({...params}) {
  return apiRequest.get(
    ApplicationConfig.api.userGroups,
    {
      params
    }
  )

}

export function createUserGroup({name}: { name: string }) {
  return apiRequest.post(
    ApplicationConfig.api.userGroups,
    {
      data: {
        name
      }
    }
  )
}

export function addUserToUserGroup({userGroupId, userIds}: { userGroupId: number, userIds: number[] }) {
  return apiRequest.put(
    ApplicationConfig.api.userGroupUsers.replace(":id", String(userGroupId)),
    {
      data: {
        userIds
      }
    }
  )
}

export function addPermissionsToUserGroup({userGroupId, permissionIds}: { userGroupId: number, permissionIds: number[] }) {
  return apiRequest.put(
    ApplicationConfig.api.userGroupPermissions.replace(":id", String(userGroupId)),
    {
      data: {
        permissionIds
      }
    }
  )
}

export function removeUserFromUserGroup({userGroupId, userIds}: { userGroupId: number, userIds: number[] }) {
  return apiRequest.delete(
    ApplicationConfig.api.userGroupUsers.replace(":id", String(userGroupId)),
    {
      data: {
        userIds
      }
    }
  )
}

export function removePermissionFromUserGroup({userGroupId, permissionIds}: { userGroupId: number, permissionIds: number[] }) {
  return apiRequest.delete(
    ApplicationConfig.api.userGroupPermissions.replace(":id", String(userGroupId)),
    {
      data: {
        permissionIds
      }
    }
  )
}
