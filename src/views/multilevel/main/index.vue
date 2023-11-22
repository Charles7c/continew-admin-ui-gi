<template>
  <div class="multilevel" :class="{ 'multilevel-h5': isMobile() }">
    <div class="tabs">
      <a-tabs hide-content size="medium" :active-key="selectedKeys" @change="(key) => toPage(String(key))">
        <a-tab-pane v-for="item in list" :key="item.path" :title="item.name"> </a-tab-pane>
      </a-tabs>
    </div>

    <div class="main-box">
      <div class="menu">
        <a-menu :selected-keys="selectedKeys">
          <a-menu-item v-for="item in list" :key="item.path" @click="toPage(item.path)">
            <template #icon>
              <icon-menu></icon-menu>
            </template>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="content">
        <ParentView></ParentView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isMobile } from '@/utils'
defineOptions({ name: 'MultilevelIndex' })

const route = useRoute()
const router = useRouter()

const selectedKeys = ref('')
watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = newPath
  },
  { immediate: true }
)

const list = [
  { name: '个人中心', value: 1, path: '/multilevel/index/user' },
  { name: '消息通知', value: 2, path: '/multilevel/index/notice' }
]

const toPage = (path: string) => {
  router.push({ path: path })
  selectedKeys.value = path
}
</script>

<style lang="scss" scoped>
.multilevel {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .tabs {
    display: none;
    background-color: var(--color-bg-1);
  }

  .main-box {
    flex: 1;
    overflow: hidden;
    display: flex;
    .menu {
      width: 220px;
      margin-top: $margin;
      margin-left: $margin;
    }
    .content {
      flex: 1;
      height: 100%;
      padding: $margin;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}

.multilevel-h5 {
  flex-direction: column;
  .tabs {
    display: block;
  }
  .menu {
    display: none;
  }
}
</style>
