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

/** 系统管理通用状态 0禁用 1启用 */
type Status = 0 | 1

/** 性别 1男 2女 */
type Gender = 1 | 2
