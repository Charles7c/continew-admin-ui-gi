<template>
  <div class="page">
    <a-row align="stretch" :gutter="14" class="pane">
      <a-col :xs="0" :sm="8" :md="7" :lg="6" :xl="5" :xxl="4" flex="260px" class="h-full ov-hidden">
        <a-card title="数据分类" :bordered="false" class="gi_card pane-item pane-left">
          <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="16" :md="17" :lg="18" :xl="19" :xxl="20" flex="1" class="h-full ov-hidden">
        <a-card
          title="数据列表"
          :bordered="false"
          :header-style="{ display: 'none' }"
          class="gi_card pane-item pane-right"
        >
          <div class="content">
            <a-row justify="space-between">
              <a-space wrap>
                <a-button type="primary" @click="onAdd">
                  <template #icon><icon-plus /></template>
                </a-button>
                <a-button type="primary" status="danger" @click="onMulDelete">
                  <template #icon><icon-delete /></template>
                  <template #default>删除</template>
                </a-button>
                <a-button type="primary" status="success" @click="onExport">
                  <template #icon><icon-export /></template>
                </a-button>
              </a-space>

              <a-space wrap>
                <a-select v-model="form.status" class="gi_select_input" placeholder="请选择" allow-clear>
                  <a-option v-for="item in StatusList" :key="item.value" :value="item.value">{{ item.name }}</a-option>
                </a-select>
                <a-input-group>
                  <a-input v-model="form.name" placeholder="请输入搜索关键词" allow-clear> </a-input>
                  <a-button type="primary" @click="getTableData">
                    <icon-search />
                  </a-button>
                </a-input-group>
                <a-button type="primary" @click="getTableData">
                  <template #icon><icon-refresh /></template>
                </a-button>
              </a-space>
            </a-row>

            <section class="gi_table_box">
              <a-table
                row-key="id"
                size="small"
                :loading="loading"
                :bordered="{ cell: true }"
                :data="tableData"
                :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
                :row-selection="{ type: 'checkbox', showCheckedAll: true }"
                :pagination="pagination"
                @select="select"
                @select-all="selectAll"
              >
                <template #columns>
                  <a-table-column title="序号" :width="68">
                    <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
                  </a-table-column>
                  <a-table-column title="姓名" data-index="name"></a-table-column>
                  <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
                  <a-table-column title="比例" :width="200">
                    <template #cell="{ record }">
                      <a-progress :status="getProportionColor(record.proportion)" :percent="record.proportion / 100" />
                    </template>
                  </a-table-column>
                  <a-table-column title="状态" :width="100" align="center">
                    <template #cell="{ record }">
                      <template v-for="item in StatusList" :key="item.value">
                        <a-tag size="small" v-if="item.value === record.status" :color="item.color">{{
                          item.name
                        }}</a-tag>
                      </template>
                    </template>
                  </a-table-column>
                  <a-table-column title="创建时间" data-index="createTime" :width="180"></a-table-column>
                  <a-table-column title="操作" :width="200" align="center" :fixed="!isMobile() ? 'right' : undefined">
                    <template #cell="{ record }">
                      <a-space>
                        <a-button type="primary" size="mini" @click="onEdit(record)">修改</a-button>
                        <a-button size="mini" @click="onDetail(record)">详情</a-button>
                        <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">
                          <a-button type="primary" status="danger" size="mini">删除</a-button>
                        </a-popconfirm>
                      </a-space>
                    </template>
                  </a-table-column>
                </template>
              </a-table>
            </section>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <EditModal ref="EditModalRef"></EditModal>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useTable } from '@/hooks'
import CateTree from './CateTree/index.vue'
import EditModal from './EditModal.vue'
import { getPersonList, deletePerson, type PersonItem } from '@/apis'
import { StatusList } from '@/constant/person'
import { isMobile } from '@/utils'

const router = useRouter()

const form = reactive({
  name: '',
  status: ''
})

// 这里使用了表格hooks：useTable, 节省了大量代码
const { loading, tableData, getTableData, pagination, selectedKeys, select, selectAll, handleDelete } = useTable(
  (pagin) => getPersonList({ ...form, current: pagin.page, pageSize: pagin.size }),
  { immediate: false, formatResult: (data) => data.map((i) => ({ ...i, isEdit: false })) }
)

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

onActivated(() => {
  getTableData()
})

const EditModalRef = ref<InstanceType<typeof EditModal>>()

const onAdd = () => {
  EditModalRef.value?.add()
}

const onEdit = (item: PersonItem) => {
  EditModalRef.value?.edit(item.id)
}

const onDetail = (item: PersonItem) => {
  router.push({ path: '/data/detail', query: { id: item.id } })
}

// 删除
const onDelete = (item: PersonItem) => {
  return handleDelete(() => deletePerson({ ids: [item.id] }), { content: `是否删除-${item.name}?`, showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择删除项！')
  }
  handleDelete(() => deletePerson({ ids: selectedKeys.value as string[] }), { successTip: '批量删除成功！' })
}

const onExport = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请勾选数据')
  }
  Message.success('点击了导出')
}
</script>

<style lang="scss" scoped>
.page {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .pane {
    height: 100%;
    overflow: hidden;
  }
  .pane-item {
    height: 100%;
    overflow: hidden;
  }
  .pane-left {
  }
  .pane-right {
    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
  }
}
</style>
