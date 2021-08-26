import hyRequest from '../index'

import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = './login',
  LoginUserInfo = '/users/', //用法： /users/1
  UserMenus = '/role/' //用法： /role/1/menu
}

// 请求用户登录返回的token
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户的信息
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 用户菜单的请求
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
