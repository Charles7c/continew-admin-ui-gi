import http from '@/utils/http'
import { prefix } from '../config'
import type * as File from './type'

/** @desc 获取文件列表 */
export function getFileList(params: { fileType: string | number }) {
  return http.get<PageRes<File.FileItem[]>>(`${prefix}/file/list`, params)
}
