export interface CateItem {
  id: string
  name: string
  pid: string | null
  type: string | null
  treeType: string | null
  disabled: boolean
  children: CateItem[]
  [propName: string]: any // 一个 interface 中任意属性只能有一个
}
