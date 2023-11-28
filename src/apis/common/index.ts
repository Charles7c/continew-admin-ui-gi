import http from '@/utils/http'
import { prefix } from '../config'
import type * as ImageItem from './type'

const BASE_URL = '/common/captcha'

export function getImageCaptcha() {
  return http.get<ImageItem.ImageCaptchaItem>(`/api${BASE_URL}/img`)
}
