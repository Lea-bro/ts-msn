import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

import { IAccount } from '@/service/login/type'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

import { ILoginState } from './type'
import { IRootState } from '../type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮的权限
      const permission = mapMenusToPermissions(userMenus)
      state.permissions = permission
      // console.log(permission)
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changToken', token)
      localCache.setCache('token', token)

      // 发送初始化的请求(完整的role/department),调用跟里面的dispatch
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data //请求的用户信息
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changToken', token)
        // 发送初始化的请求(完整的role/department),调用跟里面的dispatch
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
