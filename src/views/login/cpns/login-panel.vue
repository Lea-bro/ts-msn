<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <!--  -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="iskeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 立即登录按钮 -->
    <el-button type="primary" class="login-button" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  name: 'login-panel',
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const iskeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(iskeepPassword.value)
      } else {
        console.log('phoneRef调用login-pohone里的loginAction')
      }
    }
    return {
      iskeepPassword,
      handleLoginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
