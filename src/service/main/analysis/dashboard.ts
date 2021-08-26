import hyRequest from '@/service'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsFavor = '/goods/category/favor',
  categoryGoodsSale = '/goods/category/sale',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return hyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale() {
  return hyRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
