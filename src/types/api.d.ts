/** 接口返回数据格式 */
interface ApiRes<T> {
  // 是否成功
  success: boolean
  // 状态码
  code: number
  // 状态信息
  msg: string
  // 时间戳
  timestamp: string
  // 返回数据
  data: T
}

/** 分页返回的数据格式 */
interface PageRes<T> {
  // todo 原有保留字段适配完后删除
  records: T
  total: number
  list: T
}
