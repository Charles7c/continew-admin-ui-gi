<template>
  <a-card title="配置表单-动态级联">
    <template #extra>
      <!-- <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看JSON配置</span>
      </a-button> -->
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" :options="options" v-model="form">
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">提交</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <a-alert type="warning" class="gi_mb">具体配置看源码</a-alert>
        <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { GiForm, type Options } from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import { getAreaList } from '@/apis'

const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  area: ''
})

onMounted(() => {
  form.province = '440000'
  form.city = '440300'
  form.area = '440307'
})

const formRef = ref<InstanceType<typeof GiForm>>()

const options: Options<typeof form> = reactive({
  form: {},
  btns: { hide: true },
  columns: [
    {
      type: 'input',
      label: '姓名',
      field: 'name',
      col: { xs: 24, sm: 12 },
      props: {
        maxLength: 4
      },
      rules: [
        { required: true, message: '请输入姓名' },
        { maxLength: 4, message: '姓名不超过4个字符' },
        { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
      ]
    },
    {
      type: 'input',
      label: '手机',
      field: 'phone',
      col: { xs: 24, sm: 12 },
      props: {
        maxLength: 11
      },
      rules: [
        { required: true, message: '请输入手机号' },
        { match: Regexp.Phone, message: '手机号格式不正确' }
      ]
    },
    {
      type: 'select',
      label: '省',
      field: 'province',
      col: { xs: 24, sm: 12, md: 12, lg: 8 },
      request: () => getAreaList({ type: 'province' }),
      resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),
      cascader: ['city'],
      init: true
    },
    {
      type: 'select',
      label: '市',
      field: 'city',
      col: { xs: 24, sm: 12, md: 12, lg: 8 },
      request: (form) => getAreaList({ type: 'city', code: form.province }),
      resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code })),
      cascader: ['area']
    },
    {
      type: 'select',
      label: '区',
      field: 'area',
      col: { xs: 24, sm: 12, md: 12, lg: 8 },
      request: (form) => getAreaList({ type: 'area', code: form.city }),
      resultFormat: (res) => res.data.map((i: any) => ({ label: i.label, value: i.code }))
    },
    {
      type: 'input',
      label: '',
      field: 'btns',
      span: 24
    }
  ]
})

const save = async () => {
  const error = await formRef.value?.formRef?.validate()
  if (error) return false
  Message.success('验证通过')
}

const reset = () => {
  formRef.value?.formRef?.resetFields()
}
</script>

<style lang="scss" scoped></style>
