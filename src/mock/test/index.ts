import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../_utils'

export default [
  {
    url: '/mock/test/success',
    method: 'get',
    timeout: 350,
    response: () => {
      return resultSuccess('哈哈哈')
    }
  },
  {
    url: '/mock/test/fail',
    method: 'get',
    timeout: 350,
    response: () => {
      return resultError(null, '请求出错了呦~', 400)
    }
  }
] as MockMethod[]
