<template>
  <div
    class="asider"
    :class="{ 'asider-h5': isMobile(), 'app-menu-dark': appStore.menuDark }"
    :style="appStore.menuDark ? appStore.themeCSSVar : undefined"
  >
    <template v-if="isMobile()">
      <a-drawer
        v-model:visible="appStore.menuCollapse"
        placement="left"
        :header="false"
        :footer="false"
        :render-to-body="false"
        :drawer-style="{ 'border-right': '1px solid var(--color-border-2)', 'box-sizing': 'border-box' }"
      >
        <Logo :collapsed="false"></Logo>
        <Menu :not-collapsed="true" class="menu w-full"></Menu>
      </a-drawer>
    </template>

    <template v-else>
      <Logo :collapsed="appStore.menuCollapse"></Logo>
      <a-layout-sider
        class="menu"
        collapsible
        breakpoint="xl"
        hide-trigger
        :width="220"
        :collapsed="appStore.menuCollapse"
        @collapse="handleCollapse"
      >
        <a-scrollbar outer-class="h-full" style="height: 100%; overflow: auto">
          <Menu></Menu>
        </a-scrollbar>
      </a-layout-sider>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import Menu from '../Menu/index.vue'
import Logo from '../Logo.vue'
import { isMobile } from '@/utils'

defineOptions({ name: 'Asider' })
const appStore = useAppStore()

if (isMobile()) {
  appStore.menuCollapse = false
}

const handleCollapse = (isCollapsed: boolean) => {
  if (!isMobile()) {
    appStore.menuCollapse = isCollapsed
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  .arco-menu-title {
    display: none;
  }
}

:deep(.arco-menu-vertical .arco-menu-inline-header .arco-menu-icon-suffix) {
  transition: all 0.3s;
}

:deep(.arco-drawer-body) {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.arco-layout-sider-children) {
  overflow: hidden;
}

.asider {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-2);
  box-sizing: border-box;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
  .menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }
}

.asider-h5 {
  border-right: none;
  color: inherit;
  background-color: inherit;
}
</style>
