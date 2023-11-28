import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess, resultError } from '../_utils'

export default [
  {
    url: '/mock/user/login',
    method: 'post',
    timeout: 300,
    response: ({ body }) => {
      const { username, password } = body
      if (!username) {
        return resultError(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return resultError(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password === 'admin123') {
        return resultSuccess({
          token: 'TOKEN-admin'
        })
      }
      if (username === 'user' && password === 'admin123') {
        return resultSuccess({
          token: 'TOKEN-user'
        })
      }
      return resultError(null, '账号或者密码错误', 50000)
    }
  },
  {
    url: '/mock/user/logout',
    method: 'post',
    timeout: 300,
    response: () => {
      return resultSuccess(null)
    }
  },
  {
    url: '/mock/user/getUserInfo',
    method: 'get',
    timeout: 10,
    response: ({ headers }) => {
      const token = headers.token
      if (token && ['TOKEN-admin', 'TOKEN-user'].includes(token)) {
        const admin = {
          id: '01',
          nickname: '管理员',
          avatar: 'https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
          roles: ['role_admin'],
          permissions: ['*:*:*']
        }
        const user = {
          id: '02',
          nickname: '木糖醇',
          avatar: 'https://img1.baidu.com/it/u=1817951587,3188870642&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          roles: ['role_user'],
          permissions: ['user:btn:add', 'user:btn:edit', 'user:btn:delete']
        }
        const isAdmin = token === 'TOKEN-admin'
        return resultSuccess(isAdmin ? admin : user)
      } else {
        return resultError(null, 'token失效', 401)
      }
    }
  }
] as MockMethod[]
