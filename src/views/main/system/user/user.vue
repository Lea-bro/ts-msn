<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    >
    </page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      pageName="users"
    >
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </page-content>
    <page-modal
      pageName="users"
      :defaultInfo="defaultInfo"
      ref="modalRef"
      :modalConfig="modalConfigRef"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 处理密码框的是否隐藏逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      passwordItem!.isHidden = false

      // modalConfig.formItems[2].isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      passwordItem!.isHidden = true
      // modalConfig.formItems[2].isHidden = true
    }

    // 2.动态添加部门和角色列表
    // 2.1动态添加部门
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => {
        return item.field === 'departmentId'
      })
      // console.log(departmentItem)
      departmentItem!.options = store.state.entierDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      // 2.2动态添加角色
      const roleItem = modalConfig.formItems.find((item) => {
        return item.field === 'roleId'
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    // 3.调用hook获取公共变量和函数
    const { modalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      modalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
