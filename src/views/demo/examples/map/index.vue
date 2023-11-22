<template>
  <div class="map">
    <div id="container"></div>
  </div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'

const map = shallowRef(null)

const initMap = () => {
  AMapLoader.load({
    key: 'e07635e8e50a1ae1e936d204f14e386d', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map.value = new AMap.Map('container', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 5, // 初始化地图级别
        center: [105.602725, 37.076636] // 初始化地图中心点位置
      })
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  initMap()
})
</script>

<style lang="scss" scoped>
.map {
  flex: 1;
  width: 100%;
  height: 100%;
}
#container {
  width: 100%;
  height: 100%;
}
</style>
