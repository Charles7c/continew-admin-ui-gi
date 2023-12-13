<template>
  <div class="gi_page dept-manage">
    <a-card title="部门管理">
      <a-space wrap>
        <a-input v-model="form.name" placeholder="输入部门名称搜索" allow-clear style="width: 250px">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-select v-model="form.status" placeholder="部门状态" style="width: 120px">
          <a-option :value="1">正常</a-option>
          <a-option :value="2">禁用</a-option>
        </a-select>
        <a-button type="primary" @click="search">
          <template #icon><icon-search /></template>
          <span>搜索</span>
        </a-button>
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <span>重置</span>
        </a-button>
      </a-space>

      <a-row>
        <a-space wrap>
          <a-button type="primary" @click="onAdd(undefined)">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="danger" @click="onBatchDelete">
            <template #icon><icon-delete /></template>
            <span>删除</span>
          </a-button>
        </a-space>
      </a-row>

      <a-table
        style="margin-top: 8px"
        ref="TableRef"
        row-key="id"
        :bordered="{ cell: true }"
        :data="deptList"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1270 }"
        :pagination="false"
        :row-selection="{ type: 'checkbox', showCheckedAll: false }"
        @select="handleSelect"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
        <template #columns>
          <a-table-column title="部门名称" data-index="name" :width="160"></a-table-column>
          <a-table-column title="排序" data-index="sort" :width="100" align="center"></a-table-column>
          <a-table-column title="状态" align="center" :width="110" data-index="status">
            <template #cell="{ record }">
              <a-switch
                v-model="record.status"
                :checked-value="1"
                :unchecked-value="2"
                :disabled="record.disabled"
                @change="handleChangeStatus(record)"
              />
            </template>
          </a-table-column>
          <a-table-column title="系统内置" :width="120" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.isSystem" color="red">是</a-tag>
              <a-tag v-else color="arcoblue">否</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description" :width="200"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :width="170"></a-table-column>
          <a-table-column title="操作" :width="200" align="center" :fixed="!isMobile() ? 'right' : undefined">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                  <span>编辑</span>
                </a-button>
                <a-button v-if="record.parentId" type="primary" status="success" size="mini" @click="onAdd(record)">
                  <template #icon><icon-plus /></template>
                  <span>新增</span>
                </a-button>
                <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="handleDelete([record.id])">
                  <a-button type="primary" status="danger" size="mini" :disabled="record.disabled">
                    <template #icon><icon-delete /></template>
                    <span>删除</span>
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <AddDeptModal ref="AddDeptModalRef" @reset="reset"></AddDeptModal>
  </div>
</template>

<script setup lang="ts">
import AddDeptModal from './AddDeptModal.vue'
import { getSystemDeptList, type DeptItem, updateSystemDept, deleteSystemDept } from '@/apis'
import type { TableData, TableInstance } from '@arco-design/web-vue'
import { Message, Modal } from '@arco-design/web-vue'
import { isMobile } from '@/utils'

defineOptions({ name: 'SystemDept' })

const AddDeptModalRef = ref<InstanceType<typeof AddDeptModal>>()
const TableRef = ref<TableInstance>()
const loading = ref(false)
const deptList = ref<DeptItem[]>([])

const form = reactive({
  name: undefined,
  status: undefined,
  sort: ['parentId,asc', 'sort,asc', 'createTime,desc']
})

/**
 *查询列表
 */
const getDeptList = async () => {
  try {
    loading.value = true
    const res = await getSystemDeptList(form)
    deptList.value = res.data
    await nextTick(() => {
      TableRef.value?.expandAll(true)
    })
  } finally {
    loading.value = false
  }
}
getDeptList()

/**
 * 条件搜索
 */
const search = () => {
  getDeptList()
}

/**
 * 重置
 */
const reset = () => {
  form.name = undefined
  form.status = undefined
  getDeptList()
}

/**
 * 新增
 * @param item 部门信息
 */
const onAdd = (item: DeptItem | undefined) => {
  AddDeptModalRef.value?.add(item)
}

/**
 * 修改
 * @param item 部门信息
 */
const onEdit = (item: DeptItem) => {
  AddDeptModalRef.value?.edit(item.id)
}

/**
 * 修改状态
 *
 * @param record 记录信息
 */
const handleChangeStatus = (record: DeptItem) => {
  if (record.id) {
    const tip = record.status === 1 ? '启用' : '禁用'
    updateSystemDept(record)
      .then(() => {
        Message.success(`${tip}成功`)
      })
      .catch(() => {
        record.status = record.status === 1 ? 2 : 1
      })
  }
}

// 勾选
const selectRowKeys = ref<number[]>([])

/**
 * 点击行选择器
 */
const handleSelect = (rowKeys: any, rowKey: any, record: TableData) => {
  if (rowKeys.find((key: any) => key === rowKey)) {
    if (record.children) {
      record.children.forEach((r) => {
        TableRef.value?.select(r.id)
        rowKeys.push(r.id)
        if (r.children) {
          handleSelect(rowKeys, rowKey, r)
        }
      })
    }
  } else if (record.children) {
    record.children.forEach((r) => {
      rowKeys.splice(
        rowKeys.findIndex((key: number | undefined) => key === r.id),
        1
      )
      TableRef.value?.select(r.id, false)
      if (r.children) {
        handleSelect(rowKeys, rowKey, r)
      }
    })
  }
  selectRowKeys.value = rowKeys
}

/**
 * 批量删除
 */
const onBatchDelete = () => {
  if (!selectRowKeys.value.length) {
    return Message.warning('请选择部门')
  }
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false,
    maskClosable: false,
    onOk: () => {
      handleDelete(selectRowKeys.value)
    }
  })
}

/**
 * 删除
 *
 * @param ids ID 列表
 */
const handleDelete = (ids: Array<number>) => {
  deleteSystemDept({ ids: ids })
    .then((res) => {
      if (res.success) {
        Message.success(res.msg)
        reset()
      }
    })
    .finally(() => {
      selectRowKeys.value = []
      TableRef?.value?.selectAll(false)
    })
}
</script>

<style lang="scss" scoped></style>
