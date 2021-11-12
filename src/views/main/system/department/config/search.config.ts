import { IForm } from '@/base-ui/from'
export const searchFormConfig: IForm = {
  labelWidth: '110px',
  itemStyle: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 12
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入用户名',
      options: []
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      },
      options: []
    }
  ]
}
