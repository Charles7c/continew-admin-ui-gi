<template>
  <div class="gi_page home" id="home">
    <WorkCard></WorkCard>

    <a-row class="row">
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <div class="item"><ProjectCard></ProjectCard></div>
        <div class="item"><MessageCard></MessageCard></div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <div class="item"><FastCard></FastCard></div>
        <div class="item"><ImageCard></ImageCard></div>
      </a-col>
    </a-row>

    <a-back-top :visible-height="100" target-container="#home">
      <GiSvgIcon name="backtop" :size="50" class="backtop-icon"></GiSvgIcon>
    </a-back-top>
  </div>
</template>

<script setup lang="ts">
import WorkCard from './components/WorkCard.vue'
import ProjectCard from './components/ProjectCard.vue'
import MessageCard from './components/MessageCard.vue'
import FastCard from './components/FastCard.vue'
import ImageCard from './components/ImageCard.vue'

defineOptions({ name: 'Home' })
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
  .row {
    padding: 6px;
    .item {
      padding: 6px;
      box-sizing: border-box;
    }
  }
  .backtop-icon {
    cursor: pointer;
  }
}
</style>
