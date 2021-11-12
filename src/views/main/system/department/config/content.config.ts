// 用户管理页的配置

export const contentTableConfig = {
  title: '部门信息',
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '100', slotName: '' },
    { prop: 'leader', label: '部门领导', minWidth: '100', slotName: '' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  showIndexColum: true,
  showSelceColum: true
}
