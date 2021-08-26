import hyRequest from '@/service'
import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

//删除 url:/users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}

// 创建用户
export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
// 编辑用户
export function editPageData(url: string, newData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: newData
  })
}
