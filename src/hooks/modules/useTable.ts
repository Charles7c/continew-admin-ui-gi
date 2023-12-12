import type { TableInstance } from '@arco-design/web-vue'
import { Modal, Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'

interface Options<T> {
  formatResult?: (data: T[]) => any
  onSuccess?: () => void
  immediate?: boolean
  rowKey?: keyof T
  disabledKey?: keyof T
  isFilterDisabled?: boolean
}

type PaginationParams = { page: number; size: number }
type Api<T> = (params: PaginationParams) => Promise<ApiRes<PageRes<T[]>>>

export default function <T>(api: Api<T>, options?: Options<T>) {
  const { formatResult, onSuccess, immediate, rowKey, disabledKey } = options || {}
  const { pagination, setTotal } = usePagination(() => getTableData())
  const loading = ref(false)
  const tableData = ref<T[]>([])

  const getTableData = async () => {
    try {
      loading.value = true
      const res = await api({ page: pagination.current, size: pagination.pageSize })
      tableData.value = formatResult ? formatResult(res.data.list) : res.data.list
      setTotal(res.data.total)
      onSuccess && onSuccess()
    } finally {
      loading.value = false
    }
  }

  // 是否立即出发
  const isImmediate = immediate ?? true
  isImmediate && getTableData()

  // 搜索
  const search = () => {
    selectedKeys.value = []
    pagination.onChange(1)
  }

  // 多选
  const selectedKeys = ref<(string | number)[]>([])
  const select: TableInstance['onSelect'] = (rowKeys) => {
    selectedKeys.value = rowKeys
  }

  // 全选
  const selectAll: TableInstance['onSelectAll'] = (checked) => {
    const key = rowKey ?? ('id' as keyof T)
    const getKeys = (data: any[]) => data.map((item) => item[key] as string | number)
    if (checked) {
      if (options?.isFilterDisabled) {
        const disabled = disabledKey ?? ('disabled' as keyof T)
        const filterDisabled = (data: any[]) => data.filter((item) => !item[disabled] ?? (true as boolean))
        selectedKeys.value = getKeys(filterDisabled(tableData.value))
      } else {
        selectedKeys.value = getKeys(tableData.value)
      }
    } else {
      selectedKeys.value = []
    }
  }
  // 选择的数据发生改变
  const selectionChange: TableInstance['onSelectionChange'] = (rowKeys) => {
    selectedKeys.value = rowKeys
  }

  // 删除
  const handleDelete = async <T>(
    deleteApi: () => Promise<ApiRes<T>>,
    options?: { title?: string; content?: string; successTip?: string; showModal?: boolean }
  ): Promise<boolean | undefined> => {
    const onDetele = async () => {
      try {
        const res = await deleteApi()
        if (res.success) {
          Message.success(options?.successTip || '删除成功！')
          selectedKeys.value = []
          getTableData()
        }
        return res.success
      } catch (error) {
        return false
      }
    }
    const flag = options?.showModal ?? true // 是否显示对话框
    if (!flag) {
      return onDetele()
    }
    Modal.warning({
      title: options?.title || '提示',
      content: options?.content || '是否确认删除？',
      hideCancel: false,
      maskClosable: false,
      onBeforeOk: onDetele
    })
  }

  return {
    loading,
    tableData,
    getTableData,
    search,
    pagination,
    selectedKeys,
    select,
    selectAll,
    selectionChange,
    handleDelete
  }
}
