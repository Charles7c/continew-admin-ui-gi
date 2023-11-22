import { reactive } from 'vue'
import _ from 'lodash'

export default function <F extends object>(initValue: F) {
  const getInitValue = () => _.cloneDeep(initValue)

  const form = reactive(getInitValue())

  const resetForm = () => {
    Object.assign(form, getInitValue())
  }

  return { form, resetForm }
}
