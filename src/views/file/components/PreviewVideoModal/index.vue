<template>
  <a-modal title="视频播放" width="auto" draggable v-model:visible="visible" @close="close">
    <div id="videoId"></div>
  </a-modal>
</template>

<script setup lang="ts">
import Player from 'xgplayer'
import type { FileItem } from '@/apis'

interface Props {
  fileInfo: FileItem
  onClose: () => void
}
const props = withDefaults(defineProps<Props>(), {})

const visible = ref(false)

onMounted(() => {
  visible.value = true
  nextTick(() => {
    new Player({
      id: 'videoId',
      url: props.fileInfo?.src || '',
      lang: 'zh-cn',
      autoplay: true,
      closeVideoClick: true,
      videoInit: true
    })
  })
})

const close = () => {
  visible.value = false
  props.onClose && props.onClose()
}
</script>
