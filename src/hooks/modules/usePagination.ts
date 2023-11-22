import { reactive, toRefs } from 'vue'

type Callback = () => void

type Options = {
  defaultPageSize: number
}

export default function usePagination(callback: Callback, options: Options = { defaultPageSize: 10 }) {
  const pagination = reactive({
    showPageSize: true,
    showTotal: true,
    current: 1,
    pageSize: options.defaultPageSize,
    total: 0,
    onChange: (size: number) => {
      pagination.current = size
      callback && callback()
    },
    onPageSizeChange: (size: number) => {
      pagination.current = 1
      pagination.pageSize = size
      callback && callback()
    }
  })

  const changeCurrent = pagination.onChange
  const changePageSize = pagination.onPageSizeChange
  function setTotal(value: number) {
    pagination.total = value
  }

  const { current, pageSize, total } = toRefs(pagination)

  return {
    current,
    pageSize,
    total,
    pagination,
    changeCurrent,
    changePageSize,
    setTotal
  }
}
