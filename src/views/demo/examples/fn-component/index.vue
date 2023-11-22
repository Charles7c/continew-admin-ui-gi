<template>
  <div class="fn-component">
    <a-space>
      <a-button type="primary" status="success" @click="onSuccess">成功</a-button>
      <a-button type="primary" status="warning" @click="onWarning">警告</a-button>
      <a-button type="primary" status="danger" @click="onError">错误</a-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import Message from './Message/index'

const onSuccess = () => {
  Message({ type: 'success' })
}

const onWarning = () => {
  Message({ type: 'warning' })
}

const onError = () => {
  Message({ type: 'error' })
}
</script>

<style lang="scss" scoped>
.fn-component {
  flex: 1;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-size: cover;
  background-image: url('https://www4.bing.com//th?id=OHR.MidAutumn2022_ZH-CN9825550508_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp');
  // background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC);
}
</style>
