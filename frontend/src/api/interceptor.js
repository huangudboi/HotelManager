import { LIST_API_NOT_AUTHENTICATE } from './list-api'
import { getLocalStorageByItem } from '@/constants/utils'
import { useModalStore } from '@/stores/modal'
import { useLoadingStore } from '@/stores/loading'
import { MODAL_TYPE } from '@/constants'
import { API } from './list-api'
function setup(instance) {
  instance.interceptors.request.use(
    function (config) {
      const { setLoading } = useLoadingStore()
      setLoading(true)
      if (config?.url ? !LIST_API_NOT_AUTHENTICATE.includes(config.url) : false) {
        const token = getLocalStorageByItem('USER_LOGIN')
        if (token) {
          config.headers.Authorization = `Bearer ${token.token}`
        }

        //config export file xlsx
        if (config?.url === API.LABEL || config?.url === API.NUMBERORDER || config?.url === API.EFFICIENCY) {
          config.responseType = 'arraybuffer'
        }
        //end config export file xlsx
      }

      return config
    },
    function (err) {
      return Promise.reject(err)
    }
  )
}

function checkToken(instance) {
  instance.interceptors.response.use(
    (response) => {
      const { openModal } = useModalStore()
      const { setLoading } = useLoadingStore()
      setLoading(false)
      let errorMessage = ''
      if (response?.data) {
        if (response?.data[0]?.defaultMessage) {
          errorMessage = response.data[0].defaultMessage
        } else {
          return response.data
        }
      } else if (response?.error) {
        errorMessage = 'ERROR DATA'
      } else {
        return response.data
      }
      if (errorMessage) {
        openModal({
          open: true,
          type: MODAL_TYPE.ERROR,
          title: 'Error',
          content: errorMessage,
          okText: 'OK'
        })
      }
    },
    (error) => {
      const { openModal } = useModalStore()
      const { setLoading } = useLoadingStore()
      setLoading(false)
      if (String(error?.response?.status) === '401') {
        localStorage.removeItem('USER_LOGIN')
      }
      let content = ''
      if (error?.response?.data?.data?.length) {
        content =
          error?.response?.data?.data[0]?.defaultMessage ||
          error?.response?.data?.message ||
          'Error'
      } else {
        content = error.message
      }
      openModal({
        open: true,
        type: MODAL_TYPE.ERROR,
        title: 'Error',
        content: content,
        okText: 'OK'
      })
      return {
        success: false,
        message: 'Error system',
        data: error?.response?.data || error.message
      }
    }
  )
}

export { setup, checkToken }
