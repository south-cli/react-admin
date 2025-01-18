import type { LoginResult } from '@/pages/login/model';
import { request } from '@/utils/request';

/**
 * 权限
 * @param data - 请求数据
 */
export function getPermissions(data: object) {
  return request.get<LoginResult>(
    '/authority/user/refresh-permissions/v2',
    { params: data }
  );
}
