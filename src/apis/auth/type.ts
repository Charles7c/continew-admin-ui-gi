export interface AccountLoginReq {
  username?: string
  password?: string
  captcha: string
  uuid?: string
}

export interface LoginRes {
  token: string
}
