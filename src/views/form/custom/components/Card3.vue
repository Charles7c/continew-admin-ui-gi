<template>
  <a-card title="配置表单-弹窗">
    <a-alert>此示例编辑模式会禁用状态、是否隐藏</a-alert>
    <a-card title="表单-模态框" :bordered="true" class="gi_mt">
      <a-space>
        <a-button type="primary" @click="onAdd">新增</a-button>
        <a-button type="primary" status="success" @click="onEdit">编辑</a-button>
      </a-space>
    </a-card>

    <a-card title="表单-抽屉" :bordered="true" class="gi_mt">
      <a-space>
        <a-button type="primary" @click="onAddDrawer">新增</a-button>
        <a-button type="primary" status="success" @click="onEditDrawer">编辑</a-button>
      </a-space>
    </a-card>

    <a-drawer :title="isEdit ? '编辑' : '新增'" :width="width >= 600 ? 600 : '100%'" v-model:visible="visible">
      <GiForm :options="options" v-model="form"></GiForm>
    </a-drawer>
  </a-card>
</template>

<script setup lang="ts">
import { Modal } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'
import { cityOptions, deptData } from './data'
import { GiForm, useGiForm, type Options } from '@/components/GiForm'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const initOptions: Options = {
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
      col: { xs: 24, sm: 24 }
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
    }
  ]
}

const { options, resetOptions, setPropsValue } = useGiForm(initOptions)

const form = reactive({
  remark: '这是备注这是备注',
  status: 1
})

// watch(
//   () => form.remark,
//   () => {
//     console.log('form.remark', form.remark)
//   }
// )

const onAdd = () => {
  resetOptions()
  Modal.open({
    title: '新增',
    width: '90%',
    modalStyle: { maxWidth: '600px' },
    content: () =>
      h(GiForm, { options: options, modelValue: form, 'onUpdate:modelValue': (e) => Object.assign(form, e) })
  })
}

const onEdit = () => {
  setPropsValue('status', 'disabled', true) // 禁用 状态
  setPropsValue('hide', 'disabled', true) // 禁用 是否隐藏
  Modal.open({
    title: '编辑',
    width: '90%',
    modalStyle: { maxWidth: '600px' },
    content: () =>
      h(GiForm, { options: options, modelValue: form, 'onUpdate:modelValue': (e) => Object.assign(form, e) })
  })
}

const visible = ref(false)
const isEdit = ref(false)
const onAddDrawer = () => {
  resetOptions()
  isEdit.value = false
  visible.value = true
}

const onEditDrawer = () => {
  setPropsValue('status', 'disabled', true) // 禁用 状态
  setPropsValue('hide', 'disabled', true) // 禁用 是否隐藏
  isEdit.value = true
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
