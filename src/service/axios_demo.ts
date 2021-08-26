import axios from 'axios'

// axios实例
// axios.request({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   method: 'GET'
// })

//get请求模拟
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})

//3.get请求模拟，并带数据
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'coderwhy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// // post请求模拟，带数据
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'coderwhy',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

//4.axios的配置选项,全局的配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
axios
  .get('/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('/post', {
    data: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// 5.axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'coderwhy', age: 18 } }),
    axios.post('/post', { params: { name: 'coderwhy', age: 18 } })
  ])
  .then((res) => {
    console.log(res)
  })

// 6.axios的拦截器

// 拦截发送出去请求
// fn1:请求发送成功会执行的函数
// fn2:请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1.给请求添加token
    // 2.islooding动画
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
//拦截服务器返回的响应数据
// fn1:数据响应成功(服务器正常的返回了数据 20X)
// fn2:数据响应失败(服务器正常的返回了数据 20X)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('响应失败的拦截')
    return err
  }
)
