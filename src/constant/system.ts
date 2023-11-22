export type Status = 0 | 1
export type IStatusMapData = { label: string; value: Status; color: 'green' | 'red' }[]
export const StatusMapData: IStatusMapData = [
  { label: '正常', value: 1, color: 'green' },
  { label: '禁用', value: 0, color: 'red' }
]

export type Gender = 1 | 2
export const GenderMap = { 1: '男', 2: '女' }
