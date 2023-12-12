export interface MenuForm {
  type: 1 | 2 | 3
  icon: string
  svgIcon: string
  title: string
  sort: number
  status: 1 | 0
  path: string
  component: string
  isCache: boolean
  isHidden: boolean
  parentId: string
  redirect: string
  breadcrumb: boolean
  showInTabs: boolean
  alwaysShow: boolean
  permission: string
}
