<template>
  <div class="table-page">
    <GiForm :options="options" v-model="form" @search="search"></GiForm>

    <div class="gi_table_box">
      <a-table
        row-key="id"
        size="small"
        page-position="bottom"
        :bordered="{ cell: true }"
        :loading="loading"
        :data="tableData"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="pagination"
      >
        <template #columns>
          <a-table-column title="序号" :width="66" align="center">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="姓名" data-index="name" :width="120"></a-table-column>
          <a-table-column title="头像" :width="80">
            <template #cell="{ record }">
              <a-avatar :size="30" :style="{ backgroundColor: record.color }">{{ record.name[0] }}</a-avatar>
            </template>
          </a-table-column>
          <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
          <a-table-column title="爱好" data-index="hobbys">
            <template #cell="{ record }">
              <GiOverFlowTags :data="record.hobbys"></GiOverFlowTags>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" ellipsis tooltip></a-table-column>
          <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
          <a-table-column title="状态" :width="100" align="center">
            <template #cell="{ record }">
              <a-typography-text v-if="record.status" type="success">开启</a-typography-text>
              <a-typography-text v-else type="danger">关闭</a-typography-text>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="200" align="center">
            <template #cell>
              <a-space>
                <a-button type="primary" size="mini">编辑</a-button>
                <a-button size="mini">详情</a-button>
                <a-popconfirm type="warning" content="您确定要删除该项吗?">
                  <a-button type="primary" status="danger" size="mini">删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'
import { getPersonList, type PersonItem } from '@/apis'
import type { Options } from '@/components/GiForm'

defineOptions({ name: 'TableBase' })

const form = reactive({})

const col = { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 }
const options: Options = reactive({
  form: { layout: 'inline' },
  btns: { col: col },
  fold: { enable: true, index: 2 },
  columns: [
    {
      type: 'input',
      label: '姓名',
      field: 'name',
      col: col
    },
    {
      type: 'input',
      label: '手机',
      field: 'phone',
      col: col,
      props: {
        maxLength: 11
      }
    },
    {
      type: 'select',
      label: '类型',
      field: 'type',
      col: col,
      options: [
        { label: '党员', value: 1 },
        { label: '群众', value: 2 }
      ]
    },
    {
      type: 'date-picker',
      label: '创建日期',
      field: 'createTime',
      col: col
    },
    {
      type: 'input',
      label: '地址',
      field: 'address',
      col: col
    }
  ]
})

const loading = ref(false)
const tableData = ref<PersonItem[]>([])

const { pagination, setTotal } = usePagination(() => getTableData())

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

getTableData()

const search = () => {
  pagination.current = 1
  getTableData()
}
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
