import { Module } from 'vuex'

import { IDashboardState } from './type'
import { IRootState } from '../../type'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const { data: categoryCountResult } = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult)

      const { data: categorySaleResult } = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult)

      const { data: categoryFavorResult } = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult)

      const { data: addressGoodsSale } = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSale)
    }
  }
}
export default dashboardModule
