<template>
  <div class="area">
    <a-alert>采用了vant UI的省市区的数据源</a-alert>
    <div class="wrap">
      <section class="tree-box">
        <a-tree
          block-node
          :data="treeData"
          :fieldNames="{
            key: 'code',
            title: 'label',
            children: 'children'
          }"
          :virtualListProps="{
            height: 500,
            isStaticItemHeight: true
          }"
        ></a-tree>
      </section>

      <section>
        <a-cascader
          :options="treeData"
          :field-names="{ value: 'code', label: 'label' }"
          :style="{ width: '320px' }"
          placeholder="请选择省市区"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArea } from './useArea'
const { getAreaTreeData } = useArea()

defineOptions({ name: 'Area' })
const treeData = ref([])
treeData.value = getAreaTreeData()
</script>

<style lang="scss" scoped>
.area {
  .wrap {
    display: flex;
    margin-top: 12px;
  }
  .tree-box {
    width: 270px;
    padding-left: 12px;
    border: 1px solid var(--color-border-2);
    background: var(--color-bg-2);
    margin-right: 50px;
  }
}
</style>
