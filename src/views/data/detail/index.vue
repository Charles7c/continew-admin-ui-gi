<template>
  <div class="detail" ref="containerRef">
    <a-affix :target="(containerRef as HTMLElement)">
      <a-page-header title="详情" @back="back" class="head">
        <template #extra>
          <a-button @click="back">返回</a-button>
        </template>
      </a-page-header>
    </a-affix>

    <a-card title="基本信息">
      <a-descriptions
        table-layout="fixed"
        :label-style="{ width: '60px' }"
        :column="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }"
      >
        <a-descriptions-item label="姓名">李四</a-descriptions-item>
        <a-descriptions-item label="性别">男</a-descriptions-item>
        <a-descriptions-item label="生日">11月22日</a-descriptions-item>
        <a-descriptions-item label="城市">北京市</a-descriptions-item>
        <a-descriptions-item label="手机号">188 **** 8888</a-descriptions-item>
        <a-descriptions-item label="邮箱">charles7c@126.com</a-descriptions-item>
        <a-descriptions-item label="星座">天蝎座</a-descriptions-item>
        <a-descriptions-item label="爱好">
          <a-space :size="5" wrap>
            <a-tag color="purple">Code</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭">东隅已逝，桑榆非晚</a-descriptions-item>
        <a-descriptions-item label="标签">
          <a-space :size="5" wrap>
            <a-tag color="#f53f3f">vue3</a-tag>
            <a-tag color="#7816ff">pinia</a-tag>
            <a-tag color="#00b42a">vite</a-tag>
            <a-tag color="#165dff">ts</a-tag>
            <a-tag color="#ff7d00">arco design</a-tag>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="其他信息">
      <a-descriptions :column="1">
        <a-descriptions-item label="姓名">李四</a-descriptions-item>
        <a-descriptions-item label="性别">男</a-descriptions-item>
        <a-descriptions-item label="生日">11月22日</a-descriptions-item>
        <a-descriptions-item label="城市">北京市</a-descriptions-item>
        <a-descriptions-item label="手机号">188 **** 8888</a-descriptions-item>
        <a-descriptions-item label="邮箱">charles7c@126.com</a-descriptions-item>
        <a-descriptions-item label="星座">天蝎座</a-descriptions-item>
        <a-descriptions-item label="爱好">
          <a-space :size="5" wrap>
            <a-tag color="purple">Code</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭">东隅已逝，桑榆非晚</a-descriptions-item>
        <a-descriptions-item label="图像">
          <a-image
            width="100%"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F09fc753c76d4a8575c105452c81b76ba563c0d8d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652531003&t=100230590302237a20f8e136de146f6b"
            style="max-width: 400px"
          ></a-image>
        </a-descriptions-item>
        <a-descriptions-item label="标签">
          <a-space :size="5" wrap>
            <a-tag color="#f53f3f">vue3</a-tag>
            <a-tag color="#7816ff">pinia</a-tag>
            <a-tag color="#00b42a">vite</a-tag>
            <a-tag color="#165dff">ts</a-tag>
            <a-tag color="#ff7d00">arco design</a-tag>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DataDetail' })

const router = useRouter()
const containerRef = ref<HTMLElement | null>()

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
:deep(.arco-card) {
  margin: $margin;
}

.detail {
  overflow: auto;
  .head {
    background: var(--color-bg-1);
  }
}
</style>
