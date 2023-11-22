<template>
  <div class="table-box">
    <a-table
      :hoverable="false"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :bordered="{ cell: true }"
      :columns="columns"
      :data="tableData"
      :pagination="false"
      :span-method="spanMethod"
    >
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import XEUtils from 'xe-utils'
import soureData from './data'

const tableData = ref<any[]>([])

const columns: TableColumnData[] = [
  { title: '一级指标', dataIndex: 'name1' },
  { title: '二级指标', dataIndex: 'name2' },
  { title: '三级指标', dataIndex: 'name3' },
  { title: '四级指标', dataIndex: 'name4' },
  { title: '权重分', dataIndex: 'quotaWeight', width: 100 },
  { title: '自评分', dataIndex: 'selfScore', width: 100 },
  { title: '处室评分（百分制）', dataIndex: 'deptScore', fixed: 'right' }
]

// 将普通树结构转换为横向树列表
const toColTreeData = (treeData: any[]) => {
  console.log('treeData', treeData)
  const options = { children: 'children' }
  const list: any[] = []
  const keyMap: any = {}
  XEUtils.eachTree(
    treeData,
    (item, index, result, paths, parent) => {
      keyMap[item.id] = item
      item.keys = parent ? parent.keys.concat([item.id]) : [item.id]

      if (!item.children || !item.children.length) {
        console.log(`item${item.name}`, item)
        console.log('parent', parent)
        console.log('-------------------')
        const row: any = {}
        item.keys.forEach((key: any, index: number) => {
          const level = index + 1
          const obj = keyMap[key]
          row[`id${level}`] = obj.id
          row[`name${level}`] = obj.name
          if (level == 4) {
            row['quotaWeight'] = obj.quotaWeight
            row['selfScore'] = obj.selfScore
            row['deptScore'] = obj.deptScore
          }
        })
        list.push(row)
      }
    },
    options
  )
  console.log('list', list)
  return list
}

const spanMethod: TableInstance['$props']['spanMethod'] = ({ record, rowIndex, column }) => {
  // console.log(record, rowIndex, column, columnIndex)
  const fields = ['name1', 'name2', 'name3']
  const cellValue = record[column.dataIndex]
  if (cellValue && fields.includes(column.dataIndex)) {
    const prevRow = tableData.value[rowIndex - 1]
    console.log('上一行prevRow', prevRow)
    let nextRow = tableData.value[rowIndex + 1]
    if (prevRow && prevRow[column.dataIndex] === cellValue) {
      return { rowspan: 0, colspan: 0 }
    } else {
      let countRowspan = 1
      while (nextRow && nextRow[column.dataIndex] === cellValue) {
        nextRow = tableData.value[++countRowspan + rowIndex]
      }
      if (countRowspan > 1) {
        return { rowspan: countRowspan, colspan: 1 }
      }
    }
  }
}

// const data = transformTableData(soureData)
// console.log('一维数据', data)
// const arr = XEUtils.toArrayTree(data)
tableData.value = toColTreeData(soureData)
</script>

<style lang="scss" scoped></style>
