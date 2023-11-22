<template>
  <template v-if="!item.meta?.hidden">
    <a-menu-item
      v-if="
        isOneShowingChild &&
        (!onlyOneChild?.children || onlyOneChild?.meta?.noShowingChildren) &&
        !item?.meta?.alwaysShow
      "
      v-bind="attrs"
      :key="onlyOneChild?.path"
    >
      <template #icon>
        <GiSvgIcon
          v-if="onlyOneChild?.meta?.svgIcon || item?.meta?.svgIcon"
          :name="onlyOneChild?.meta?.svgIcon || item?.meta?.svgIcon"
          :size="24"
        ></GiSvgIcon>
        <template v-else>
          <component
            v-if="onlyOneChild?.meta?.icon || item?.meta?.icon"
            :is="onlyOneChild?.meta?.icon || item?.meta?.icon || ''"
          ></component>
        </template>
      </template>
      <span>{{ onlyOneChild?.meta?.title }}</span>
    </a-menu-item>

    <a-sub-menu v-else v-bind="attrs" :key="item.path" :title="item?.meta?.title">
      <template #icon>
        <GiSvgIcon v-if="item?.meta?.svgIcon" :name="item?.meta?.svgIcon" :size="24"></GiSvgIcon>
        <template v-else>
          <component v-if="item?.meta?.icon" :is="item?.meta?.icon || ''"></component>
        </template>
      </template>
      <MenuItem v-for="child in item.children" :key="child.path" :item="child"></MenuItem>
    </a-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

defineOptions({ name: 'MenuItem' })
const attrs = useAttrs()

interface Props {
  item: RouteRecordRaw
}

const props = withDefaults(defineProps<Props>(), {})

// 如果hidden: false那么代表这个路由项显示在左侧菜单栏中
// 如果props.item的子项chidren只有一个hidden: false的子元素, 那么onlyOneChild就表示这个子元素
const onlyOneChild = ref<RouteRecordRaw | null>(null)
const isOneShowingChild = ref(false)

const handleFunction = () => {
  const chidrens = props.item?.children?.length ? props.item.children : []
  // 判断是否只有一个显示的子项
  const showingChildrens = chidrens.filter((i) => i.meta?.hidden === false)
  if (showingChildrens.length) {
    // 保存子项最后一个hidden: false的元素
    onlyOneChild.value = showingChildrens[showingChildrens.length - 1]
  }

  // 当只有一个要显示子路由时, 默认显示该子路由器
  if (showingChildrens.length === 1) {
    isOneShowingChild.value = true
  }

  // 如果没有要显示的子路由, 则显示父路由
  if (showingChildrens.length === 0) {
    onlyOneChild.value = { ...props.item, meta: { ...props.item.meta, noShowingChildren: true } } as any
    isOneShowingChild.value = true
  }
}

handleFunction()
</script>
