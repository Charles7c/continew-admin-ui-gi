export interface StepForm {
  payAccount: string
  recAccount: string
  payType: 1 | 2 // 1:微信 2: 支付宝
  recName: string
  amount: string
}
