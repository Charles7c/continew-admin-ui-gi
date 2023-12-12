<template>
  <a-drawer v-model:visible="visible" title="用户详情" width="auto">
    <a-descriptions :column="{ xs: 1, sm: 1, md: 2 }" bordered size="large">
      <a-descriptions-item label="用户名">{{ user?.username }}</a-descriptions-item>
      <a-descriptions-item label="昵称">{{ user?.nickname }}</a-descriptions-item>
      <!-- <a-descriptions-item label="类型">
        <a-tag v-if="user?.type === 1" color="red">系统内置</a-tag>
        <a-tag v-if="user?.type === 2" color="orange">自定义</a-tag>
      </a-descriptions-item> -->
      <a-descriptions-item label="角色">{{ user?.roleNames }}</a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-tag v-if="user?.status === 1" color="green">正常</a-tag>
        <a-tag v-if="user?.status === 0" color="red">禁用</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="性别">
        <span v-if="user?.gender === 1">男</span>
        <span v-if="user?.gender === 2">女</span>
      </a-descriptions-item>
      <a-descriptions-item label="部门">{{ user?.deptName }}</a-descriptions-item>
      <a-descriptions-item label="联系方式">{{ user?.phone }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ user?.email }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ user?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ user?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="描述" :span="2">{{ user?.description }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts" setup>
import { getSystemUserDetail, type UserItem } from '@/apis'

const visible = ref(false)
const userId = ref(0)
const user = ref<UserItem | null>()
const getUserDetail = async () => {
  const res = await getSystemUserDetail({ id: userId.value })
  user.value = res.data
}

const open = async (id: number) => {
  userId.value = id
  await getUserDetail()
  visible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
