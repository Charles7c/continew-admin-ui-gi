<template>
  <VCharts v-if="renderChart" :option="options" :autoresize="autoResize" :style="{ width, height }" />
</template>

<script lang="ts" setup>
import VCharts from 'vue-echarts'

interface Props {
  options?: any
  autoResize?: boolean
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  options: {},
  autoResize: true,
  width: '100%',
  height: '100%'
})

// const appStore = useAppStore();
// const theme = computed(() => {
//   if (appStore.theme === 'dark') return 'dark';
//   return '';
// });

const renderChart = ref(false)

nextTick(() => {
  renderChart.value = true
})
</script>

<style scoped lang="scss"></style>
