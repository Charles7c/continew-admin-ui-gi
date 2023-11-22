<template>
  <div class="gi_page dept-manage">
    <a-card title="部门管理">
      <a-space wrap>
        <a-input v-model="form.name" placeholder="输入部门名称搜索" allow-clear style="width: 250px">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-select v-model="form.status" placeholder="部门状态" style="width: 120px">
          <a-option :value="1">正常</a-option>
          <a-option :value="0">禁用</a-option>
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
        style="margin-top: 8px"
        ref="TableRef"
        row-key="id"
        :bordered="{ cell: true }"
        :data="deptList"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="false"
        :row-selection="{ type: 'checkbox', showCheckedAll: false }"
        @select="select"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
        <template #columns>
          <a-table-column title="部门名称" data-index="name" :width="160"></a-table-column>
          <a-table-column title="排序" data-index="sort" :width="100" align="center"></a-table-column>
          <a-table-column title="状态" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.status == 1" color="green">正常</a-tag>
              <a-tag v-if="record.status == 0" color="red">禁用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description" :width="250"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :width="200"></a-table-column>
          <a-table-column title="操作" :width="200" align="center" :fixed="!isMobile() ? 'right' : undefined">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                  <span>编辑</span>
                </a-button>
                <a-button v-if="record.parentId" type="primary" status="success" size="mini" @click="onAdd()">
                  <template #icon><icon-plus /></template>
                  <span>新增</span>
                </a-button>
                <a-popconfirm type="warning" content="您确定要删除该项吗?">
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
    </a-card>

    <AddDeptModal ref="AddDeptModalRef"></AddDeptModal>
  </div>
</template>

<script setup lang="ts">
import AddDeptModal from './AddDeptModal.vue'
import { getSystemDeptList, type DeptItem } from '@/apis'
import type { TableInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { isMobile } from '@/utils'

defineOptions({ name: 'SystemDept' })

const AddDeptModalRef = ref<InstanceType<typeof AddDeptModal>>()
const TableRef = ref<TableInstance>()

const form = reactive({
  name: '',
  status: ''
})

const loading = ref(false)
const deptList = ref<DeptItem[]>([])
const getDeptList = async () => {
  try {
    loading.value = true
    const res = await getSystemDeptList()
    deptList.value = res.data
    nextTick(() => {
      TableRef.value?.expandAll(true)
    })
  } finally {
    loading.value = false
  }
}
getDeptList()

const search = () => {
  getDeptList()
}

const reset = () => {
  form.name = ''
  form.status = ''
  getDeptList()
}

const onAdd = () => {
  AddDeptModalRef.value?.add()
}

const onEdit = (item: DeptItem) => {
  AddDeptModalRef.value?.edit(item.id)
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])
const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}
const onMulDelete = () => {
  if (!selectRowKeys.value.length) {
    return Message.warning('请选择部门')
  }
  Message.info('点击了批量删除')
}
</script>

<style lang="scss" scoped></style>
