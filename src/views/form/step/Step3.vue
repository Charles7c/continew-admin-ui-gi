<template>
  <div class="step-3">
    <a-result status="success" title="操作成功">
      <template #subtitle>预计两小时内到账</template>
    </a-result>
    <section class="info-box">
      <a-descriptions :column="1">
        <a-descriptions-item label="付款账户：">{{ form.payAccount }}</a-descriptions-item>
        <a-descriptions-item label="收款账户：">{{ form.recAccount }}</a-descriptions-item>
        <a-descriptions-item label="收款人姓名：">{{ form.recName }}</a-descriptions-item>
        <a-descriptions-item label="转账金额：">
          <a-statistic :value="Number(form.amount)" :precision="2" :value-from="0" animation :animation-duration="600">
            <template #prefix>￥</template>
            <template #suffix>元</template>
          </a-statistic>
        </a-descriptions-item>
      </a-descriptions>
    </section>
    <a-row justify="center">
      <a-space>
        <a-button type="primary" @click="again">再转一笔</a-button>
        <a-button>查看账单</a-button>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import type { StepForm } from './type'

defineOptions({ name: 'Step3' })

const emit = defineEmits<{
  (e: 'again'): void
}>()

interface Props {
  form: Readonly<StepForm>
}

withDefaults(defineProps<Props>(), {})

// 再转一笔
const again = () => {
  emit('again')
}
</script>

<style lang="scss" scoped>
.step-3 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  .info-box {
    padding: 20px 50px;
    margin-bottom: 30px;
    background: var(--color-fill-1);
  }
}
</style>
