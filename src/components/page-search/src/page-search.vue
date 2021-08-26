<template>
  <div class="page-search">
    <hy-from v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh-right" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-from>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyFrom from '@/base-ui/from'

export default defineComponent({
  emits: ['resetBtnClick', 'queryBtnClick'],
  props: {
    searchFormConfig: {
      type: Object,
      requirte: true
    }
  },
  components: {
    HyFrom
  },
  setup(props, { emit }) {
    // 双向绑定的属性应该由配置文件中的field决定的
    // 1.优化一：formData中的属性应动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二：当用户点击重置
    const handleResetClick = () => {
      // 优化二：方式一：
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 优化二：方式二
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0px 50px 20px 0px;
}
</style>
