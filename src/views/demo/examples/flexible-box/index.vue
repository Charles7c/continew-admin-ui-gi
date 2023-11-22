<template>
  <div class="shrink-box">
    <section class="left">
      <a-button type="outline" @click="visible = !visible">点击</a-button>
      <a-typography :style="{ marginTop: '20px' }">
        <a-typography-title> Design system </a-typography-title>
        <a-typography-paragraph>
          A design is a plan or specification for the construction of an object or system or for the implementation of
          an activity or process, or the result of that plan or specification in the form of a prototype, product or
          process. The verb to design expresses the process of developing a design.
        </a-typography-paragraph>
        <a-typography-paragraph>
          In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some
          engineering, coding, and graphic design) may also be considered
          <a-typography-text bold>to be a design activity.</a-typography-text>
        </a-typography-paragraph>
        <a-typography-paragraph>
          A design is a plan or specification for the construction of an object or system or for the implementation of
          an activity or process, or the result of that plan or specification in the form of a prototype, product or
          process. The verb to design expresses the process of developing a design. In some cases, the direct
          construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and
          graphic design) may also be considered to be a design activity.
        </a-typography-paragraph>
      </a-typography>
    </section>
    <GiFlexibleBox v-model="visible">
      <a-card title="用户认证信息" :bordered="false" class="right">
        <template #extra>
          <a-space>
            <a-button type="outline" @click="relieve">解除认证</a-button>
            <a-button type="primary">编辑</a-button>
          </a-space>
        </template>
        <div class="content">
          <a-descriptions :column="1" size="medium">
            <a-descriptions-item label="工号">RY68709</a-descriptions-item>
            <a-descriptions-item label="姓名">张三</a-descriptions-item>
            <a-descriptions-item label="所属网点">网点1</a-descriptions-item>
            <a-descriptions-item label="用户类型">服务人员</a-descriptions-item>
            <a-descriptions-item label="身份证正面">
              <div class="card"></div>
            </a-descriptions-item>
            <a-descriptions-item label="身份证反面">
              <div class="card"></div>
            </a-descriptions-item>
            <a-descriptions-item label="银行卡卡号">6217003320028396275</a-descriptions-item>
            <a-descriptions-item label="持卡人姓名">张三</a-descriptions-item>
          </a-descriptions>
        </div>
      </a-card>
    </GiFlexibleBox>
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue'

const visible = ref(true)

// 解除认证
const relieve = () => {
  Modal.warning({
    title: '提示',
    content: '确认解除某某某的用户认证？',
    hideCancel: false
  })
}
</script>

<style lang="scss" scoped>
.shrink-box {
  flex: 1;
  height: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid $color-border;
  box-sizing: border-box;
  .left {
    flex: 1;
    padding: $padding;
    overflow-y: auto;
    background: var(--color-bg-2);
  }
  .right {
    width: 100%;
    height: 100%;
    border-left: 1px solid $color-border;
    .content {
      padding: 20px;
      box-sizing: border-box;
      .card {
        width: 300px;
        height: 150px;
        background-color: rgb(var(--gray-2));
        border-radius: 6px;
      }
    }
  }
}
</style>
