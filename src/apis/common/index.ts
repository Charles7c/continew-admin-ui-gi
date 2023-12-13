import http from '@/utils/http'
import { prefix } from '../config'
import type { TreeNodeData } from '@arco-design/web-vue'
import type * as Role from '@/apis/system/role'
import type * as Dict from '@/apis/system/dict'
import type * as Dept from '@/apis/system/dept'

const CAPTCHA_BASE_URL = '/common/captcha'
const COMMON_BASE_URL = '/common'

export interface ImageCaptchaItem {
  uuid: string
  img: string
}

export function listDeptTree(params: Dept.DeptListParam) {
  return http.get<TreeNodeData[]>(`/api${COMMON_BASE_URL}/tree/dept`, params);
}

export function getImageCaptcha() {
  return http.get<ImageCaptchaItem>(`/api${CAPTCHA_BASE_URL}/img`)
}

export function getSystemRoleDict(params: Role.RoleListParam) {
  return http.get<Dict.LabelValueState[]>(`/api${COMMON_BASE_URL}/dict/role`, params)
}
