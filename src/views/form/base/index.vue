<template>
  <div class="gi_page form-base">
    <section class="gi_box">
      <a-card title="基础表单" :bordered="false">
        <template #extra>
          <a-button>返回</a-button>
        </template>
        <a-space wrap :size="30">
          <a-form ref="formRef" :model="form" :rules="rules" auto-label-width class="form">
            <a-form-item label="姓名" field="name">
              <a-input v-model="form.name" placeholder="请输入姓名" allow-clear />
              <template #extra>
                <a-typography-text type="secondary">请输入中文姓名</a-typography-text>
              </template>
            </a-form-item>
            <a-form-item label="手机号" field="phone">
              <a-input v-model="form.phone" placeholder="请输入手机号" allow-clear />
            </a-form-item>
            <a-form-item label="年龄" field="age">
              <a-input v-model="form.age" placeholder="请输入年龄" allow-clear />
            </a-form-item>

            <a-row>
              <a-col :xs="24" :sm="24" :md="12">
                <a-form-item label="性别" field="sex">
                  <a-radio-group v-model="form.sex" allow-clear>
                    <a-radio :value="1">男</a-radio>
                    <a-radio :value="2">女</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12">
                <a-form-item label="生日" field="birthday">
                  <a-date-picker v-model="form.birthday" placeholder="请选择出生日期" allow-clear />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item label="部门" field="dept">
              <a-tree-select
                :data="treeData"
                v-model="form.dept"
                multiple
                placeholder="请选择部门"
                allow-clear
              ></a-tree-select>
            </a-form-item>
            <a-form-item label="学历" field="education">
              <a-select v-model="form.education" placeholder="请选择学历" allow-clear style="width: 120px">
                <a-option :value="1">本科</a-option>
                <a-option :value="2">大专</a-option>
                <a-option :value="3">硕士</a-option>
              </a-select>
            </a-form-item>
            <a-form-item label="在校日期范围" field="rangDate">
              <a-range-picker v-model="form.rangDate" allow-clear />
            </a-form-item>
            <a-form-item label="爱好" field="hobbys">
              <a-select
                :options="hobbySelectList"
                v-model="form.hobbys"
                placeholder="请选择爱好"
                multiple
                allow-clear
              ></a-select>
            </a-form-item>
            <a-form-item field="isRead">
              <a-checkbox v-model="form.isRead">我已阅读</a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button @click="reset">重置</a-button>
                <a-button type="primary" @click="submit">提交</a-button>
              </a-space>
            </a-form-item>
          </a-form>
          <section v-if="!isMobile()">
            <GiCodeView :code-json="JSON.stringify(form, null, '\t')"></GiCodeView>
          </section>
        </a-space>
      </a-card>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import * as Regexp from '@/utils/regexp'
import { isMobile } from '@/utils'

defineOptions({ name: 'FormBase' })

const treeData = ref([
  {
    key: '01',
    title: 'XXX学校',
    children: [
      {
        key: '011',
        title: '组织部'
      },
      {
        key: '012',
        title: '宣传部'
      }
    ]
  }
])

const hobbySelectList = [
  { label: '运动', value: '运动', tagProps: { color: 'red' } },
  { label: '音乐', value: '音乐', tagProps: { color: 'green' } },
  { label: '电影', value: '电影', tagProps: { color: 'cyan' } },
  { label: '旅行', value: '旅行', tagProps: { color: 'arcoblue' } },
  { label: '美食', value: '美食', tagProps: { color: 'purple' } }
]

const form = reactive({
  name: '',
  phone: '',
  age: '',
  sex: 1,
  birthday: '',
  education: 1,
  rangDate: [],
  dept: [],
  hobbys: [],
  isRead: false
})

const rules = {
  name: [
    { required: true, message: '请输入姓名' },
    { maxLength: 4, message: '姓名不超过4个字符' },
    { match: Regexp.OnlyCh, message: '仅支持中文姓名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { match: Regexp.Phone, message: '手机号格式不正确' }
  ],
  sex: [{ required: true, message: '请选择性别' }]
}

const formRef = ref<FormInstance>()

const reset = () => {
  formRef.value?.resetFields()
}

const submit = async () => {
  const info = await formRef.value?.validate()
  if (info) return
  Message.success('提交通过')
}
</script>

<style lang="scss" scoped>
.form-base {
  .form {
    margin-top: 40px;
  }
  :deep(.vue-codemirror) {
    min-width: 300px;
  }
}
</style>
