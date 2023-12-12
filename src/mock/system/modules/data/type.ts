export interface MockMenuItem {
  id: string
  parentId: string
  path: string
  component: string
  redirect: string
  type: 1 | 2 | 3
  title: string
  svgIcon: string
  icon: string
  isCache: boolean
  isHidden: boolean
  sort: number
  activeMenu: string
  breadcrumb: boolean
  status: 1 | 2
  roles: string[]
  permission: string
  showInTabs: boolean
  affix?: boolean
  alwaysShow: boolean
  children?: MockMenuItem[]
}
