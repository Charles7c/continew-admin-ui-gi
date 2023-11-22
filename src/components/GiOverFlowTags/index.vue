<template>
  <a-overflow-list v-if="data.length">
    <a-tag v-for="(item, index) in data" :key="index" color="orange" size="small">
      {{ item }}
    </a-tag>
    <template #overflow="{ number }">
      <a-popover :content-style="{ maxWidth: '300px', padding: '8px 12px' }">
        <a-tag color="green" size="small">+{{ number }}</a-tag>
        <template #content>
          <a-space wrap>
            <a-tag
              v-for="tag in data.filter((i, n) => n >= data.length - number)"
              :key="tag"
              color="orange"
              size="small"
            >
              {{ tag }}
            </a-tag>
          </a-space>
        </template>
      </a-popover>
    </template>
  </a-overflow-list>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GiOverFlowTags' })

interface Props {
  data: string[]
}
withDefaults(defineProps<Props>(), {
  data: () => []
})
</script>

<style lang="scss" scoped></style>
