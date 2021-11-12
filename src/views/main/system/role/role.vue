<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      :modalConfig="modalConfig"
      pageName="role"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
      ref="modalRef"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      >
      </el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'

import { useStore } from '@/store'

import { ElTree } from 'element-plus'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        // console.log({ ...elTreeRef.value })
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const { modalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(undefined, editCallback)

    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
      // console.log(otherInfo.value)
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfig,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.el-tree {
  margin-left: 15px;
}
</style>
