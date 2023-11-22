import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '@/mock/_utils'
import { menus } from './data/menu'
import type { MockMenuItem } from './data/type'
import { mapTree, findTree } from 'xe-utils'
import { filterTree } from '@/utils'

export default [
  {
    url: '/mock/user/routes',
    method: 'get',
    timeout: 50,
    response: ({ headers }) => {
      const token = headers.token
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const isAdmin = token === 'TOKEN-admin'
        const roles = isAdmin ? ['role_admin'] : ['role_user']
        // 如果是超级管理员角色
        if (roles.includes('role_admin')) {
          const data = filterTree<MockMenuItem>(JSON.parse(JSON.stringify(menus)), (i) => [1, 2].includes(i.type))
          return resultSuccess(data)
        }
        // 如果是普通用户角色
        if (roles.includes('role_user')) {
          const data = filterTree<MockMenuItem>(JSON.parse(JSON.stringify(menus)), (i) => {
            return i.path !== '/system' && i.roles.some((i) => roles.includes(i)) && [1, 2].includes(i.type)
          })
          return resultSuccess(data)
        }
        return resultSuccess([])
      } else {
        return resultError(null, 'token失效', 401)
      }
    }
  },
  {
    url: '/mock/system/menu/detail',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      const { id } = query
      const obj = findTree(menus, (i) => i.id === id)
      if (obj.item) {
        return resultSuccess(obj.item)
      } else {
        return resultError(null, '没有该部门', 400)
      }
    }
  },
  {
    url: '/mock/system/menu/save',
    method: 'post',
    timeout: 350,
    response: () => {
      return resultSuccess(true)
    }
  },
  {
    url: '/mock/system/menu/options',
    method: 'get',
    timeout: 350,
    response: () => {
      const data = mapTree(JSON.parse(JSON.stringify(menus)), (i) => ({
        id: i.id,
        title: i.title,
        children: i.children
      }))
      return resultSuccess(data)
    }
  },
  {
    url: '/mock/system/menu', // 这个短的要放在后面，不然会优先匹配
    method: 'get',
    timeout: 10,
    response: () => {
      return resultSuccess(mapTree(JSON.parse(JSON.stringify(menus)), (i) => ({ ...i })))
    }
  }
] as MockMethod[]
