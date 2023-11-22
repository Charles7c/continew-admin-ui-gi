<template>
  <div>
    <a-space direction="vertical" :size="20">
      <section>
        <a-space wrap fill>
          <GiTag type="dark" size="mini" closable @close="onClose">标签</GiTag>
          <GiTag type="dark" status="success" size="mini">标签</GiTag>
          <GiTag type="dark" status="warning" size="mini">标签</GiTag>
          <GiTag type="dark" status="danger" size="mini">标签</GiTag>
          <GiTag type="dark" status="info" size="mini" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag size="mini" closable @close="onClose">标签</GiTag>
          <GiTag status="success" size="mini">标签</GiTag>
          <GiTag status="warning" size="mini">标签</GiTag>
          <GiTag status="danger" size="mini">标签</GiTag>
          <GiTag status="info" size="mini" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag type="outline" size="mini" closable @close="onClose">标签</GiTag>
          <GiTag type="outline" status="success" size="mini">标签</GiTag>
          <GiTag type="outline" status="warning" size="mini">标签</GiTag>
          <GiTag type="outline" status="danger" size="mini">标签</GiTag>
          <GiTag type="outline" status="info" size="mini" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag type="light-outline" size="mini" closable @close="onClose">标签</GiTag>
          <GiTag type="light-outline" status="success" size="mini">标签</GiTag>
          <GiTag type="light-outline" status="warning" size="mini">标签</GiTag>
          <GiTag type="light-outline" status="danger" size="mini">标签</GiTag>
          <GiTag type="light-outline" status="info" size="mini" closable>标签</GiTag>
        </a-space>
      </section>
      <section>
        <a-space wrap fill>
          <GiTag type="dark">dark</GiTag>
          <GiTag type="dark" status="success" closable @close="onClose">标签</GiTag>
          <GiTag type="dark" status="warning">标签</GiTag>
          <GiTag type="dark" status="danger">标签</GiTag>
          <GiTag type="dark" status="info" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag>light</GiTag>
          <GiTag status="success" closable @close="onClose">标签</GiTag>
          <GiTag status="warning">标签</GiTag>
          <GiTag status="danger">标签</GiTag>
          <GiTag status="info" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag type="outline">outline</GiTag>
          <GiTag type="outline" status="success" closable @close="onClose">标签</GiTag>
          <GiTag type="outline" status="warning">标签</GiTag>
          <GiTag type="outline" status="danger">标签</GiTag>
          <GiTag type="outline" status="info" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag type="light-outline">light-outline</GiTag>
          <GiTag type="light-outline" status="success" closable @close="onClose">标签</GiTag>
          <GiTag type="light-outline" status="warning">标签</GiTag>
          <GiTag type="light-outline" status="danger">标签</GiTag>
          <GiTag type="light-outline" status="info" closable>标签</GiTag>
        </a-space>
      </section>
      <section>
        <a-space wrap fill>
          <GiTag type="dark" size="large">标签</GiTag>
          <GiTag type="dark" status="success" size="large">标签</GiTag>
          <GiTag type="dark" status="warning" size="large">标签</GiTag>
          <GiTag type="dark" status="danger" size="large" closable @close="onClose">标签</GiTag>
          <GiTag type="dark" status="info" size="large" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag size="large">标签</GiTag>
          <GiTag status="success" size="large">标签</GiTag>
          <GiTag status="warning" size="large">标签</GiTag>
          <GiTag status="danger" size="large" closable @close="onClose">标签</GiTag>
          <GiTag status="info" size="large" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag type="outline" size="large">标签</GiTag>
          <GiTag type="outline" status="success" size="large">标签</GiTag>
          <GiTag type="outline" status="warning" size="large">标签</GiTag>
          <GiTag type="outline" status="danger" size="large" closable @close="onClose">标签</GiTag>
          <GiTag type="outline" status="info" size="large" closable>标签</GiTag>
        </a-space>
        <a-space wrap fill>
          <GiTag type="light-outline" size="large">primary</GiTag>
          <GiTag type="light-outline" status="success" size="large">success</GiTag>
          <GiTag type="light-outline" status="warning" size="large">warning</GiTag>
          <GiTag type="light-outline" status="danger" size="large" closable @close="onClose">danger</GiTag>
          <GiTag type="light-outline" status="info" size="large" closable>info</GiTag>
        </a-space>
      </section>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'

const onClose = () => {
  Message.success('点击了关闭图标')
}
</script>
