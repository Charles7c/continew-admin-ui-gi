<template>
  <div class="detail" ref="containerRef">
    <a-affix :target="(containerRef as HTMLElement)">
      <a-page-header title="详情" subtitle="Detail Page" class="head">
        <template #extra>
          <a-button>返回</a-button>
        </template>
      </a-page-header>
    </a-affix>

    <a-card title="基本信息" :bordered="false" class="item">
      <a-descriptions
        table-layout="fixed"
        :label-style="{ width: '60px' }"
        :column="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }"
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

    <a-card title="基本信息" :bordered="false" class="item">
      <a-row justify="space-between">
        <a-col :xs="24" :sm="8" :md="8" :lg="6" :xl="6" :xxl="6" style="margin-bottom: 20px">
          <a-steps :current="2" direction="vertical">
            <a-step description="申请人:Lin">申请</a-step>
            <a-step description="审批人:尤大大">
              <span>领导审批</span>
              <template #icon><GiDot></GiDot></template>
            </a-step>
            <a-step description="Echo">财务审批</a-step>
          </a-steps>
        </a-col>

        <a-col :xs="24" :sm="16" :md="16" :lg="18" :xl="18" :xxl="18">
          <a-descriptions
            table-layout="fixed"
            layout="inline-horizontal"
            :column="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }"
          >
            <a-descriptions-item label="姓名：">李四</a-descriptions-item>
            <a-descriptions-item label="性别：">男</a-descriptions-item>
            <a-descriptions-item label="生日：">11月22日</a-descriptions-item>
            <a-descriptions-item label="城市：">北京市</a-descriptions-item>
            <a-descriptions-item label="手机号：">188 **** 8888</a-descriptions-item>
            <a-descriptions-item label="邮箱：">charles7c@126.com</a-descriptions-item>
            <a-descriptions-item label="星座：">天蝎座</a-descriptions-item>
            <a-descriptions-item label="爱好：">
              <a-space :size="5" wrap>
                <a-tag color="purple">Code</a-tag>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="座右铭：">东隅已逝，桑榆非晚</a-descriptions-item>
            <a-descriptions-item label="标签：">
              <a-space :size="5" wrap>
                <a-tag color="#f53f3f">vue3</a-tag>
                <a-tag color="#7816ff">pinia</a-tag>
                <a-tag color="#00b42a">vite</a-tag>
                <a-tag color="#165dff">ts</a-tag>
                <a-tag color="#ff7d00">arco design</a-tag>
              </a-space>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="审批流程" :bordered="false" class="item">
      <a-steps :current="2" style="margin: 20px 0">
        <a-step description="申请人:Lin">申请</a-step>
        <a-step description="Mark">
          <span>领导审批</span>
          <template #icon><GiDot></GiDot> </template>
        </a-step>
        <a-step description="Echo">财务审批</a-step>
      </a-steps>
    </a-card>

    <a-card title="其他信息" :bordered="false" class="item">
      <a-descriptions :column="1" :data="data"> </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="tsx">
defineOptions({ name: 'SeniorDetail' })

const containerRef = ref<HTMLElement | null>()

// 接口返回的数据
const detail = {
  name: 'Lin',
  sex: '男',
  birthday: '07月16日',
  city: '广州市',
  phone: '155 **** 8810',
  email: '326010228@qq.com',
  constellation: '双鱼座',
  hobbys: [
    { color: 'purple', name: '王者荣耀' },
    { color: 'magenta', name: '打疫苗' }
  ],
  motto: '哈哈哈',
  image:
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F09fc753c76d4a8575c105452c81b76ba563c0d8d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652531003&t=100230590302237a20f8e136de146f6b',
  tags: [
    { color: '#f53f3f', name: 'vue3' },
    { color: '#7816ff', name: 'pinia' },
    { color: '#00b42a', name: 'vite' },
    { color: '#165dff', name: 'ts' },
    { color: '#ff7d00', name: 'arco design' }
  ]
}

const getTagsElement = (data: { color: string; name: string }[]) => {
  return (
    <a-space size={5} wrap>
      {data.map((i) => (
        <a-tag color={i.color}>{i.name}</a-tag>
      ))}
    </a-space>
  )
}

const data = [
  { label: '姓名', value: () => detail['name'] },
  { label: '性别', value: () => detail['sex'] },
  { label: '生日', value: () => detail['birthday'] },
  { label: '城市', value: () => detail['city'] },
  { label: '手机号', value: () => detail['phone'] },
  { label: '邮箱', value: () => detail['email'] },
  { label: '星座', value: () => detail['constellation'] },
  {
    label: '爱好',
    value: () => getTagsElement(detail.hobbys)
  },
  { label: '座右铭', value: () => detail['motto'] },
  {
    label: '图片',
    value: () => <img style="width: 100%; max-width: 400px" src={detail.image} />
  },
  { label: '标签', value: () => getTagsElement(detail.tags) }
]
</script>

<style lang="scss" scoped>
:deep(.arco-steps-item-process .arco-steps-icon) {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail {
  overflow: auto;
  .head {
    background: var(--color-bg-1);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  }
  .item {
    margin: $margin;
    background: var(--color-bg-1);
    border-radius: 2px;
  }
}
</style>
