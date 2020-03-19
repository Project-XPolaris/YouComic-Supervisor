import apiRequest from '@/utils/request';
import ApplicationConfig from '@/config';

export function changeUserNickname({ nickname }: { nickname: string }) {
  return apiRequest(ApplicationConfig.api.userNickname, {
    method: 'put',
    data: {
      nickname,
    },
  });
}

export function changeUserPassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  return apiRequest(ApplicationConfig.api.userPassword, {
    method: 'put',
    data: {
      oldPassword,
      newPassword,
    },
  });
}
