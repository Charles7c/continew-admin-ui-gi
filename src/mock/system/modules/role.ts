import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'
import { menus } from './data/menu'
import { eachTree } from 'xe-utils'

const data = [
  {
    id: '01',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: true,
    name: '超级管理员',
    code: 'role_admin',
    sort: 1,
    status: 1,
    type: 1,
    description: '系统初始角色'
  },
  {
    id: '02',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: false,
    name: '普通用户',
    code: 'role_user',
    sort: 2,
    status: 1,
    type: 2,
    description: '普通用户，无系统管理权限，系统管理菜单无权访问'
  },
  {
    id: '03',
    createUserString: '超级管理员',
    createTime: '2023-09-05 23:24:40',
    disabled: false,
    name: '普通用户2',
    code: 'role_user2',
    sort: 3,
    status: 0,
    type: 2,
    description: '禁用状态'
  }
]

export default [
  {
    url: '/mock/system/role/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const index = data.findIndex((i) => i.id === id)
      if (index >= 0) {
        return resultSuccess(data[index])
      } else {
        return resultError(null, '没有该角色', 400)
      }
    }
  },
  {
    url: '/mock/system/role/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/role/delete',
    method: 'post',
    timeout: 350,
    response: ({ body }) => {
      const { ids } = body
      return resultSuccess(ids)
    }
  },
  {
    url: '/mock/system/role/menuIds',
    method: 'get',
    timeout: 350,
    response: ({ query }) => {
      const { role } = query
      if (role === 'role_user') {
        const arr: string[] = []
        eachTree(JSON.parse(JSON.stringify(menus)), (i) => {
          if (!['08101', '0810204', '0810205', '0810206'].includes(i.id) && !i.path.startsWith('/system')) {
            arr.push(i.id)
          }
        })
        return resultSuccess(arr)
      }
      if (role === 'role_user2') {
        return resultSuccess([])
      }
    }
  },
  {
    url: '/mock/system/role', // 这个短的要放在后面，不然会优先匹配
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
