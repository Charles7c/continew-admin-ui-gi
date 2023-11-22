<template>
  <div class="gi_page step-form">
    <div class="wrapper">
      <section class="form-box">
        <a-steps :current="current" :direction="!isMobile() ? 'horizontal' : 'vertical'">
          <a-step description="确保填写正确">填写转账信息</a-step>
          <a-step description="确认转账信息">确认转账信息</a-step>
          <a-step description="恭喜您，转账成功">完成转账</a-step>
        </a-steps>

        <transition name="fade-slide" mode="out-in" appear>
          <keep-alive>
            <component
              :is="ComponentMap[current]"
              :form="form"
              @next="($event)=>next($event as StepForm)"
              @prev="prev"
              @again="again"
            />
          </keep-alive>
        </transition>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import type { StepForm } from './type'
import { isMobile } from '@/utils'

defineOptions({ name: 'FormStep' })

type T_ComponentMap = { [key: string]: typeof Step1 | typeof Step2 | typeof Step3 }
const ComponentMap: T_ComponentMap = {
  1: Step1,
  2: Step2,
  3: Step3
}

const current = ref(1)
const form = ref<StepForm>({
  payAccount: '', // 付款账户
  recAccount: '', // 收款账户
  payType: 1, // 支付方式 1微信支付 2支付宝支付
  recName: '', // 收款人姓名
  amount: '' // 转账金额
})

const next = (formData: StepForm) => {
  current.value++
  if (formData) {
    form.value = formData
  }
}

const prev = () => {
  current.value--
}

const again = () => {
  current.value = 1
}
</script>

<style lang="scss" scoped>
.step-form {
  .wrapper {
    min-height: 560px;
    padding: $padding;
    box-sizing: border-box;
    background: var(--color-bg-1);
    display: flex;
    justify-content: center;
  }
  .form-box {
    width: 100%;
    max-width: 560px;
    margin-top: 30px;
    flex-shrink: 0;
  }
}
</style>
