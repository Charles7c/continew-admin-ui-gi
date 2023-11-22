import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'
import treeData from './tree'

export default [
  {
    url: '/mock/cate/tree',
    method: 'get',
    timeout: Math.floor(Math.random() * 1) * 100,
    response: () => {
      return resultSuccess(treeData)
    }
  }
] as MockMethod[]
