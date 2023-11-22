export const cityOptions = [
  {
    value: 'guangdong',
    label: '广东',
    children: [
      {
        value: '深圳',
        label: '深圳',
        children: [
          {
            value: 'longgang',
            label: '龙岗区'
          }
        ]
      },
      {
        value: 'dongguan',
        label: '东莞'
      },
      {
        value: 'aomen',
        label: '澳门'
      },
      {
        value: 'guangzhou',
        label: '广州',
        children: [
          {
            value: 'tianhequ',
            label: '天河区'
          },
          {
            value: 'yuexiuqu',
            label: '越秀区'
          }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'huangpu',
        label: '黄埔'
      }
    ]
  }
]

export const deptData = [
  {
    key: '01',
    title: '部门一',
    children: [
      {
        key: '0101',
        title: '办公室'
      }
    ]
  },
  {
    key: '02',
    title: '部门二',
    children: [
      {
        key: '0201',
        title: '宣传部'
      },
      {
        key: '0202',
        title: '组织部'
      }
    ]
  }
]
