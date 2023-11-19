import request from '../request'
import { API } from '../list-api'

const searchAPI = async() => {
  return await request.get(API.SEARCH)
}

const getWareHouseAPI = async() => {
  return await request.get(API.WAREHOUSE)
}

export { searchAPI, getWareHouseAPI }