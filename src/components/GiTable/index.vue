<template>
  <div class="gi-table" :class="{ fullscreen: isFullscreen }" ref="giTableRef">
    <a-row justify="space-between" align="center">
      <a-space wrap>
        <slot name="custom-extra"></slot>
      </a-space>
      <a-space :size="15" wrap>
        <a-tooltip content="斑马纹">
          <a-switch v-model="stripe" size="small" type="round" />
        </a-tooltip>
        <a-tooltip content="刷新">
          <a-button size="mini" class="gi_hover_btn" @click="refresh">
            <template #icon><icon-refresh :size="18" /></template>
          </a-button>
        </a-tooltip>
        <a-tooltip content="全屏">
          <a-button size="mini" class="gi_hover_btn" @click="isFullscreen = !isFullscreen">
            <template #icon>
              <icon-fullscreen :size="18" v-if="!isFullscreen" />
              <icon-fullscreen-exit :size="18" v-else />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip content="显示边框">
          <a-button size="mini" class="gi_hover_btn" @click="isBordered = !isBordered">
            <template #icon>
              <icon-apps :size="18" />
            </template>
          </a-button>
        </a-tooltip>
        <a-radio-group type="button" size="mini" v-model="size">
          <a-radio value="mini">小</a-radio>
          <a-radio value="small">默认</a-radio>
          <a-radio value="medium">中</a-radio>
          <a-radio value="large">大</a-radio>
        </a-radio-group>
      </a-space>
    </a-row>
    <div class="table-box">
      <a-table :stripe="stripe" :size="size" :bordered="{ cell: isBordered }" v-bind="attrs" ref="tableRef">
        <template v-for="k in Object.keys(slots)" #[k] :key="k"> <slot :name="k"></slot> </template
      ></a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'

defineOptions({ name: 'GiTable', inheritAttrs: false })
const emit = defineEmits(['refresh'])

const attrs = useAttrs()
const slots = useSlots()

const tableRef = ref<TableInstance | null>(null)

const stripe = ref(false)
const size = ref<TableInstance['$props']['size']>('small')
const isBordered = ref(true)
// console.log('attrs', attrs)

const isFullscreen = ref(false)

const refresh = () => {
  emit('refresh')
}

defineExpose({ tableRef })
</script>

<style lang="scss" scoped>
.gi-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg-1);
  &.fullscreen {
    padding: $padding;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1001;
  }
  .table-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>
