import { ref } from 'vue'
import { getSystemDeptList } from '@/apis'
import type { DeptItem } from '@/apis'
import { mapTree } from 'xe-utils'

/** 部门模块 */
export function useDept(options?: { onSuccess?: () => void }) {
  const loading = ref(false)
  const deptList = ref<DeptItem[]>([])

  const getDeptList = async (filterDisable?: boolean) => {
    try {
      loading.value = true
      const res = await getSystemDeptList()
      deptList.value = mapTree(res.data, (i) => {
        if (i.children?.length && filterDisable) {
          i.children = i.children.filter((i) => i.status === 1)
        }
        return i
      })
      options?.onSuccess && options.onSuccess()
    } finally {
      loading.value = false
    }
  }
  return { deptList, getDeptList, loading }
}
