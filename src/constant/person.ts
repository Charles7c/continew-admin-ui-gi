type SubmitStatusItem = { name: string; value: number; color: string }
/** @desc 指标提交状态 */
export const SubmitStatusList: SubmitStatusItem[] = [
  { name: '待提交', value: 0, color: 'orange' },
  { name: '已提交', value: 1, color: 'green' }
]

type StatusItem = { name: string; value: number; color: string }
/** @desc 指标启用状态 */
export const StatusList: StatusItem[] = [
  { name: '禁用', value: 0, color: 'red' },
  { name: '启用', value: 1, color: 'green' }
]
