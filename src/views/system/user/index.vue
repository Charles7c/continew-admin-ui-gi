<template>
  <div class="gi_page user-manage">
    <a-card title="用户管理">
      <a-row :gutter="16">
        <a-col :xs="0" :md="5" :lg="5" :xl="5" :xxl="4">
          <a-input v-model="treeInputValue" placeholder="输入部门名称搜索" allow-clear style="margin-bottom: 10px">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-tree
            ref="TreeRef"
            block-node
            show-line
            default-expand-all
            :data="deptList"
            :field-names="{
              disabled: 'false',
              key: 'id',
              title: 'name',
              children: 'children'
            }"
            @select="handleSelectNode"
          >
          </a-tree>
        </a-col>

        <a-col :xs="24" :md="18" :lg="18" :xl="19" :xxl="20">
          <a-row justify="space-between">
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

            <a-space wrap>
              <a-input-group>
                <a-select v-model="form.status" placeholder="用户状态" allow-clear style="width: 150px">
                  <a-option :value="1">正常</a-option>
                  <a-option :value="0">禁用</a-option>
                </a-select>
                <a-input v-model="form.username" placeholder="输入用户名搜索" allow-clear style="max-width: 250px">
                </a-input>
              </a-input-group>
              <a-button type="primary" @click="search">
                <template #icon><icon-search /></template>
                <span>查询</span>
              </a-button>
              <a-button @click="reset">
                <template #icon><icon-refresh /></template>
                <span>重置</span>
              </a-button>
            </a-space>
          </a-row>

          <a-table
            style="margin-top: 8px"
            row-key="id"
            :loading="loading"
            :data="userList"
            :bordered="{ cell: true }"
            :scroll="{ x: '100%', y: '100%', minWidth: 1700 }"
            :pagination="pagination"
            :row-selection="{ type: 'checkbox', showCheckedAll: true, onlyCurrent: false }"
            :selected-keys="selectedKeys"
            @select="select"
            @select-all="selectAll"
          >
            <template #columns>
              <a-table-column title="序号" :width="64">
                <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
              </a-table-column>
              <a-table-column title="用户名" data-index="username" :width="120">
                <template #cell="{ record }">
                  <a-link @click="openDetail(record)">{{ record.username }}</a-link>
                </template>
              </a-table-column>
              <a-table-column title="昵称" data-index="nickname" :width="150"></a-table-column>
              <a-table-column title="状态" :width="100" align="center">
                <template #cell="{ record }">
                  <a-tag v-if="record.status === 1" color="green">正常</a-tag>
                  <a-tag v-if="record.status === 2" color="red">禁用</a-tag>
                </template>
              </a-table-column>
              <a-table-column title="性别" data-index="gender" :width="80" align="center">
                <template #cell="{ record }">
                  <span v-if="record.gender === 1">男</span>
                  <span v-else-if="record.gender === 2">女</span>
                  <span v-else>未知</span>
                </template>
              </a-table-column>
              <a-table-column title="头像" data-index="avatar" :width="100" align="center">
                <template #cell="{ record }">
                  <a-avatar>
                    <img alt="avatar" :src="getAvatar(record.avatar, record.gender)" />
                  </a-avatar>
                </template>
              </a-table-column>
              <a-table-column title="联系方式" data-index="phone" :width="180"></a-table-column>
              <a-table-column title="类型" :width="100" align="center">
                <template #cell="{ record }">
                  <a-tag v-if="record.isSystem" color="red">系统内置</a-tag>
                  <a-tag v-else color="orange">自定义</a-tag>
                </template>
              </a-table-column>
              <a-table-column title="描述" :width="200" data-index="description"></a-table-column>
              <a-table-column title="创建时间" data-index="createTime" :width="200"></a-table-column>
              <a-table-column title="操作" :width="180" align="center" :fixed="!isMobile() ? 'right' : undefined">
                <template #cell="{ record }">
                  <a-space>
                    <a-button type="primary" size="mini" @click="onEdit(record)">
                      <template #icon><icon-edit /></template>
                      <span>编辑</span>
                    </a-button>
                    <a-popconfirm type="warning" content="确定删除该用户吗?" @before-ok="onDelete(record)">
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
        </a-col>
      </a-row>
    </a-card>

    <AddUserModal ref="AddUserModalRef" @reset="reset"></AddUserModal>
    <UserDetailDrawer ref="UserDetailDrawerRef"></UserDetailDrawer>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/hooks'
import { useDept } from '@/hooks/app'
import { getSystemUserList, deleteSystemUser } from '@/apis'
import type { UserItem } from '@/apis'
import AddUserModal from './AddUserModal.vue'
import UserDetailDrawer from './UserDetailDrawer.vue'
import type { TreeInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { isMobile } from '@/utils'
import getAvatar from '@/utils/avatar'

const { proxy } = getCurrentInstance() as any

defineOptions({ name: 'SystemUser' })

const TreeRef = ref<TreeInstance>()
const AddUserModalRef = ref<InstanceType<typeof AddUserModal>>()
const UserDetailDrawerRef = ref<InstanceType<typeof UserDetailDrawer>>()
const treeInputValue = ref('')

const { deptList, getDeptList } = useDept({
  onSuccess: () => {
    nextTick(() => {
      TreeRef.value?.expandAll(true)
    })
  }
})
getDeptList()

const form = reactive({ status: undefined, username: undefined, deptId: undefined })

const {
  loading,
  tableData: userList,
  pagination,
  selectedKeys,
  search,
  select,
  selectAll,
  handleDelete
} = useTable((paging) => getSystemUserList({ ...form, page: paging.page, size: paging.size }), {
  immediate: true,
  isFilterDisabled: true
})

const reset = () => {
  form.status = undefined
  form.username = undefined
  form.deptId = undefined
  search()
}

// 删除
const onDelete = (item: UserItem) => {
  return handleDelete(() => deleteSystemUser({ ids: [item.id] }), { showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择用户！')
  }
  handleDelete(() => deleteSystemUser({ ids: selectedKeys.value as number[] }))
}

// 根据选中部门查询
const handleSelectNode = (keys: Array<any>) => {
  if (form.deptId === keys[0]) {
    form.deptId = undefined
    // 如已选中，再次点击则取消选中
    proxy.$refs.TreeRef.selectNode(keys, false)
  } else {
    form.deptId = keys.length === 1 ? keys[0] : undefined
  }
  search()
}

const onAdd = () => {
  AddUserModalRef.value?.add()
}

const onEdit = (item: UserItem) => {
  AddUserModalRef.value?.edit(item.id)
}

const openDetail = (item: UserItem) => {
  UserDetailDrawerRef.value?.open(item.id)
}
</script>

<style lang="scss" scoped></style>
