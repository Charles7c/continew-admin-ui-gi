import { ref } from 'vue'
import { getSystemRoleList } from '@/apis'
import type { RoleItem } from '@/apis'

/** 角色模块 */
export function useRole() {
  const loading = ref(false)
  const roleList = ref<RoleItem[]>([])
  const total = ref(0)
  const getRoleList = async () => {
    try {
      loading.value = true
      const res = await getSystemRoleList({ current: 1, pageSize: 99 })
      roleList.value = res.data.records.filter((i) => i.status === 1)
      total.value = res.data.total
    } finally {
      loading.value = false
    }
  }
  return { roleList, getRoleList, loading, total }
}
