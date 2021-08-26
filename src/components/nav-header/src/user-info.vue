<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="state"> </el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-user-solid"
            >用户信息</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-setting" disabled
            >系统管理</el-dropdown-item
          >
          <el-dropdown-item
            @click="handleExitClick"
            icon="el-icon-circle-close"
            divided
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import LocalCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const state = ref(
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    )
    const name = computed(() => {
      return store.state.login.userInfo.name
    })

    // 退出登录
    const router = useRouter()
    const handleExitClick = () => {
      LocalCache.deleteCache('token')
      router.push('/main')
    }
    return { name, state, handleExitClick }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 6px;
  }
}
</style>
