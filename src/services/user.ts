import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';

export interface UserAuth {
  id: number
  sign: number
}

export interface User {
  id: number
  username:string
  nickname: string
  avatar: string
}

export interface UserGroup {
  id: number
  name: string
}

export function getAuth({username, password}: { username: string, password: string }) {
  return apiRequest.post(
    ApplicationConfig.api.auth, {
      data: {username, password},
    },
  );
}

export function getUser({id}: { id: number }) {
  return apiRequest.get(
    ApplicationConfig.api.user.replace(':id', String(id)),
  );
}

export function getUserUserGroups({id}: { id: number }) {
  return apiRequest.get(
    ApplicationConfig.api.userUserGroups.replace(':id', String(id)),
  );
}

export function queryUserList({...params}) {
  return apiRequest.get(
    ApplicationConfig.api.users,
    {
      params
    }
  )

}
