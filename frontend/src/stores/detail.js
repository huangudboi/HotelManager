import { defineStore } from 'pinia'
import { ref } from 'vue'
import { detailAPI } from '@/api/order/index'

const defaultState = {

}

export const useDetailStore = defineStore('detail', () => {
  const dataDetail = ref({ ...defaultState })
  const getData = async (params) => {
    const response = await detailAPI(params)
    if (response.status == 1) {
      dataDetail.value = { ...dataDetail.value, ...response.data }
      return response
    }
    return null
  }
  return { getData, dataDetail}
})
