import http from '@/utils/http'
import { prefix } from '../config'
import type { RoleListParam } from '@/apis/system/role'
import type * as Dict from '@/apis/system/dict'

const CAPTCHA_BASE_URL = '/common/captcha'
const COMMON_BASE_URL = '/common'

export interface ImageCaptchaItem {
  uuid: string
  img: string
}

export function getImageCaptcha() {
  return http.get<ImageCaptchaItem>(`/api${CAPTCHA_BASE_URL}/img`)
}

export function getSystemRoleDict(params: RoleListParam) {
  return http.get<Dict.LabelValueState[]>(`/api${COMMON_BASE_URL}/dict/role`, params)
}
