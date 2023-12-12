import http from '@/utils/http'
import { prefix } from '../config'

const BASE_URL = '/system/user'

export interface UserItem {
  id: number
  username?: string
  nickname?: string
  gender?: number
  email?: string
  phone?: string
  description?: string
  status?: number
  isSystem?: boolean
  pwdResetTime?: string
  createUserString?: string
  createTime?: string
  updateUserString?: string
  updateTime?: string
  deptId?: number
  deptName?: string
  roleIds?: Array<number>
  roleNames?: Array<string>
  disabled?: boolean
}

export interface UserListParam {
  username?: string
  status?: number
  createTime?: Array<string>
  page?: number
  size?: number
  sort?: Array<string>
}

/** @desc 获取用户数据 */
export function getSystemUserList(params: UserListParam) {
  return http.get<PageRes<UserItem[]>>(`api${BASE_URL}`, params)
}

/** @desc 获取用户详情 */
export function getSystemUserDetail(params: { id: number }) {
  return http.get<UserItem>(`api${BASE_URL}/${params.id}`, params)
}

/** @desc 保存用户 */
export function saveSystemUser(data: UserItem) {
  return http.post<number>(`api${BASE_URL}`, data)
}
/** @desc 修改用户 */
export function updateSystemUser(data: any) {
  return http.put<number>(`api${BASE_URL}/${data.id}`, data)
}

/** @desc 删除用户 */
export function deleteSystemUser(data: { ids: number[] }) {
  return http.del(`api${BASE_URL}/${data.ids}`)
}
