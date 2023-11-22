<template>
  <a-card :bordered="false" class="gi_card pane2">
    <a-row justify="space-between" align="center" wrap>
      <a-space wrap>
        <a-alert type="normal">
          <template #icon>
            <icon-exclamation-circle-fill />
          </template>
          <span>这里采用 模板 + tsx 方式使用表格，具体看代码使用</span>
        </a-alert>
      </a-space>

      <a-space wrap>
        <a-button type="primary" status="success" @click="onViewCode">
          <template #icon><icon-code /></template>
          <span>查看代码</span>
        </a-button>
        <a-button type="primary">导出</a-button>
      </a-space>
    </a-row>

    <section class="content">
      <section class="gi_table_box">
        <a-table
          row-key="id"
          size="small"
          :loading="loading"
          :bordered="{ cell: true }"
          :columns="columns"
          :data="tableData"
          :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
          :row-selection="{ type: 'checkbox', showCheckedAll: true }"
          :pagination="pagination"
          @select="select"
          @select-all="selectAll"
        >
        </a-table>
      </section>
    </section>
  </a-card>
</template>

<script lang="tsx" setup>
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import { Modal } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { getPersonList } from '@/apis'
import type { PersonItem } from '@/apis'
import { StatusList } from '@/constant/person'
import Pane2Code from './Pane2Code'

const onViewCode = () => {
  Modal.open({
    title: '查看代码',
    content: () => <gi-code-view type="vue" codeJson={Pane2Code}></gi-code-view>,
    fullscreen: true
  })
}

const columns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '比例',
    width: 68,
    align: 'center',
    render: ({ record }) => (
      <a-progress size="mini" status={getProportionColor(record.proportion)} percent={record.proportion / 100} />
    )
  },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: (data) => {
      const index = StatusList.findIndex((i) => i.value === data.record.status)
      if (index >= 0) {
        return (
          <a-tag size="small" color={StatusList[index].color}>
            {StatusList[index].name}
          </a-tag>
        )
      }
    }
  },
  {
    title: '操作',
    width: 200,
    align: 'center',
    render: () => (
      <a-space>
        <a-button type="primary" size="mini">
          <icon-edit></icon-edit>
        </a-button>
        <a-button size="mini">详情</a-button>
        <a-popconfirm type="warning" content="您确定要删除该项吗?">
          <a-button type="primary" status="danger" size="mini">
            <icon-delete />
          </a-button>
        </a-popconfirm>
      </a-space>
    )
  }
]

const { pagination, setTotal } = usePagination(() => getTableData())
const tableData = ref<PersonItem[]>([])
const loading = ref(false)

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getPersonList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    tableData.value = res.data.records
    setTotal(res.data.total)
  } finally {
    loading.value = false
  }
}

onActivated(() => {
  getTableData()
})

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])
const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}

// 全选
const selectAll: TableInstance['onSelectAll'] = (checked) => {
  selectRowKeys.value = checked ? tableData.value.map((i) => i.id) : []
}
</script>

<style lang="scss" scoped>
.pane2 {
  flex: 1;
  margin: $margin;
}
.content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
  border-radius: $radius-box;
}
</style>
