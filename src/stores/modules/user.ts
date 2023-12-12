import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { resetRouter } from '@/router'
import {
  accountLogin as accountLoginApi,
  login as loginApi,
  logout as logoutApi,
  getUserInfo as getUserInfoApi,
  getImageCaptcha as getImageCaptchaApi
} from '@/apis'
import type { UserInfo } from '@/apis'
import { setToken, clearToken, getToken } from '@/utils/auth'
import { resetHasRouteFlag } from '@/router/permission'

const storeSetup = () => {
  const userInfo = reactive<Pick<UserInfo, 'nickname' | 'avatar'>>({
    nickname: '',
    avatar: ''
  })
  const name = computed(() => userInfo.nickname)
  const avatar = computed(() => userInfo.avatar)

  const token = ref(getToken() || '')
  const roles = ref<string[]>([]) // 当前用户角色
  const permissions = ref<string[]>([]) // 当前角色权限标识集合

  // 重置token
  const resetToken = () => {
    token.value = ''
    clearToken()
    resetHasRouteFlag()
  }

  // 登录
  const login = async (params: any) => {
    const accountLoginRes = await accountLoginApi(params)
    setToken(accountLoginRes.data.token)
    token.value = accountLoginRes.data.token
  }

  // 退出
  const logout = async () => {
    try {
      await logoutApi()
      token.value = ''
      roles.value = []
      permissions.value = []
      resetToken()
      resetRouter()
      return true
    } catch (error) {
      return false
    }
  }

  // 获取用户信息
  const getInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.nickname = res.data.nickname
    userInfo.avatar = res.data.avatar
    if (res.data.roles && res.data.roles.length) {
      roles.value = res.data.roles
      permissions.value = res.data.permissions
    }
  }

  // 模拟用 临时模拟token过期
  const editToken = (value: string) => {
    token.value = value
    setToken(token.value)
  }

  // 获取图片验证码
  const getImageCaptcha = () => {
    return getImageCaptchaApi()
  }

  return {
    userInfo,
    name,
    avatar,
    token,
    roles,
    permissions,
    login,
    logout,
    getInfo,
    resetToken,
    editToken,
    getImageCaptcha
  }
}

export const useUserStore = defineStore('user', storeSetup, {
  persist: { paths: ['token', 'roles', 'permissions'], storage: localStorage }
})
