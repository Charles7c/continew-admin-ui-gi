<template>
  <div class="gi_page menu-manage">
    <a-card title="菜单管理">
      <a-row justify="space-between">
        <a-space wrap>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-tooltip content="展开/折叠">
            <a-button type="primary" status="success" @click="onExpanded">
              <template #icon>
                <icon-list v-if="!isExpanded" />
                <icon-mind-mapping v-else />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="查看数据结构">
            <a-button type="primary" status="warning" @click="onViewCode">
              <template #icon><icon-code /></template>
            </a-button>
          </a-tooltip>
        </a-space>

        <a-space wrap>
          <a-input v-model="form.name" placeholder="输入菜单名称搜索" allow-clear style="width: 250px">
            <template #prefix><icon-search /></template>
          </a-input>
          <a-select v-model="form.status" placeholder="菜单状态" style="width: 120px">
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
      </a-row>

      <a-table
        style="margin-top: 8px"
        ref="TableRef"
        row-key="id"
        :data="menuList"
        :loading="loading"
        :bordered="{ cell: true }"
        :scroll="{ x: '100%', y: '100%', minWidth: 1700 }"
        :pagination="false"
        size="mini"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
        <template #columns>
          <a-table-column title="菜单名称">
            <template #cell="{ record }">{{ record.title || '' }}</template>
          </a-table-column>
          <a-table-column title="类型" :width="80" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.type === 1" color="orangered">目录</a-tag>
              <a-tag v-if="record.type === 2" color="green">菜单</a-tag>
              <a-tag v-if="record.type === 3">按钮</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="排序" :width="80" align="center">
            <template #cell="{ record }">{{ record.sort || 0 }}</template>
          </a-table-column>
          <a-table-column title="路由路径" data-index="path"> </a-table-column>
          <a-table-column title="路由名称">
            <template #cell="{ record }">{{ transformPathToName(record.path) }}</template>
          </a-table-column>
          <a-table-column title="组件路径" data-index="component"> </a-table-column>
          <a-table-column title="权限标识" data-index="permission"> </a-table-column>
          <a-table-column title="菜单图标" data-index="icon" :width="100" align="center">
            <template #cell="{ record }">
              <GiSvgIcon v-if="record.svgIcon" :size="24" :name="record.svgIcon"></GiSvgIcon>
              <template v-else>
                <component v-if="record.icon" :is="record.icon" :size="24"></component>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="状态" :width="80" align="center">
            <template #cell="{ record }">
              <a-switch
                type="round"
                size="small"
                :model-value="record.status"
                :checked-value="1"
                :unchecked-value="0"
              />
            </template>
          </a-table-column>
          <a-table-column title="是否缓存" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.isCache" color="green">是</a-tag>
              <a-tag v-else color="red">否</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="是否隐藏" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.isHidden" color="green">是</a-tag>
              <a-tag v-else color="red">否</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="是否外链" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag v-if="isExternal(record.path)" color="green">是</a-tag>
              <a-tag v-else color="red">否</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="200" align="left" :fixed="!isMobile() ? 'right' : undefined">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                  <span>编辑</span>
                </a-button>
                <a-button v-if="[1, 2].includes(record.type)" type="primary" status="success" size="mini">
                  <template #icon><icon-plus /></template>
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

    <AddMenuModal ref="AddMenuModalRef" :menus="menuList"></AddMenuModal>
  </div>
</template>

<script setup lang="ts">
import AddMenuModal from './AddMenuModal.vue'
import { getSystemMenuList, type MenuItem } from '@/apis'
import { Drawer, type TableInstance } from '@arco-design/web-vue'
import { isExternal } from '@/utils/validate'
import { transformPathToName, isMobile } from '@/utils'
import GiCodeView from '@/components/GiCodeView/index.vue'

defineOptions({ name: 'SystemMenu' })

const AddMenuModalRef = ref<InstanceType<typeof AddMenuModal>>()
const loading = ref(false)

const TableRef = ref<TableInstance>()
const isExpanded = ref(false)
const onExpanded = () => {
  isExpanded.value = !isExpanded.value
  TableRef.value?.expandAll(isExpanded.value)
}

const form = reactive({ name: '', status: '' })
const menuList = ref<MenuItem[]>([])

const getMenuList = async () => {
  try {
    loading.value = true
    const res = await getSystemMenuList()
    menuList.value = res.data
  } finally {
    loading.value = false
  }
}
getMenuList()

const search = () => {
  getMenuList()
}

const reset = () => {
  form.name = ''
  form.status = ''
  getMenuList()
}

const onAdd = () => {
  AddMenuModalRef.value?.add()
}

const onEdit = (item: MenuItem) => {
  AddMenuModalRef.value?.edit(item.id)
}

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: JSON.stringify(menuList.value, null, '\t') }),
    width: 560
  })
}
</script>

<style lang="scss" scoped>
.menu-manage {
}
</style>
