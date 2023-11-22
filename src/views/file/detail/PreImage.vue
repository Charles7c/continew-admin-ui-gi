<template>
  <div class="pre-image">
    <section class="viewer-box">
      <VueViewer class="viewer" ref="viewer" :options="options" @inited="inited">
        <img :src="src" class="image" />
      </VueViewer>
    </section>

    <a-row justify="space-between" align="stretch">
      <a-space>
        <a-button type="primary" @click="handle('rotateLeft')">
          <template #icon><icon-undo /></template>
        </a-button>
        <a-button type="primary" @click="handle('rotateRight')">
          <template #icon><icon-redo /></template>
        </a-button>
        <a-button type="primary" @click="handle('scaleMinus')">
          <template #icon><icon-minus /></template>
        </a-button>
        <section class="zoom-proportion">{{ zoomProportion }}</section>
        <a-button type="primary" @click="handle('scalePlus')">
          <template #icon><icon-plus /></template>
        </a-button>
      </a-space>

      <a-space>
        <a-button type="primary">
          <template #icon><icon-edit /></template>
        </a-button>
        <a-button type="primary" @click="handle('fullScreen')">
          <template #icon><icon-fullscreen /></template>
        </a-button>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import 'viewerjs/dist/viewer.css'
import { component as VueViewer } from 'v-viewer'

const src = ref(
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F09fc753c76d4a8575c105452c81b76ba563c0d8d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652531003&t=100230590302237a20f8e136de146f6b'
)
// 实例
const viewer = ref<InstanceType<typeof VueViewer>>()
// 缩放比例
const zoomProportion = ref('')

const options: Viewer.Options = reactive({
  fullscreen: false, // 是否全屏模式
  inline: true, // 是否行内
  toolbar: false, // 是否显示工具栏
  navbar: false, // 是否显示导航栏
  rotatable: true, // 是否能够缩放
  backdrop: true, // 是否显示遮罩背景
  button: true, // 是否显示右上角全屏按钮
  title: false, // 是否显示标题
  zoom: (e) => {
    zoomProportion.value = parseInt(String(e.detail.ratio * 100)) + '%'
  }
})

const inited = (e: any) => {
  viewer.value = e
  setTimeout(() => {
    zoomProportion.value = parseInt(String(viewer.value.initialImageData.ratio * 100)) + '%'
  }, 100)
}

const handle = (value: string) => {
  if (!viewer.value) return
  if (value === 'rotateLeft') {
    return viewer.value.rotate(-90)
  }
  if (value === 'rotateRight') {
    return viewer.value.rotate(90)
  }
  if (value === 'scalePlus') {
    return viewer.value.zoom(0.1)
  }
  if (value === 'scaleMinus') {
    return viewer.value.zoom(-0.1)
  }
  if (value === 'fullScreen') {
    return viewer.value.full()
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-space-item) {
  height: 100%;
}
:deep(.viewer) {
  img {
    display: none;
  }
}
:deep(.viewer-container:not(.viewer-fixed)) {
  background: none;
}
.pre-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .viewer-box {
    flex: 1;
    margin-bottom: 16px;
    background-color: var(--color-bg-5);
  }
  .zoom-proportion {
    padding: 0 12px;
    height: 100%;
    color: #fff;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
}
</style>
