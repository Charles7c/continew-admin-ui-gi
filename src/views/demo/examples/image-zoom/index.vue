<template>
  <div class="image-zoom">
    <a-row>
      <ImageView :zoom="true"></ImageView>
      <section class="right"></section>
    </a-row>

    <a-row class="bbb">
      <ImageView :zoom="false" autoplay></ImageView>
      <section class="right"></section>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import ImageView from './ImageView/index.vue'
</script>

<style lang="scss" scoped>
.bbb {
  margin-top: 40px;
}
.right {
  flex: 1;
  height: 100%;
  background-color: skyblue;
}
</style>
