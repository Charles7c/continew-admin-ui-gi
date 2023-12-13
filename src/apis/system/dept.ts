import http from '@/utils/http'
import { prefix } from '../config'

const BASE_URL = '/system/dept'

export interface DeptItem {
  id: number
  name?: string
  parentId?: number
  description?: string
  sort?: number
  status?: number
  isSystem?: boolean
  createUserString?: string
  createTime?: string
  updateUserString?: string
  updateTime?: string
  children?: Array<DeptItem>
  parentName?: string
  disabled?: boolean
}

export interface DeptListParam {
  name?: string
  status?: number
}

/** @desc 获取部门数据 */
export function getSystemDeptList(params?: DeptListParam) {
  return http.get<DeptItem[]>(`/api${BASE_URL}/tree`, params)
}

/** @desc 获取部门详情 */
export function getSystemDeptDetil(params: { id: number }) {
  return http.get<DeptItem>(`/api${BASE_URL}/${params.id}`, params)
}

/** @desc 保存部门 */
export function saveSystemDept(data: DeptItem) {
  return http.post<boolean>(`/api${BASE_URL}`, data)
}

/** @desc 修改部门 */
export function updateSystemDept(data: DeptItem) {
  return http.put<boolean>(`/api${BASE_URL}/${data.id}`, data)
}
/** @desc 删除部门 */
export function deleteSystemDept(data: { ids: number[] }) {
  return http.del(`/api${BASE_URL}/${data.ids}`)
}