<template>
  <a-space direction="vertical" :size="20">
    <a-space :size="20">
      <GiDot></GiDot>
      <GiDot type="success"></GiDot>
      <GiDot type="warning"></GiDot>
      <GiDot type="danger"></GiDot>
      <GiDot type="info"></GiDot>
    </a-space>

    <a-space :size="20">
      <GiDot :animation="false"></GiDot>
      <GiDot type="success" :animation="false"></GiDot>
      <GiDot type="warning" :animation="false"></GiDot>
      <GiDot type="danger" :animation="false"></GiDot>
      <GiDot type="info" :animation="false"></GiDot>
    </a-space>
  </a-space>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
