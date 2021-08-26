<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入账号" v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="account.password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import { rules } from '../config/account-config'

export default defineComponent({
  name: 'login-account',
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name' ?? ''),
      password: localCache.getCache('password' ?? '')
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (iskeepPassword: boolean) => {
      // 1.拿到formRef里的validate，会返回一个boolean值
      formRef.value?.validate((value) => {
        // 2.value值boolean类型，来判断是否验证通过
        if (value) {
          // 1、判断是否需要记录密码
          if (iskeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2、开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
