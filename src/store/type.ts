import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/type'

export interface IRootState {
  name: string
  age: number
  entierDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
export interface IRootwithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootwithModule
