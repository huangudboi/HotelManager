<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue';
import axios from 'axios'
import router from '@/router'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'

const { openModal } = useModalStore()

const listRoom = ref({})
const getListRoom = async() => {
  const result = await axios.get('http://localhost:8080/listroom') ;
  for(let i=0 ; i<result.data.length ; i++){
    if(result.data[i].room === "TOK1-4A"){
        listRoom.value = result.data[i]
    }
  }
}
getListRoom()

const checkout = async() => {
    const result = await axios.delete(`http://localhost:8080/checkout/${listRoom.value.Id}`)
    openModal({
      open: true,
      type: MODAL_TYPE.SUCCESS,
      title: 'Success',
      content: 'Làm thủ tục check out thành công.',
      okText: 'OK'
    })
    router.replace('/report')
    return result
}

</script>

<template>
  <div class="header">
    <RouterLink class="report" to="/report">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang quản lý</div>
    </RouterLink>
  </div>
  <header class="title">Thông tin chi tiết</header>
  <div class="room">
    <div>
      <h2 style="font-weight: bold; color: #3cd677;">Thông tin phòng:</h2>
      <div class="data">Phòng: {{ listRoom.room }}</div>
      <div class="data">Số người: {{ listRoom.numberpeople }}</div>
      <div class="data">Thời gian checkin: {{ listRoom.timecheckin }}</div>
      <div class="data">ID: {{ listRoom.Id }}</div>
    </div>
    <img class="img" v-if="listRoom.image" src=https://www.vietnambooking.com/wp-content/uploads/2018/06/co-nhung-loai-phong-khach-san-nao-02-06-18-1.jpg alt="Preview">
  </div>
  <div class="customer">
    <div>
      <h2 style="font-weight: bold; color: #3cd677;">Thông tin khách hàng:</h2>
      <div class="data">Tên khách hàng: {{ listRoom.fullname }}</div>
      <div class="data">Số điện thoại: {{ listRoom.phone }}</div>
      <div class="data">Địa chỉ: {{ listRoom.address }}</div>
      <div class="data">Email: {{ listRoom.email }}</div>
      <div class="data">Ngày sinh: {{ listRoom.dateofbirth }}</div>
      <div class="data">Số CCCD: {{ listRoom.cccd }}</div>
    </div>
    <img class="imgg" v-if="listRoom.image" :src="listRoom.image" alt="Preview">
  </div>
  <div class="button">
    <button>Lịch sử ra/vào</button>
    <button @click="checkout()">Check out</button>
  </div>
</template>

<style lang="scss" scoped>
.report {
  display: flex;
  align-items: center;
  font-size: 19px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: 0.5s;
  gap: 5px;
}
.report:hover {
  color: orange;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 0 40px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 15px;
  margin: none;
}
.customer{
    gap: 100px;
    margin: 0 0 0 350px;
    display: flex;
    >div{
        margin-top: 10px;
    }
}
.room{
    gap: 100px;
    margin: 0 0 0 350px;
    display: flex;
    >div{
        margin-top: 10px;
    }
}
.data{
    font-size: 18px;
}
.img{
    height: 30%;
    width: 30%;
    overflow: none;
}
.imgg{
    height: 20%;
    width: 20%;
    margin-top: 20px;
}
.button > button {
  padding: 6px 25px 6px 25px;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;
  margin-top: 25px;
  font-weight: bold;
  background-color: #3cd677;
}
.button > button:hover {
  background-color: #587957;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  gap: 10px;
}

</style>
