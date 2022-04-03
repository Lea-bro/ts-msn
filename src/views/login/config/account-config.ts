// 账号登录验证规则
// 编写好规则
const rules = {
  name: [
    {
      required: true, //必传
      message: '用户名是必传内容',
      trigger: 'blur' //失去焦点检验
    },
    {
      pattern: /^[a-z0-9]{4,10}$/,
      message: '用户名必须是4-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
export { rules }
