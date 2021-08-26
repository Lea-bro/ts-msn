<template>
  <div class="nav-header">
    <i
      class="fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldChange"
    ></i>
    <div class="content">
      <div>
        <hy-bread-crumb :breadcrumb="breadcrumbs"></hy-bread-crumb>
      </div>
      <div class="user-info">
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

import UserInfo from './user-info.vue'
import HyBreadCrumb from '@/base-ui/breadcrumb'
import { pathMapBreadCrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    UserInfo,
    HyBreadCrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const store = useStore()
    const route = useRoute()

    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据：[{name:,path:}]
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadCrumbs(userMenus, currentPath)
    })

    return { isFold, handleFoldChange, breadcrumbs }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
