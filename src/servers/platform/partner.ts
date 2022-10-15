import type { IApiResult } from '#/form'
import type { IServerResult } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/platform/partner',
}

interface IResult {
  id: string;
  name: string;
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getPartner(data?: unknown): Promise<IApiResult[]> {
  return new Promise((resolve, reject) => {
    request.get<IServerResult<IResult[]>>(`${API.URL}`, { params: data }).then(res => {
      const data: IApiResult[] = []

      res?.data?.data.forEach(item => {
        data.push({
          label: item.name,
          value: item.id
        })
      })

      resolve(data)
    }).catch(() => reject([]))
  })
}
