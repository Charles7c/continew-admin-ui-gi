<template>
  <transition name="fade-mask" mode="out-in" appear @after-leave="destroy">
    <div class="message-mask" v-show="visible">
      <transition name="zoom-message" mode="out-in" appear>
        <section class="message">
          <div class="icon" :class="props.type">
            <component :is="TypeMap[props.type].icon" :size="80"></component>
          </div>
          <p class="content">{{ props.content || TypeMap[props.type].content }}</p>
        </section>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { IconCheckCircle, IconExclamationCircle, IconCloseCircle } from '@arco-design/web-vue/es/icon'
// import type { Props } from './type'

interface Props {
  type?: 'success' | 'warning' | 'error'
  content?: string
  duration?: number
  destroy?: () => void
}

const TypeMap = {
  success: {
    content: '操作成功',
    icon: IconCheckCircle
  },
  warning: {
    content: '警告信息',
    icon: IconExclamationCircle
  },
  error: {
    content: '操作错误',
    icon: IconCloseCircle
  }
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  content: '',
  duration: 2000
})

const visible = ref(false)

onMounted(() => {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>

<style lang="scss" scoped>
.message-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  // backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  .message {
    width: 160px;
    height: 140px;
    padding: 14px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    // backdrop-filter: blur(4px);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      &.success {
        color: rgb(var(--success-6));
      }
      &.warning {
        color: rgb(var(--warning-6));
      }
      &.error {
        color: rgb(var(--danger-6));
      }
    }
    .content {
      color: #000;
      font-size: 15px;
      margin-top: 8px;
      line-height: 1.4;
    }
  }
}

.fade-mask-enter-from,
.fade-mask-leave-to {
  opacity: 0;
}

.fade-mask-enter-to,
.fade-mask-leave-from {
  opacity: 1;
}

.fade-mask-enter-active,
.fade-mask-leave-active {
  transition: opacity 0.3s ease;
}

// -----------------------

.zoom-message-enter-from,
.zoom-message-appear-from {
  transform: scale(0.5);
  opacity: 0;
}

.zoom-message-enter-to,
.zoom-message-appear-to {
  transform: scale(1);
  opacity: 1;
}

.zoom-message-enter-active,
.zoom-message-appear-active {
  transition: all 0.2s;
}

.zoom-message-leave-from {
  transform: scale(1);
  opacity: 1;
}

.zoom-message-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.zoom-message-leave-active {
  transition: all 0.2s;
}
</style>
