<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    width="90%"
    :mask-closable="false"
    :modal-style="{ maxWidth: '600px' }"
    @before-ok="save"
    @close="close"
  >
    <a-form ref="FormRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-row>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form-item label="用户名" field="username">
            <a-input
              v-model.trim="form.username"
              placeholder="请输入用户名"
              allow-clear
              :disabled="form.disabled"
              :max-length="10"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form-item label="昵称" field="nickname">
            <a-input v-model.trim="form.nickname" placeholder="请输入昵称" allow-clear :max-length="10"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form-item label="手机号码" field="phone">
            <a-input v-model.trim="form.phone" placeholder="请输入手机号码" allow-clear :max-length="11"></a-input>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" :xxl="12">
          <a-form-item label="邮箱" field="email">
            <a-input v-model.trim="form.email" placeholder="请输入邮箱" allow-clear :max-length="30"></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="性别" field="gender">
        <a-radio-group v-model="form.gender">
          <a-radio :value="1">男</a-radio>
          <a-radio :value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="所属部门" field="deptId">
        <a-tree-select
          v-model="form.deptId"
          :data="deptList"
          :fieldNames="{
            key: 'id',
            title: 'name'
          }"
          placeholder="请选择所属部门"
          allow-clear
          allow-search
          :disabled="form.disabled"
        />
      </a-form-item>

      <a-form-item label="角色" field="roleIds" :disabled="form.disabled">
        <a-select
          v-model="form.roleIds"
          :options="roleOptions"
          placeholder="请选择所属角色"
          multiple
          allow-clear
          :allow-search="{ retainInputValue: true }"
        />
      </a-form-item>

      <a-form-item label="描述" field="description">
        <a-textarea
          v-model.trim="form.description"
          :max-length="200"
          placeholder="请填写描述"
          :auto-size="{ minRows: 3 }"
          show-word-limit
        />
      </a-form-item>

      <a-form-item label="状态" field="status">
        <a-switch
          type="round"
          v-model="form.status"
          :checked-value="1"
          :unchecked-value="0"
          checked-text="正常"
          unchecked-text="禁用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { useDept, useRole } from '@/hooks/app'
import * as Regexp from '@/utils/regexp'
import { getSystemUserDetail, saveSystemUser } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'

const { roleList, getRoleList } = useRole()
getRoleList()
const roleOptions = computed(() => roleList.value.map((i) => ({ label: i.name, value: i.code })))

const FormRef = ref<FormInstance>()
const userId = ref('')
const isEdit = computed(() => !!userId.value)
const title = computed(() => (isEdit.value ? '编辑用户' : '新增用户'))
const visible = ref(false)

const form = reactive({
  id: '',
  username: '', // 用户名
  nickname: '', // 昵称
  gender: 1 as Gender, // 性别 1男 2女
  phone: '', // 手机号
  email: '', // 邮箱
  deptId: '', // 部门
  roleIds: [], // 角色(可能多个)
  description: '', // 描述
  status: 1 as Status, // 状态 0禁用 1启用(正常)
  type: 2, // 类型 1系统内置(admin是系统内置) 2自定义
  disabled: false // 如果 type===1 这为 true, 主要作用是列表复选框禁用状态
})

const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, max: 4, message: '长度在 2 - 4个字符' }
  ],
  nickname: [
    { required: true, message: '请输入昵称' },
    { min: 2, max: 4, message: '长度在 2 - 4个字符' }
  ],
  email: [{ match: Regexp.Email, message: '邮箱格式不正确' }],
  phone: [{ match: Regexp.Phone, message: '手机号格式不正确' }],
  deptId: [{ required: true, message: '请选择所属部门' }],
  roleIds: [{ required: true, message: '请选择角色' }],
  status: [{ required: true, message: '请选择状态' }]
}

const { deptList, getDeptList } = useDept()
getDeptList()

const add = () => {
  userId.value = ''
  visible.value = true
}

const edit = async (id: string) => {
  visible.value = true
  userId.value = id
  const res = await getSystemUserDetail({ id })
  Object.assign(form, res.data)
}

const close = () => {
  FormRef.value?.resetFields()
}

defineExpose({ add, edit })

const save = async () => {
  try {
    const obj = await FormRef.value?.validate()
    if (obj) return false
    const res = await saveSystemUser(form)
    if (res.data) {
      Message.success('模拟保存成功')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}
</script>
