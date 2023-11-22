import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'

const data = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:00:00',
    disabled: true,
    username: 'admin',
    nickname: '管理员',
    gender: 1,
    avatar: 'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
    email: '326010228@qq.com',
    phone: '19900006962',
    status: 1,
    type: 1,
    description: '系统初始用户',
    roleIds: ['role_admin'],
    roleNames: '超级管理员',
    deptId: '01',
    deptName: 'XXX科技有限公司'
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:00:00',
    disabled: false,
    username: 'user',
    nickname: '木糖醇',
    gender: 2,
    avatar: 'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    email: '15500008810@qq.com',
    phone: '15500008810',
    status: 1,
    type: 2,
    description: '无法访问系统管理菜单',
    roleIds: ['role_user'],
    roleNames: '普通用户',
    deptId: '01010101',
    deptName: '研发一组'
  }
]

export default [
  {
    url: '/mock/system/user/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const index = data.findIndex((i) => i.id === id)
      if (index >= 0) {
        if (data[index].id === '01') {
          return resultSuccess(data[index])
        }
        if (data[index].id === '02') {
          return resultSuccess(data[index])
        }
      } else {
        return resultError(null, '没有该用户', 400)
      }
    }
  },
  {
    url: '/mock/system/user/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/user/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  },
  {
    url: '/mock/system/user', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 100,
    response: () => {
      return resultSuccess({
        total: data.length,
        records: data
      })
    }
  }
] as MockMethod[]
