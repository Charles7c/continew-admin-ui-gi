import { reactive } from 'vue'
import _ from 'lodash'
import type { Options, ColumnsItem, ColumnsItemPropsKey } from './type'
import { Message } from '@arco-design/web-vue'

export function useGiForm(initValue: Options) {
  const getInitValue = () => _.cloneDeep(initValue)

  const options = reactive(getInitValue())

  const resetOptions = () => {
    Object.assign(options, getInitValue())
  }

  const setValue = <T>(field: string, key: keyof ColumnsItem, value: T) => {
    if (!options.columns.length) return
    const obj = options.columns.find((i) => i.field === field)
    if (obj) {
      obj[key] = value as never
    } else {
      Message.warning(`没有这个field属性值-${field}，请检查！`)
    }
  }

  const setPropsValue = <T>(field: string, key: ColumnsItemPropsKey, value: T) => {
    if (!options.columns.length) return
    const obj = options.columns.find((i) => i.field === field)
    if (obj) {
      if (!obj.props) {
        obj.props = {}
      }
      obj.props[key as keyof ColumnsItem['props']] = value as never
    } else {
      Message.warning(`没有这个field属性值-${field}，请检查！`)
    }
  }

  return {
    /** 配置项 */
    options,
    /** 重置 options */
    resetOptions,
    /** 设置 options.columns 某个对象属性的值 */
    setValue,
    /** 设置 options.columns.props 某个属性的值 */
    setPropsValue
  }
}
