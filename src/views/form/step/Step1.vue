<template>
  <div class="step-1">
    <a-form ref="formRef" :model="form" :rules="rules" auto-label-width>
      <a-form-item label="付款账户" field="payAccount">
        <a-select v-model="form.payAccount" placeholder="请选择付款账户">
          <a-option value="326***228@qq.com">326***228@qq.com</a-option>
          <a-option value="768***579@qq.com">768***579@qq.com</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="收款账户" field="recAccount">
        <a-input-group class="w-full">
          <a-select v-model="form.payType" style="width: 150px">
            <a-option v-for="item in payMethodList" :key="item.icon" :value="item.value">
              <template #icon><GiSvgIcon :name="item.icon"></GiSvgIcon></template>
              <span>{{ item.label }}</span>
            </a-option>
          </a-select>
          <a-input v-model="form.recAccount" placeholder="请输入收款账户" />
        </a-input-group>
      </a-form-item>
      <a-form-item label="收款人姓名" field="recName">
        <a-input v-model="form.recName" placeholder="请输入收款人姓名" />
      </a-form-item>
      <a-form-item label="转账金额" field="amount">
        <a-input v-model="form.amount" placeholder="请输入转账金额">
          <template #prefix>￥</template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import type { Form } from '@arco-design/web-vue'
import type { StepForm } from './type'

defineOptions({ name: 'Step1' })

const emit = defineEmits<{
  (e: 'next', form?: StepForm): void
}>()

const payMethodList = [
  { label: '微信', value: 1, icon: 'wechat' },
  { label: '支付宝', value: 2, icon: 'alipay' }
]

const form: StepForm = reactive({
  payAccount: '',
  recAccount: '1997***6962@qq.com',
  payType: 1, // 1:微信 2: 支付宝
  recName: 'Lin',
  amount: '1980'
})

const rules = {
  payAccount: [{ required: true, message: '请选择付款账户' }],
  recAccount: [{ required: true, message: '请输入收款账户' }],
  recName: [{ required: true, message: '请输入收款人姓名' }],
  amount: [{ required: true, message: '请输入转账金额' }]
}

const formRef = ref<InstanceType<typeof Form>>()

// 下一步
const next = async () => {
  const res = await formRef.value?.validate()
  if (!res) {
    emit('next', form)
  }
}
</script>

<style lang="scss" scoped>
.step-1 {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
