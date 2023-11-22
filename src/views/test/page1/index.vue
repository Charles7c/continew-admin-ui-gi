<template>
  <div class="gi_page">
    <div class="gi_box wrap">
      <a-alert>
        <span>当前页面 </span>
        <a-tag color="green">超级管理员角色</a-tag>
        <span> 能看, </span>
        <a-tag color="red">普通用户角色</a-tag>
        <span> 不能看</span>
      </a-alert>

      <a-typography-title :heading="4">当前用户权限</a-typography-title>
      <GiCodeView :code-json="JSON.stringify(userStore.permissions)"></GiCodeView>

      <a-typography-title :heading="4">当前页面角色权限</a-typography-title>
      <GiCodeView :code-json="JSON.stringify(['role_admin'])"></GiCodeView>

      <section class="item">
        <GiCodeView type="vue" :code-json="pre1"></GiCodeView>
        <a-space class="gi_mt">
          <a-button v-hasPerm="['test:btn:add']" type="primary">新增</a-button>
          <a-button v-hasPerm="['test:btn:edit']" type="primary" status="success">编辑</a-button>
          <a-button v-hasPerm="['test:btn:delete']" type="primary" status="danger">删除</a-button>
        </a-space>
      </section>

      <section class="item">
        <GiCodeView type="vue" :code-json="pre2"></GiCodeView>
        <a-space class="gi_mt">
          <a-button v-hasPerm="['user:btn:add']" type="primary">新增</a-button>
          <a-button v-hasPerm="['user:btn:edit']" type="primary" status="success">编辑</a-button>
          <a-button v-hasPerm="['user:btn:delete']" type="primary" status="danger">删除</a-button>
        </a-space>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores'

defineOptions({ name: 'TestPage1' })
const userStore = useUserStore()

const pre1 = `<a-space>
  <a-button v-hasPerm="['test:btn:add']" type="primary">新增</a-button>
  <a-button v-hasPerm="['test:btn:edit']" type="primary" status="success">编辑</a-button>
  <a-button v-hasPerm="['test:btn:delete']" type="primary" status="danger">删除</a-button>
</a-space>`

const pre2 = `<a-space>
  <a-button v-hasPerm="['user:btn:add']" type="primary">新增</a-button>
  <a-button v-hasPerm="['user:btn:edit']" type="primary" status="success">编辑</a-button>
  <a-button v-hasPerm="['user:btn:delete']" type="primary" status="danger">删除</a-button>
</a-space>`
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px;
  .item {
    margin-top: 40px;
  }
}
</style>
