import type { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'
import fileList from './data'

const getList = (type: number | string) => {
  if (Number(type) === 0) return fileList
  const res: any[] = []
  const FileMap = {
    1: ['jpg', 'png', 'jpeg'],
    2: ['text', 'doc', 'xls'],
    3: ['mp4'],
    4: ['mp3'],
    5: ['zip', 'rar', 'ppt', 'css', 'js', 'html']
  }
  const arr = FileMap[type as keyof typeof FileMap] || []
  arr.forEach((item) => {
    const data = fileList.filter((i) => i.extendName === item)
    res.push(...data)
  })
  return res
}

export default [
  {
    url: '/mock/file/list',
    method: 'get',
    timeout: Math.floor(Math.random() * 3) * 100,
    response: ({ query }) => {
      const { fileType } = query
      const list = getList(fileType)
      return resultSuccess({
        total: list.length,
        records: list
      })
    }
  }
] as MockMethod[]
