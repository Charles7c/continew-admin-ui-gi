<template>
  <a-modal
    v-model:visible="visible"
    title="字典数据"
    width="90%"
    hide-cancel
    ok-text="关闭"
    :mask-closable="false"
    :modal-style="{ maxWidth: '680px' }"
  >
    <a-row>
      <a-space wrap>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onMulDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
      </a-space>
    </a-row>

    <a-table
      row-key="id"
      size="small"
      :data="tableData"
      :bordered="{ cell: true }"
      :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 400 }"
      :pagination="{ ...pagination, size: 'small' }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :selected-keys="selectedKeys"
      @select="select"
      @select-all="selectAll"
    >
      <template #columns>
        <a-table-column title="序号" :width="64">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="字典名" data-index="name"></a-table-column>
        <a-table-column title="字典值" data-index="value"></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <a-tag v-if="record.status == 1" color="green">启用</a-tag>
            <a-tag v-if="record.status == 0" color="red">禁用</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="180" align="center">
          <template #cell="{ record }">
            <a-space>
              <a-button type="primary" size="mini" @click="onEdit(record)">
                <template #icon><icon-edit /></template>
                <span>编辑</span>
              </a-button>
              <a-popconfirm type="warning" content="确定删除该角色吗?" @before-ok="onDelete(record)">
                <a-button type="primary" status="danger" size="mini">
                  <template #icon><icon-delete /></template>
                  <span>删除</span>
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <AddDictDataModal ref="AddDictDataModalRef"></AddDictDataModal>
  </a-modal>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { getSystemDictDataList, deleteSystemDictData, type DictDataItem } from '@/apis'
import { useTable } from '@/hooks'
import AddDictDataModal from './AddDictDataModal.vue'

const visible = ref(false)
const AddDictDataModalRef = ref<InstanceType<typeof AddDictDataModal>>()

const dictCode = ref('')
const open = (data: { code: string }) => {
  tableData.value = []
  dictCode.value = data.code
  visible.value = true
  search()
}
defineExpose({ open })

const { loading, tableData, pagination, selectedKeys, search, select, selectAll, handleDelete } = useTable(
  (pagin) => getSystemDictDataList({ current: pagin.page, pageSize: pagin.size, code: dictCode.value }),
  { immediate: false }
)

// 删除
const onDelete = (item: DictDataItem) => {
  return handleDelete(() => deleteSystemDictData({ ids: [item.id], code: dictCode.value }), { showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择字典数据！')
  }
  handleDelete(() => deleteSystemDictData({ ids: selectedKeys.value as string[], code: dictCode.value }))
}

const onAdd = () => {
  AddDictDataModalRef.value?.add()
}

const onEdit = (item: DictDataItem) => {
  AddDictDataModalRef.value?.edit({ id: item.id, code: dictCode.value })
}
</script>

<style lang="scss" scoped></style>
