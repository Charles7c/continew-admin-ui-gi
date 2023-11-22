import http from '@/utils/http'
import { prefix } from '../config'
import type * as Cate from './type'

/** @desc 获取分类树 */
export function getCateTreeData() {
  return http.get<Cate.CateItem[]>(`${prefix}/cate/tree`)
}
