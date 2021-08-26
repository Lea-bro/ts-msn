export interface IAccount {
  name: string
  password: string
}
// 获取token类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}
