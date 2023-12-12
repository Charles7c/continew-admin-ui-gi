import http from '@/utils/http'
import { prefix } from '../config'
import type * as auth from './type'
import type { UserInfo } from '@/apis'
import type { MenuItem } from '@/apis/system/type'

const BASE_URL = '/auth'

/** @desc 用户登录 */
export function accountLogin(req: auth.AccountLoginReq) {
  return http.post<auth.LoginRes>(`/api${BASE_URL}/account`, req)
}

/** @desc 获取用户信息 */
export const getUserInfo = () => {
  // return http.get<UserInfo>(`api${BASE_URL}/user/info`)
  return http.get<UserInfo>(`${prefix}/user/getUserInfo`)
}

/** @desc 获取用户路由信息 */
export const getUserAsyncRoutes = () => {
  // return http.get<MenuItem[]>(`api${BASE_URL}/menu`)
  return http.get<MenuItem[]>(`${prefix}/user/routes`)
}
