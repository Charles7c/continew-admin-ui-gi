<template>
  <div class="step-2">
    <a-descriptions :column="1">
      <a-descriptions-item label="付款账户">{{ form.payAccount }}</a-descriptions-item>
      <a-descriptions-item label="收款账户">{{ form.recAccount }}</a-descriptions-item>
      <a-descriptions-item label="收款人姓名">{{ form.recName }}</a-descriptions-item>
      <a-descriptions-item label="转账金额">{{ form.amount }}</a-descriptions-item>
    </a-descriptions>

    <a-divider type="dashed" />

    <a-form ref="formRef" :model="step2Form" :rules="rules" auto-label-width>
      <a-form-item label="支付密码" field="password">
        <a-input-password v-model="step2Form.password" placeholder="请输入支付密码" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" :loading="loading" @click="next">提交</a-button>
          <a-button @click="prev">上一步</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import type { Form } from '@arco-design/web-vue'
import type { StepForm } from './type'

defineOptions({ name: 'Step2' })

const emit = defineEmits<{
  (e: 'next', form?: StepForm): void
  (e: 'prev'): void
}>()

interface Props {
  form: Readonly<StepForm>
}

withDefaults(defineProps<Props>(), {})

const step2Form = reactive({
  password: '123456'
})

const rules = {
  password: [{ required: true, message: '请输入密码' }]
}

const loading = ref(false)
const formRef = ref<InstanceType<typeof Form>>()

// 下一步|提交
const next = async () => {
  loading.value = true
  const res = await formRef.value?.validate()
  if (!res) {
    setTimeout(() => {
      emit('next')
      loading.value = false
    }, 1000)
  }
}

// 上一步
const prev = () => {
  emit('prev')
}
</script>

<style lang="scss" scoped>
.step-2 {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
