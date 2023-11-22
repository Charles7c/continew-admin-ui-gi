<template>
  <div class="table-page">
    <GiTable
      row-key="id"
      :loading="loading"
      :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination"
      @refresh="getTableData"
    >
      <template #custom-extra>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
        <a-button @click="onImport">
          <template #icon><icon-export /></template>
          <span>导入</span>
        </a-button>
      </template>
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
        <a-table-column title="创建时间" data-index="createTime" ellipsis tooltip></a-table-column>
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <a-switch v-model="record.status" type="round" size="medium">
              <template #checked>开启</template>
              <template #unchecked>关闭</template>
            </a-switch>
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="200" align="center">
          <template #cell="{}">
            <a-space>
              <a-button type="primary" size="mini">修改</a-button>
              <a-button size="mini">详情</a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?">
                <a-button type="primary" status="danger" size="mini">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </GiTable>

    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { getPersonList, type PersonItem } from '@/apis'

defineOptions({ name: 'TableCustom' })

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

const onAdd = () => {
  Message.info('点击了新增')
}

const onDelete = () => {
  Message.info('点击了删除')
}

const onImport = () => {
  Message.info('点击了导入')
}
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
