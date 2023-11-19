export const API = {
  LOGIN: '/login',
  REGISTER: '/register',
  SEARCH: '/search',
  DETAIL: '/orderDetail',
  CREATE: '/createOrders',
  DELETE: '/deleteOrders',
  STATUS: '/deliveryConfirm',
  WAREHOUSE: '/showAllWareHouse',
  NUMBERORDER: '/reportTotal',
  EFFICIENCY: '/reportEfficiency',
  LABEL: '/createLabel'
}

export const LIST_API_NOT_AUTHENTICATE = [API.LOGIN,API.REGISTER]
