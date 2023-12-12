interface AnyObject {
  [key: string]: unknown
}

interface Options {
  value: unknown
  label: string
}

interface NodeOptions extends Options {
  children?: NodeOptions[]
}

type TimeRanger = [string, string]

/** 系统管理通用状态 1：启用；2：禁用 */
type Status = 1 | 2

/** 性别 1男 2女 */
type Gender = 1 | 2
