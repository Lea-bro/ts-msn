type TFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  type: TFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
