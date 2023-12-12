import http from '@/utils/http'
import { prefix } from '../config'
import type * as System from './type'

const BASE_URL = '/system/dept'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<System.DeptItem[]>(`api${BASE_URL}/tree`)
}

/** @desc 获取部门详情 */
export function getSystemDeptDetil(params: { id: string }) {
  return http.get<System.DeptItem>(`${prefix}/system/dept/detail`, params)
}

/** @desc 保存部门 */
export function saveSystemDept(data: any) {
  return http.post<boolean>(`${prefix}/system/dept/save`, data)
}
