<template>
  <div class="cate-tree">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <a-input allow-clear :maxlength="20" :placeholder="props.placeholder" v-model="inputValue">
        <template #prefix><icon-search /></template>
      </a-input>
    </div>
    <!-- 分类树 -->
    <div class="wrap">
      <a-scrollbar style="height: 100%; overflow: auto" outer-style="height: 100%">
        <a-tree
          ref="treeRef"
          show-line
          size="mini"
          :data="treeData"
          :fieldNames="{
            key: 'id'
          }"
          @select="select"
        >
          <template #icon="node">
            <GiSvgIcon name="com-file-close" :size="16" v-if="!node.children"></GiSvgIcon>
            <GiSvgIcon name="com-file-open" :size="16" v-else-if="node.children"></GiSvgIcon>
            <GiSvgIcon name="com-file" :size="16" v-else></GiSvgIcon>
          </template>
          <template #title="node">
            <a-trigger
              trigger="contextMenu"
              align-point
              animation-name="slide-dynamic-origin"
              auto-fit-transform-origin
              position="bl"
              update-at-scroll
            >
              <div>{{ node.name }}</div>
              <template #content>
                <RightMenu :tree-data="treeData" @click="onRightMenuItemClick"></RightMenu>
              </template>
            </a-trigger>
          </template>
        </a-tree>
      </a-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { getCateTreeData, type CateItem } from '@/apis'
import RightMenu from './RightMenu.vue'

interface Props {
  type?: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 1, // 分类
  placeholder: '请输入关键词'
})

const loading = ref(false)
const treeRef = ref()
const inputValue = ref('')
const treeData = ref<CateItem[]>([])

const emit = defineEmits<{
  (e: 'node-click'): void
}>()

const select = () => {
  emit('node-click')
}

// 获取分类树
const getCateTree = async () => {
  try {
    loading.value = true
    const res = await getCateTreeData()
    treeData.value = res.data
    nextTick(() => {
      treeRef.value?.expandAll()
    })
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

getCateTree()

const onRightMenuItemClick = (mode: string) => {
  mode !== 'move' && Message.info(mode)
}
</script>

<style lang="scss" scoped>
:deep(.arco-tree-node-title-text) {
  white-space: nowrap;
}
// :deep(.arco-scrollbar) {
//   height: 100%;
// }
.switcher-icon {
  fill: var(--color-text-2);
}
.cate-tree {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .search-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  > .wrap {
    flex: 1;
    overflow: hidden;
    background-color: var(--color-bg-1);
    position: relative;
  }
}
</style>
