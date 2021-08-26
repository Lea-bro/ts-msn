// 局部引入
import { App } from 'vue'
import registerElementt from './register-elementt'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  // registerElementt(app)
  // registerProperties(app)
  app.use(registerElementt)
  app.use(registerProperties)
}
