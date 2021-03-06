// 根具环境的不同配置baseURL
// 根具环境的不同，process.env.NODE_ENV会不同
// 开发环境:development
// 生产环境:production
// 测试环境:test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV == 'development') {
  BASE_URL = '/api'
  // console.log(BASE_URL)
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  BASE_URL = 'http://coderehy.org/test'
}

export { BASE_URL, TIME_OUT }
