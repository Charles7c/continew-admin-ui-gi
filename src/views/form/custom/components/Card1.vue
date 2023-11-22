<template>
  <a-card title="配置表单-查询">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看JSON配置</span>
      </a-button>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm class="gi_mb" :options="options" v-model="form" @search="search" @reset="reset"></GiForm>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12">
        <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { Drawer, Message } from '@arco-design/web-vue'
import type { Options } from '@/components/GiForm'
import GiCodeView from '@/components/GiCodeView/index.vue'
import { isMobile } from '@/utils'

const form = reactive({
  name: '',
  phone: '',
  status: ''
})

const options: Options = {
  form: { layout: 'inline' },
  fold: { enable: true, index: 0 },
  btns: { col: { xs: 24, sm: 12 } },
  columns: [
    {
      type: 'input',
      label: '姓名',
      field: 'name',
      col: { xs: 24, sm: 12 },
      props: {
        maxLength: 4
      }
    },
    {
      type: 'input',
      label: '手机',
      field: 'phone',
      col: { xs: 24, sm: 12 },
      props: {
        maxLength: 11
      }
    },
    {
      type: 'select',
      label: '状态',
      field: 'status',
      col: { xs: 24, sm: 12 },
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      props: {
        placeholder: '状态'
      }
    }
  ]
}

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: JSON.stringify(options, null, '\t') }),
    width: isMobile() ? '100%' : 560
  })
}

const search = () => {
  Message.info('点击了搜索')
}

const reset = () => {
  Message.info('点击了重置')
}
</script>

<style lang="scss" scoped></style>
