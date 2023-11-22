export interface UserInfo {
  id: string
  nickname: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export interface LoginRes {
  token: string
}
