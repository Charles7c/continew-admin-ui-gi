import { ref, watch, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

/**
 * 响应式布局容器固定宽度
 *
 * 大屏（>=1200px）
 * 中屏（>=992px）
 * 小屏（>=768px）
 */
export default function () {
  const device = ref<'mobile' | 'desktop'>('desktop')

  const { width } = useWindowSize()
  watch(
    () => width,
    () => {
      device.value = width.value < 768 ? 'mobile' : 'desktop'
    },
    { immediate: true }
  )

  const isMobile = computed(() => device.value === 'mobile')
  const isDesktop = computed(() => device.value === 'desktop')

  return { device, isMobile, isDesktop }
}
