<template>
  <div class="page">
    <section class="box">
      <a-result status="error" title="操作失败">
        <template #subtitle>表单提交失败，请重试</template>
        <template #extra>
          <a-space>
            <a-button size="medium">回到首页</a-button>
            <a-button type="primary" size="medium">返回修改</a-button>
          </a-space>
        </template>
      </a-result>
      <div class="info">
        <a-typography-paragraph>您提交的内容有如下错误：</a-typography-paragraph>
        <ul>
          <li>
            <icon-exclamation-circle-fill :size="16" style="color: rgb(var(--warning-5))" />
            <span class="tip">认证照片不够清晰</span>
            <a-link>立即修改</a-link>
          </li>
          <li>
            <icon-exclamation-circle-fill :size="16" style="color: rgb(var(--warning-5))" />
            <span class="tip">你的用户不具有此操作权限</span>
            <a-link>立即修改</a-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ResultFail' })
</script>

<style lang="scss" scoped>
.page {
  padding: $margin;
  box-sizing: border-box;
  overflow-y: auto;
  .box {
    padding: 30px;
    box-sizing: border-box;
    background-color: var(--color-bg-1);
  }
  .info {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 24px;
    margin-top: 20px;
    background: var(--color-fill-2);
    font-size: 12px;
    box-sizing: border-box;
    ul > li {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .tip {
        margin: 0 10px;
      }
      :deep(.arco-link) {
        font-size: inherit;
      }
    }
  }
}
</style>
