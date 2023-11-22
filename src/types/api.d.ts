/** 接口返回数据格式 */
interface ApiRes<T> {
  code: number
  data: T
  message: string
  success: boolean
}

/** 分页返回的数据格式 */
interface PageRes<T> {
  records: T
  total: number
}
