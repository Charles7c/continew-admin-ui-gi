<template>
  <div class="images-view">
    <section
      class="image"
      ref="ImageViewRef"
      @mouseenter="showZoom = true"
      @mouseleave="showZoom = false"
      @mousemove="move"
      @click="preview"
    >
      <img class="animate__animated animate__fadeIn" :src="list[currentIndex].src" :key="currentIndex" />

      <!-- 变焦盒子 -->
      <div
        v-show="props.zoom && showZoom"
        ref="ZoomARef"
        class="zoom-a"
        :style="{ left: zoomA.left, top: zoomA.top }"
      ></div>

      <div v-show="!props.zoom" class="prev" @click="prevImage">
        <icon-left :size="20" />
      </div>
      <div v-show="!props.zoom" class="next" @click="nextImage">
        <icon-right :size="20" />
      </div>
    </section>
    <section class="foot">
      <div class="left" :class="{ disabled: page === 0 }" @click="prev">
        <icon-left />
      </div>
      <div class="scroll-box" ref="ScrollBoxRef">
        <ul
          class="list"
          :style="{
            left: `${page * -440}px`
          }"
        >
          <li
            class="list-item"
            :class="{ active: currentIndex === index }"
            v-for="(item, index) in list"
            :key="index"
            @click="onClick(index)"
          >
            <img :src="item.src" alt="" />
          </li>
        </ul>
      </div>
      <div class="right" :class="{ disabled: page === pageMax }" @click="next">
        <icon-right />
      </div>
    </section>

    <!-- 放大镜盒子 -->
    <div
      v-show="props.zoom && showZoom"
      ref="ZoomBRef"
      class="zoom-b animate__animated animate__fadeIn"
      :style="{ left: width + 10 + 'px' }"
    >
      <img
        :src="list[currentIndex].src"
        :style="{ left: zoomB.left, top: zoomB.top, width: width * proportion + 'px' }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementBounding } from '@vueuse/core'
import { api as viewerApi } from 'v-viewer'
// import 'viewerjs/dist/viewer.css'

interface Props {
  list?: { src: string }[]
  zoom?: boolean
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  list: () => {
    return [
      { src: 'https://gw.alicdn.com/imgextra/i4/2679012998/O1CN01HRyHt31Y18AGcTbKj_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i1/2679012998/O1CN017617nr1Y189xDIqY1_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i3/2679012998/O1CN01EdWirH1Y18D5EEr8x_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i1/2679012998/O1CN01vEwGAd1Y18APGtwTH_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i4/2679012998/O1CN01HRyHt31Y18AGcTbKj_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i1/2679012998/O1CN017617nr1Y189xDIqY1_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i4/2679012998/O1CN01HRyHt31Y18AGcTbKj_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i1/2679012998/O1CN017617nr1Y189xDIqY1_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i3/2679012998/O1CN01EdWirH1Y18D5EEr8x_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i1/2679012998/O1CN01vEwGAd1Y18APGtwTH_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i4/2679012998/O1CN01HRyHt31Y18AGcTbKj_!!2679012998.jpg_Q75.jpg_.webp' },
      { src: 'https://gw.alicdn.com/imgextra/i1/2679012998/O1CN017617nr1Y189xDIqY1_!!2679012998.jpg_Q75.jpg_.webp' }
    ]
  },
  zoom: false, // 放大镜模式
  autoplay: false // 自动轮播
})

const ScrollBoxRef = ref<HTMLElement | null>(null)
const { width: scrollBoxWidth } = useElementBounding(ScrollBoxRef)
const pageCount = computed(() => Math.floor(scrollBoxWidth.value / 110))

const currentIndex = ref(0) // 当前一页图片的索引
const page = ref(0) // 当前页
const pageMax = computed(() => Math.floor((props.list.length - 1) / pageCount.value)) // 一页4张图片，最大页数
const showZoom = ref(false)

// 自动滚动底部图片
const autoScroll = () => {
  if (page.value !== Math.floor(currentIndex.value / pageCount.value)) {
    page.value = Math.floor(currentIndex.value / pageCount.value)
    // console.log('page', page.value, currentIndex.value + 1)
  }
}

// 自动轮播
const onAutoPlay = () => {
  if (props.autoplay && !props.zoom) {
    setInterval(() => {
      if (currentIndex.value < props.list.length - 1) {
        currentIndex.value++
      } else if (currentIndex.value == props.list.length - 1) {
        currentIndex.value = 0
      }
      autoScroll()
    }, 2000)
  }
}

onAutoPlay()

// 点击一张图片
const onClick = (index: number) => {
  currentIndex.value = index
  autoScroll()
}

// 上一张图片
const prevImage = (e: Event) => {
  e.stopPropagation()
  currentIndex.value > 0 && currentIndex.value--
  autoScroll()
}

// 下一张图片
const nextImage = (e: Event) => {
  e.stopPropagation()
  currentIndex.value < props.list.length - 1 && currentIndex.value++
  autoScroll()
}

// 上一页
const prev = () => {
  page.value > 0 && page.value--
}

// 下一页
const next = () => {
  page.value < pageMax.value && page.value++
}

// 预览
const preview = () => {
  if (props.list.length && !props.zoom) {
    viewerApi({
      options: {
        initialViewIndex: currentIndex.value
      },
      images: props.list.map((i) => i.src)
    })
  }
}

const zoomA = reactive({ left: '0', top: '0' }) // 网格聚焦盒子
const zoomB = reactive({ left: '0', top: '0' }) // 放大视图盒子

const ImageViewRef = ref<HTMLElement | null>(null)
const { top, left, width, height } = useElementBounding(ImageViewRef)

const ZoomARef = ref<HTMLElement | null>(null)
const { width: zoomAWidth, height: zoomAHeight } = useElementBounding(ZoomARef)

const ZoomBRef = ref<HTMLElement | null>(null)
const { width: zoomBWidth } = useElementBounding(ZoomBRef)

// 放大比例
const proportion = computed(() => zoomBWidth.value / zoomAWidth.value)

// 在大图区域移动
const move = (e: MouseEvent) => {
  // console.log('width', width.value, zoomAWidth.value)
  const minX = zoomAWidth.value / 2
  const minY = zoomAHeight.value / 2
  const maxX = width.value - minX
  const maxY = height.value - minY
  // console.log('e.pageXY', e.pageX, e.pageY)
  // console.log('e.offsetXY', e.offsetX, e.offsetY)
  let ex = e.pageX - left.value
  let ey = e.pageY - top.value
  ex < minX && (ex = minX)
  ex > maxX && (ex = maxX)
  ey < minY && (ey = minY)
  ey > maxY && (ey = maxY)

  zoomA.left = ex - minX + 'px'
  zoomA.top = ey - minY + 'px'

  zoomB.left = -(ex - minX) * proportion.value + 'px'
  zoomB.top = -(ey - minY) * proportion.value + 'px'
}
</script>

<style lang="scss" scoped>
.images-view {
  flex: 1;
  // min-width: 500px;
  background-color: #fafafa;
  position: relative;

  .image {
    height: 400px;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    position: relative;

    &:hover {
      .prev,
      .next {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
      .prev {
        left: 16px;
      }

      .next {
        right: 16px;
      }
    }
    img {
      width: 100%;
    }

    .zoom-a {
      position: absolute;
      border: 1px solid #ccc;
      box-sizing: border-box;
      width: 200px;
      height: 200px;
      background-image: url('@/assets/images/zoom-point.png');
      z-index: 9;
    }

    .prev,
    .next {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 50%;
      transform: translateY(-50%) scale(0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      opacity: 0;
    }

    .prev {
      left: -50px;
    }

    .next {
      right: -50px;
    }
  }

  .foot {
    display: flex;
    height: 80px;
    margin-top: 10px;
    overflow: hidden;

    .left,
    .right {
      width: 24px;
      background-color: #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      flex-shrink: 0;
      &:not(.disabled) {
        &:active {
          background: #e8e8e8;
        }
      }
      &.disabled {
        cursor: not-allowed;
        color: #aaa;
      }
    }
    .scroll-box {
      width: 440px;
      height: 100%;
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .list {
      height: 100%;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      transition: left 0.3s;
      &-item {
        width: 100px;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;
        margin-right: 10px;
        border: 1px solid #f2f2f2;
        border-radius: 4px;
        flex-shrink: 0;
        user-select: none;
        position: relative;
        &::before {
          content: '';
          background-color: rgba(0, 0, 0, 0);
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          transition: background-color 0.3s;
        }
        &.active {
          border-color: rgb(var(--primary-6));
          &::before {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
        img {
          width: 100%;
        }
      }
    }
  }

  .zoom-b {
    position: absolute;
    top: 0;
    width: 300px;
    height: 300px;
    z-index: 10;
    overflow: hidden;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;

    img {
      position: absolute;
      object-fit: cover;
    }
  }
}
</style>
