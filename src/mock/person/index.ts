import { Random } from 'mockjs'
import Mock from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export function doCustomTimes(times: number, callback: any) {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

// 获取兴趣爱好
const getHobbysList = (num: number) => {
  const list = ['篮球', '羽毛球', '足球', '音乐', '电影', '旅行', '高尔夫', '爬山', '游泳', '健身']
  const arr: string[] = []
  while (arr.length < num) {
    const index = Math.floor(Math.random() * list.length)
    if (!arr.includes(list[index])) {
      arr.push(list[index])
    }
  }
  return arr
}

const getTableListData = (params: any) => {
  const data: any[] = []
  for (let i = 0; i < params.pageSize; i++) {
    data.push({
      id: '@integer(10,999999)',
      index: i,
      name: params.name !== '' ? params.name : '@cname()',
      phone: '15578728810',
      startTime: '@datetime',
      endTime: '@datetime',
      createTime: '@datetime',
      address: '@county(true)',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'proportion|1-100': 10,
      'no|100000-10000000': 100000,
      status: params.status != '' ? Number(params.status) : Math.random() > 0.5 ? 1 : 0, // 0或1
      color: Mock.mock('@hex'),
      hobbys: getHobbysList(Math.floor(Math.random() * 9))
    })
  }
  return data
}

export default [
  {
    url: '/mock/person/list',
    method: 'get',
    timeout: 350,
    response: ({ query }) => {
      const { current = 1, pageSize = 10, status = 0, name = '' } = query
      const list = getTableListData({ current, pageSize, status, name })
      return resultSuccess({
        total: 1000,
        records: list
      })
    }
  },
  {
    url: '/mock/person/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  }
] as MockMethod[]
