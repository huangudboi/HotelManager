import { defineStore } from 'pinia'
import { MODAL_TYPE } from '@/constants'
import { ref } from 'vue'
const defaultState = {
  open: false,
  type: MODAL_TYPE.INFO,
  title: '',
  content: '',
  okText: '',
  cancelText: ''
}
export const useModalStore = defineStore('modal', () => {
  const dataModal = ref({ ...defaultState })
  const openModal = (params) => {
    dataModal.value = { ...dataModal.value, ...params }
  }
  const closeModal = () => {
    dataModal.value = { ...defaultState }
  }
  return { dataModal, closeModal, openModal }
})
