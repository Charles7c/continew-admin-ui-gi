<template>
  <a-card title="配置表单-新增">
    <template #extra>
      <a-button type="primary" status="warning" @click="onViewCode">
        <template #icon><icon-code /></template>
        <span>查看JSON配置</span>
      </a-button>
    </template>
    <a-row :gutter="30">
      <a-col :xs="24" :sm="24" :md="12">
        <GiForm ref="formRef" :options="options" v-model="form">
          <template #btns>
            <a-row justify="end" class="w-full">
              <a-space>
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="reset">重置</a-button>
              </a-space>
            </a-row>
          </template>
        </GiForm>
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
import GiForm from '@/components/GiForm'
import * as Regexp from '@/utils/regexp'
import { isMobile } from '@/utils'
import { cityOptions, deptData } from './data'

const form = reactive({
  name: '',
  phone: '',
  sort: 0,
  sex: '',
  birthday: '',
  hobbys: [],
  status: 1,
  mark: 0,
  hide: false,
  grade: 0,
  remark: ''
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
      label: '性别',
      field: 'sex',
      col: { xs: 24, sm: 12 },
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    },
    {
      type: 'date-picker',
      label: '生日',
      field: 'birthday',
      col: { xs: 24, sm: 12 }
    },
    {
      type: 'checkbox-group',
      label: '爱好',
      field: 'hobbys',
      col: { xs: 24 },
      options: [
        { label: '电影', value: '01' },
        { label: '音乐', value: '02' },
        { label: '旅行', value: '03' },
        { label: '游戏', value: '04' }
      ]
    },
    {
      type: 'input-number',
      label: '排序',
      field: 'sort',
      col: { xs: 24, sm: 12 },
      props: {
        min: 0
      }
    },
    {
      type: 'radio-group',
      label: '状态',
      field: 'status',
      col: { xs: 24, sm: 12 },
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      type: 'rate',
      label: '评分',
      field: 'mark',
      col: { xs: 24, sm: 12 }
    },
    {
      type: 'switch',
      label: '是否隐藏',
      field: 'hide',
      col: { xs: 24, sm: 12 },
      item: { extra: '隐藏成绩项' }
    },
    {
      type: 'slider',
      label: '成绩',
      field: 'grade',
      col: { xs: 24, sm: 24 },
      hide: (i) => {
        i.hide && (i.grade = 0)
        return i.hide === true
      }
    },
    {
      type: 'cascader',
      label: '城市',
      field: 'city',
      col: { xs: 24, sm: 12 },
      options: cityOptions
    },
    {
      type: 'tree-select',
      label: '部门',
      field: 'dept',
      col: { xs: 24, sm: 12 },
      data: deptData
    },
    {
      type: 'textarea',
      label: '备注',
      field: 'remark',
      span: 24,
      item: { extra: '这里是额外信息' }
    },
    {
      type: 'input',
      label: '',
      field: 'btns',
      span: 24
    }
  ]
})

const onViewCode = () => {
  Drawer.open({
    title: '数据结构',
    content: () => h(GiCodeView, { codeJson: JSON.stringify(options, null, '\t') }),
    width: isMobile() ? '100%' : 560
  })
}

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
