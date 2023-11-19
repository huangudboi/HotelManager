import { defineStore } from 'pinia'
import { addNewAPI } from '@/api/order/index'
import { deleteOrderAPI } from '@/api/order/index'
import { changeStatusAPI } from '@/api/order/index'
import { ref } from 'vue'
import { MODAL_TYPE } from '@/constants'
import { useModalStore } from './modal'

const defaultState = {
    supplierName: '',
    supplierEmail: '',
    supplierPhoneNumber: '',
}

export const useOrderStore = defineStore('neworder', () => {
    const listDataOrder = ref({ ...defaultState })
    const addnew = async (params) => {
        const response = await addNewAPI(params)
        if (response?.success||response.status===1) {
            listDataOrder.value = { ...listDataOrder.value, ...response.data }
            return response
        }
        return null
    }
    const deleteOrder = async (params) => {
        const response = await deleteOrderAPI(params)
        return response
    }
    const changeOrder = async (params) => {
        const {openModal} = useModalStore()
        const response = await changeStatusAPI(params)
        if(response.status===0){
            openModal ({
                open: true,
                type: MODAL_TYPE.ERROR,
                title: 'Fail',
                content: `Thay đổi trạng thái đơn hàng mã:${params.orderCode} thành công.`,
                okText: 'OK'
            })
        }
        if(response.status===1){
            openModal ({
                open: true,
                type: MODAL_TYPE.SUCCESS,
                title: 'Success',
                content: `Thay đổi trạng thái đơn hàng mã:${params.orderCode} thành công.`,
                okText: 'OK'
            })
        }
        return response
    }
    return { addnew, deleteOrder, changeOrder}
})
    