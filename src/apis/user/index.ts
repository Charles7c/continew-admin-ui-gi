import http from '@/utils/http'
import { prefix } from '../config'
import type { LoginRes } from '@/apis/auth/type'

/** @desc 登录 */
export function login(data: { username: string; password: string }) {
  return http.post<LoginRes>(`${prefix}/user/login`, data)
}

/** @desc 退出登录 */
export function logout() {
  return http.post(`${prefix}/user/logout`)
}
