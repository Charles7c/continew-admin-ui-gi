<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    width="90%"
    :mask-closable="false"
    :modal-style="{ maxWidth: '520px' }"
    @before-ok="save"
    @close="close"
  >
    <a-spin :loading="loading" class="w-full">
      <a-form ref="formRef" :model="form" :rules="rules" size="medium" auto-label-width>
        <a-form-item label="字典名" field="name">
          <a-input v-model.trim="form.name" placeholder="请输入字典名" allow-clear :max-length="10"></a-input>
        </a-form-item>
        <a-form-item label="字典值" field="value">
          <a-input v-model.trim="form.value" placeholder="请输入字典值" allow-clear :max-length="10"></a-input>
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
    </a-spin>
  </a-modal>
</template>

<script setup lang="ts">
import { getSystemDictDataDetail, saveSystemDictData } from '@/apis'
import { Message, type FormInstance } from '@arco-design/web-vue'
import { useForm } from '@/hooks'

const formRef = ref<FormInstance>()
const dictDataId = ref('')
const isEdit = computed(() => !!dictDataId.value)
const title = computed(() => (isEdit.value ? '编辑字典数据' : '新增字典数据'))
const visible = ref(false)
const loading = ref(false)

const { form, resetForm } = useForm({
  name: '',
  value: '',
  status: 1
})

const rules: FormInstance['rules'] = {
  name: [{ required: true, message: '请输入字典名' }],
  value: [
    { required: true, message: '请输入字典值' },
    { match: /^[a-zA-Z0-9_]*$/, message: '格式不对！只能包含英文数字下划线' }
  ],
  status: [{ required: true }]
}

const add = () => {
  resetForm()
  dictDataId.value = ''
  visible.value = true
}

const edit = async (data: { id: string; code: string }) => {
  dictDataId.value = data.id
  visible.value = true
  loading.value = true
  const res = await getSystemDictDataDetail(data)
  Object.assign(form, res.data)
  loading.value = false
}

const close = () => {
  formRef.value?.resetFields()
}

defineExpose({ add, edit })

const save = async () => {
  try {
    const obj = await formRef.value?.validate()
    if (obj) return false
    const res = await saveSystemDictData(form)
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
