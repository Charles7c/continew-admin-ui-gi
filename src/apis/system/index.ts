import http from '@/utils/http'
import { prefix } from '../config'
import type * as System from './type'

/** @desc 获取部门数据 */
export function getSystemDeptList() {
  return http.get<System.DeptItem[]>(`${prefix}/system/dept`)
}

/** @desc 获取部门详情 */
export function getSystemDeptDetil(params: { id: string }) {
  return http.get<System.DeptItem>(`${prefix}/system/dept/detail`, params)
}

/** @desc 保存部门 */
export function saveSystemDept(data: any) {
  return http.post<boolean>(`${prefix}/system/dept/save`, data)
}

/** @desc 获取角色数据 */
export function getSystemRoleList(params: { current: number; pageSize: number }) {
  return http.get<PageRes<System.RoleItem[]>>(`${prefix}/system/role`, params)
}

/** @desc 获取角色详情 */
export function getSystemRoleDetail(params: { id: string }) {
  return http.get<System.RoleItem>(`${prefix}/system/role/detail`, params)
}

/** @desc 保存角色 */
export function saveSystemRole(data: any) {
  return http.post<boolean>(`${prefix}/system/role/save`, data)
}

/** @desc 删除角色 */
export function deleteSystemRole(data: { ids: string[] }) {
  return http.post<string[]>(`${prefix}/system/role/delete`, data)
}

/** @desc 获取角色权限 */
export function getSystemRoleMenuIds(params: { role: string }) {
  return http.get<string[]>(`${prefix}/system/role/menuIds`, params)
}

/** @desc 获取用户数据 */
export function getSystemUserList(params: { current: number; pageSize: number }) {
  return http.get<PageRes<System.UserItem[]>>(`${prefix}/system/user`, params)
}

/** @desc 获取用户详情 */
export function getSystemUserDetail(params: { id: string }) {
  return http.get<System.UserDetailResult>(`${prefix}/system/user/detail`, params)
}

/** @desc 保存用户 */
export function saveSystemUser(data: any) {
  return http.post<boolean>(`${prefix}/system/user/save`, data)
}

/** @desc 删除用户 */
export function deleteSystemUser(data: { ids: string[] }) {
  return http.post<string[]>(`${prefix}/system/user/delete`, data)
}

/** @desc 获取菜单数据 */
export function getSystemMenuList() {
  return http.get<System.MenuItem[]>(`${prefix}/system/menu`)
}

/** @desc 获取菜单详情 */
export function getSystemMenuDetail(params: { id: string }) {
  return http.get<System.MenuItem>(`${prefix}/system/menu/detail`, params)
}

/** @desc 保存菜单 */
export function saveSystemMenu(data: any) {
  return http.post<boolean>(`${prefix}/system/menu/save`, data)
}

/** @desc 获取角色分配权限菜单树 */
export function getSystemMenuOptions() {
  return http.get<System.MenuOptionsItem[]>(`${prefix}/system/menu/options`)
}

/** @desc 获取动态路由数据 */
export function getSystemAsyncRoutes() {
  return http.get<any[]>(`${prefix}/system/menu/routes`)
}

/** @desc 获取字典数据 */
export function getSystemDictList(params: { current: number; pageSize: number }) {
  return http.get<PageRes<System.DictItem[]>>(`${prefix}/system/dict`, params)
}

/** @desc 获取字典详情 */
export function getSystemDictDetail(params: { id: string }) {
  return http.get<System.DictDetailResult>(`${prefix}/system/dict/detail`, params)
}

/** @desc 保存字典 */
export function saveSystemDict(data: any) {
  return http.post<boolean>(`${prefix}/system/dict/save`, data)
}

/** @desc 删除字典 */
export function deleteSystemDict(data: { ids: string[] }) {
  return http.post<string[]>(`${prefix}/system/dict/delete`, data)
}

/** @desc 字典数据列表 */
export function getSystemDictDataList(params: { current: number; pageSize: number; code: string }) {
  return http.get<PageRes<System.DictDataItem[]>>(`${prefix}/system/dict/dataList`, params)
}

export function getSystemDictDataDetail(params: { id: string; code: string }) {
  return http.get<System.DictDataItem>(`${prefix}/system/dict/dataDetail`, params)
}

/** @desc 删除字典数据 */
export function deleteSystemDictData(params: { ids: string[]; code: string }) {
  return http.post<string[]>(`${prefix}/system/dict/dataDelete`, params)
}

/** @desc 保存字典数据 */
export function saveSystemDictData(data: any) {
  return http.post<boolean>(`${prefix}/system/dict/dataSave`, data)
}
