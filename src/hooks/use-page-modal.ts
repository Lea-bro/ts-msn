// 添加用户/编辑用户
import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  // 新建
  const handleNewData = () => {
    defaultInfo.value = {}
    if (modalRef.value) {
      modalRef.value.dialogVisible = true
      // modalRef.value.formData = {}
    }
    // if (newCb) newCb()
    newCb && newCb()
  }
  // 点击编辑后操作
  const handleEditData = (item: any) => {
    // console.log(item)
    defaultInfo.value = { ...item }
    if (modalRef.value) {
      modalRef.value.dialogVisible = true
      // modalRef.value.formData = item
    }
    // if (editCb) editCb()
    editCb && editCb(item)
  }

  return { modalRef, defaultInfo, handleNewData, handleEditData }
}
