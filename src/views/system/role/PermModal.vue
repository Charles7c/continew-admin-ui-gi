<template>
  <a-modal v-model:visible="visible" :title="title" :fullscreen="isMobile()" :mask-closable="true" @ok="save">
    <a-tree
      ref="TreeRef"
      size="mini"
      checkable
      :check-strictly="true"
      v-model:checked-keys="menuIds"
      :data="treeData"
      :fieldNames="{ key: 'id' }"
    ></a-tree>
  </a-modal>
</template>

<script lang="ts" setup>
import { getSystemMenuOptions, getSystemRoleMenuIds, type MenuOptionsItem } from '@/apis'
import type { TreeInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import { isMobile } from '@/utils'

const TreeRef = ref<TreeInstance>()
const treeData = ref<MenuOptionsItem[]>([])
const getTreeData = async () => {
  const res = await getSystemMenuOptions()
  treeData.value = res.data
  nextTick(() => {
    TreeRef.value?.expandAll()
  })
}
getTreeData()

const visible = ref(false)
const menuIds = ref<string[]>([])
const open = (data: { code: string; title: string }) => {
  menuIds.value = []
  getSystemRoleMenuIds({ role: data.code }).then((res) => {
    menuIds.value = res.data
  })
  visible.value = true
}
defineExpose({ open })

const title = computed(() => `分配权限`)

const save = () => {
  Message.success('模拟保存成功')
}
</script>

<style lang="scss" scoped></style>
