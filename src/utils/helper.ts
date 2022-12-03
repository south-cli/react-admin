import type { IAllDataType, IArrayData } from '#/public'

/**
 * 首字母大写
 * @param str - 传入英文字符串
 */
export function firstCapitalize(str: string): string {
  if (!str || typeof str !== 'string') return ''
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

/**
 * 金额格式化3000->3,000
 * @param amount - 金额
 */
export function amountFormatter(amount: number) {
  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 获取url中参数某个值
 * @param search - url参数
 * @param key - 搜索值
 */
export function getUrlParam(search: string, key: string) {
  if (!search || !key) return ''
  // 去除首个字符串问号
  if (search?.[0] === '?') search = search.substring(1, search.length)

  const arr = search.split('&') // 分割数组
  const pairArr: [string, string][] = []

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]?.split('=')
    if (value?.length === 2) {
      pairArr.push([value[0], value[1]])
    }
  }

  for (let i = 0; i < pairArr.length; i++) {
    if (pairArr[0][0] === key) {
      return pairArr[0][1]
    }
  }

  return ''
}

/**
 * 过滤空数据
 * @param obj - 传入对象
 */
type IEmptyData = Record<string, IAllDataType>
export function filterEmptyValue(obj: IEmptyData): IEmptyData {
  const res: IEmptyData = {}

  for (let key in obj) {
    // 去除key中多余的空格
    key = key.trim()

    // undefined过滤
    if (obj[key] === undefined) continue

    // null过滤
    if (obj[key] === null) continue

    // 空数组过滤
    if (
      obj[key]?.constructor === Array &&
      (obj[key] as IArrayData).length === 0
    ) continue

    // 空字符串过滤
    if (
      obj[key]?.constructor === String &&
      (obj[key] as string).length === 0
    ) continue

    // 空对象过滤
    if (
      obj[key]?.constructor === Object &&
      Object.keys(obj[key] as object).length === 0
    ) continue

    // 去除字符串多余空格
    if (obj[key]?.constructor === String) {
      res[key] = (obj[key] as string).trim()
    } else {
      res[key] = obj[key]
    }
  }

  return res
}

/**
 * 递归数据
 * @param data - 数据源
 */
interface IRecursiveChildren<T> { children?: T[] }
export function recursiveData<T extends IRecursiveChildren<T>, U>(
  data: T[],
  callback: (data: T) => U
): U[] {
  if (data. length === 0) return []
  const res: U[] = []

  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const filterData = callback(element)
    const children = element.children ? recursiveData(element.children, callback) : undefined
    res.push({ ...filterData, children })
  }

  return res
}