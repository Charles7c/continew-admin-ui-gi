<template>
  <a-card title="消息" :bordered="false" size="medium" class="gi_card_title">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <a-comment
        v-for="(item, index) in list"
        :key="index"
        :author="item.name"
        :datetime="item.datetime"
        align="right"
        :class="'animated-fade-up-' + index"
        style="overflow: hidden"
    >
      <template #avatar>
        <a-avatar
        ><img src="https://img0.baidu.com/it/u=2746352008,2041591833&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360"
        /></a-avatar>
      </template>
      <template #content>
        <div class="content">
          <a-tag v-if="item.type === 1" color="orangered" size="small">活动</a-tag>
          <a-tag v-if="item.type === 2" color="cyan" size="small">消息</a-tag>
          <a-tag v-if="item.type === 3" color="blue" size="small">通知</a-tag>
          <p>{{ item.content }}</p>
        </div>
      </template>
    </a-comment>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  { type: 1, name: '管理员', content: '内容最新优惠活动', datetime: '5分钟前' },
  { type: 2, name: '管理员', content: '新增内容尚未通过审核，详情请点击查看', datetime: '半小时前' },
  { type: 3, name: '管理员', content: '当前产品试用期即将结束，如需续费请点击查看', datetime: '1小时前' },
  { type: 3, name: '管理员', content: '1月新系统升级计划通知', datetime: '2天前' },
  { type: 2, name: '管理员', content: '新增内容已经通过审核，详情请点击查看', datetime: '一周前' }
]
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}
:deep(.arco-comment) {
  border-bottom: 1px solid var(--color-border-1);
  padding-bottom: 10px;
}
:deep(.arco-comment-content) {
  font-size: 12px;
  color: var(--color-text-1);
}
:deep(.arco-comment-datetime) {
  color: var(--color-text-4);
}

.content {
  display: flex;
  align-items: center;
  margin-top: 4px;
  > p {
    margin-left: 6px;
  }
}
</style>