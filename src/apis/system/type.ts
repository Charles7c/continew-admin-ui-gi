/** 系统菜单类型 */
export interface MenuItem {
  activeMenu: string
  alwaysShow: boolean
  breadcrumb: boolean
  children: MenuItem[]
  component: string
  hidden: boolean
  icon: string
  id: string
  keepAlive: boolean
  parentId: string
  path: string
  permission: string
  redirect: string
  roles: string[]
  showInTabs: boolean
  sort: number
  status: 0 | 1
  svgIcon: string
  title: string
  type: 1 | 2
  affix: boolean
}

export interface MenuOptionsItem {
  id: string
  title: string
  children: MenuOptionsItem[]
}

export interface DictItem {
  id: string
  createUserString: string
  createTime: string
  name: string
  code: string
  sort: number
  status: 0 | 1
  description: string
}

export type DictDetailResult = DictItem

export type DictDataItem = {
  id: string
  name: string
  value: string | number
  status: 0 | 1
}
