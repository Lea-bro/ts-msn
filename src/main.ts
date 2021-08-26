import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'
import { globalRegister } from './global'
import { setupStore } from './store'

const app = createApp(App)
// globalRegister(app)

app.use(globalRegister)

app.use(store)
setupStore()
app.use(router)

app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
