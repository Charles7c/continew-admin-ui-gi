import http from '@/utils/http'
import { prefix } from '../config'
import type * as Person from './type'
// import qs from 'qs'

/** @desc 获取人物列表 */
export function getPersonList(data: { name?: string; status?: string; current: number; pageSize: number }) {
  return http.get<PageRes<Person.PersonItem[]>>(`${prefix}/person/list`, data)
}

/** @desc 删除人物 返回删除的ids */
export function deletePerson(data: { ids: string[] }) {
  return http.post<string[]>(`${prefix}/person/delete`, data)
}

/** @desc 获取人物列表, 如果想要以表单数据格式发请求, 可以用以下方式定义接口 */
// export function getPersonListByFormData(data: { current: number; pageSize: number }) {
//   return http.get<ApiRes<PageRes<Person.PersonItem[]>>>(`${prefix}/person/list`, qs.stringify(data), {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   })
// }
