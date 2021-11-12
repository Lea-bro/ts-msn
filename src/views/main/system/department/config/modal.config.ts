import { IForm } from '@/base-ui/from'
export const modalConfig: IForm = {
  labelWidth: '80px',
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'parentId',
      type: 'input',
      label: '1',
      placeholder: '请输入1'
    },
    {
      field: 'leader',
      type: 'input',
      label: '领导名称',
      placeholder: '请输入领导名称'
    }
  ]
}
