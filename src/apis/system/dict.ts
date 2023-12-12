import http from '@/utils/http'
import { prefix } from '../config'
import type * as System from './type'

export interface LabelValueState {
  label: string
  value: any
  color?: string
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

/** @desc 字典数据详情 */
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
