<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    width="90%"
    :modal-style="{ maxWidth: '520px' }"
    :mask-closable="false"
    @before-ok="save"
    @close="close"
  >
    <a-form ref="FormRef" :model="form" :rules="rules" size="medium" auto-label-width>
      <a-form-item label="上级部门" field="parentId" :disabled="form.disabled">
        <a-tree-select
          v-model="form.parentId"
          allow-clear
          :data="deptList"
          placeholder="请选择上级部门"
          :fieldNames="{
            key: 'id',
            title: 'name',
            disabled: 'false',
            children: 'children'
          }"
        ></a-tree-select>
      </a-form-item>
      <a-form-item label="部门名称" field="name">
        <a-input v-model.trim="form.name" placeholder="请输入部门名称" allow-clear :max-length="10"></a-input>
      </a-form-item>
      <a-form-item label="排序" field="sort">
        <a-input-number v-model="form.sort" style="width: 120px" />
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
      <a-form-item label="状态" field="status" v-if="isEdit">
        <a-switch
          type="round"
          v-model="form.status"
          :checked-value="1"
          :unchecked-value="2"
          checked-text="正常"
          unchecked-text="禁用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { useDept } from '@/hooks/app'
import { getSystemDeptDetil, saveSystemDept, updateSystemDept } from '@/apis'
import type { DeptItem } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useForm } from '@/hooks'

const FormRef = ref<FormInstance>()
const deptId = ref(0)
const visible = ref(false)
const isEdit = computed(() => !!deptId.value)
const title = computed(() => (isEdit.value ? '编辑部门' : '新增部门'))
const { deptList, getDeptList } = useDept()
getDeptList()

const { form, resetForm } = useForm({
  id: 0,
  status: 2 as Status,
  sort: 999
} as DeptItem)

const rules = {
  parentId: [{ required: true, message: '请选择上级部门' }],
  name: [
    { required: true, message: '请输入部门名称' },
    {
      match: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}$/,
      message: '长度为 2 到 30 位，可以包含中文、字母、数字、下划线，短横线'
    }
  ]
}

/**
 * 打开新增弹窗
 * @param item 部门数据
 */
const add = async (item: DeptItem | undefined) => {
  await getDeptList()
  deptId.value = 0
  visible.value = true
  form.parentId = item?.id
  resetForm()
}

/**
 * 打开编辑弹窗
 * @param id 部门ID
 */
const edit = async (id: number) => {
  await getDeptList()
  deptId.value = id
  const res = await getSystemDeptDetil({ id })
  Object.assign(form, res.data)
  visible.value = true
}

/**
 * 关闭 新增/编辑 弹窗
 */
const close = () => {
  FormRef.value?.resetFields()
}

defineExpose({ add, edit })

// 父组件刷新方法
const emit = defineEmits(['reset'])

/**
 * 新增或者修改
 */
const save = async () => {
  try {
    const obj = await FormRef.value?.validate()
    if (obj) return false
    let res
    if (form.id) {
      res = await updateSystemDept(form)
    } else {
      res = await saveSystemDept(form)
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
</script>
