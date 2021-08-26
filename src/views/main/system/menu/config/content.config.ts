// 用户管理页的配置

export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '140', slotName: '' },
    { prop: 'type', label: '类型', minWidth: '60', slotName: '' },
    { prop: 'url', label: '菜单url', minWidth: '110', slotName: '' },
    { prop: 'icon', label: '菜单图标', minWidth: '110', slotName: '' },
    { prop: 'permission', label: '按钮权限', minWidth: '100', slotName: '' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  showIndexColum: false,
  showSelceColum: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
