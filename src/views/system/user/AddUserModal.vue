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
    <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
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
            disabled: 'false',
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
import { getSystemUserDetail, saveSystemUser, updateSystemUser } from '@/apis'
import type { UserItem } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { mapValues } from 'lodash'
import { useForm } from '@/hooks'

const { getRoleDict, roleDict } = useRole()
getRoleDict()
const roleOptions = computed(() => roleDict.value.map((i) => ({ label: i.label, value: i.value })))

const formRef = ref<FormInstance>()
const userId = ref('')
const isEdit = computed(() => !!userId.value)
const title = computed(() => (isEdit.value ? '编辑用户' : '新增用户'))
const visible = ref(false)

const { form, resetForm } = useForm({
  id: undefined,
  disabled: false,
  status: 1 as Status,
  gender: 1 as Gender
} as UserItem)

const rules: FormInstance['rules'] = {
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

/**
 * 打开新增弹窗
 */
const add = () => {
  userId.value = ''
  visible.value = true
  resetForm()
}

/**
 * 打开编辑弹窗
 * @param id
 */
const edit = async (id: string) => {
  visible.value = true
  userId.value = id
  const res = await getSystemUserDetail({ id })
  Object.assign(
    form,
    mapValues(res.data, (f) => (f === null ? undefined : f))
  )
}

/**
 * 关闭弹窗
 */
const close = () => {
  formRef.value?.resetFields()
}

// 父组件刷新方法
const emit = defineEmits(['reset'])

/**
 * 新增或者修改
 */
const save = async () => {
  try {
    const obj = await formRef.value?.validate()
    if (obj) return false
    let res
    if (form.id) {
      res = await updateSystemUser(form)
    } else {
      res = await saveSystemUser(form)
    }
    if (res.success) {
      Message.success(res.msg)
      emit('reset')
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

defineExpose({ add, edit })
</script>
