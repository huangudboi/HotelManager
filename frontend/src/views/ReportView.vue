<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue';
import axios from 'axios'

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

const currentTime = new Date().toLocaleString('en-GB')
const currentDate = new Date().getDay()
const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

let day = days[currentDate];
let formDate = [day, currentTime].join(', ');
const empty = ref(true)

</script>

<template>
  <div class="header">
    <RouterLink class="home" to="/">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang Home</div>
    </RouterLink>
  </div>
  <header class="title">Tình trạng phòng</header>
  <div style="display: flex; align-items: center; justify-content: center;">{{ formDate }}</div>
  <div class="status">
    <div style="display: flex; align-items: center; margin: 6px 6px 6px 6px;">
        <div class="color" style="background-color: rgb(62, 183, 231);">10</div>
        <div style="font-weight: bold;">: Trống</div>
    </div>
    <div style="display: flex; align-items: center; margin: 6px 6px 6px 6px;">
        <div class="color" style="background-color: rgb(67, 230, 67);">10</div>
        <div style="font-weight: bold;">: Đang thuê</div>
    </div>
    <div style="display: flex; align-items: center; margin: 6px 6px 6px 6px;">
        <div class="color" style="background-color: rgb(230, 59, 221);">10</div>
        <div style="font-weight: bold;">: Đã đặt trước</div>
    </div>
    <div style="display: flex; align-items: center; margin: 6px 6px 6px 6px;">
        <div class="color" style="background-color: rgb(236, 178, 69);">10</div>
        <div style="font-weight: bold;">: Chuẩn bị check out</div>
    </div>
    <div style="display: flex; align-items: center; margin: 6px 6px 6px 6px;">
        <div class="color" style="background-color: rgb(167, 167, 168);">10</div>
        <div style="font-weight: bold;">: Không xác định</div>
    </div>  
  </div>
  <div class="information">
    <div>
        <!-- <div class="room" v-if="listRoom.empty === false" style="background-color: rgb(67, 230, 67);">
            <Icon icon="icon-park-solid:people" />
            <h2>Phòng TOK1-1A</h2>
            <div style="margin-bottom: 13px;">{{ listRoom.fullname }}</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>{{ listRoom.timecheckin }}</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <RouterLink class="detail checkin" to="/report/detail">Chi tiết</RouterLink>
        </div> -->
        <div class="room" :class="{ 'active': listRoom.empty===false }">
            <Icon icon="icon-park-solid:people" />
            <h2>Phòng TOK1-1A</h2>
            <div style="margin-bottom: 13px;" v-if="listRoom.empty === false">{{ listRoom.fullname }}</div>
            <div style="margin-bottom: 13px;" v-else>Trống</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div v-if="listRoom.empty === false">{{ listRoom.timecheckin }}</div>
                <div v-else>Chưa xác định</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <RouterLink class="detail checkin" to="/report/detail" v-if="listRoom.empty === false">Chi tiết</RouterLink>
            <RouterLink class="checkin" to="/createNew" v-else>Check in</RouterLink>
        </div>
        <div class="room" style="background-color: rgb(67, 230, 67);">
            <Icon icon="icon-park-solid:people" />
            <h2>Phòng TOK1-2A</h2>
            <div style="margin-bottom: 13px;">Pham Van A</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>07/10/2023 12:00</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <button>Chi tiết</button>
        </div>
        <div class="room">
            <Icon icon="icon-park-solid:people" />
            <h2>Phòng TOK1-3A</h2>
            <div style="margin-bottom: 13px;">Trống</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>Chưa xác định</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <RouterLink class="checkin" to="/createNew" v-if="empty===true">Check in</RouterLink>
            <button v-else>Chi tiết</button>
        </div>
        <div class="room" style="background-color: rgb(230, 59, 221)">
            <Icon icon="icon-park-solid:people" />
            <h2>Phòng TOK1-4A</h2>
            <div style="margin-bottom: 13px;">Nguyen Thi H</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>12/10/2023 8:00</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <button>Chi tiết</button>
        </div>
        <div class="room">
            <Icon icon="icon-park-solid:people" />
            <h2>Phòng TOK1-5A</h2>
            <div style="margin-bottom: 13px;">Trống</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>Chưa xác định</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <RouterLink class="checkin" to="/createNew" v-if="empty===true">Check in</RouterLink>
            <button v-else>Chi tiết</button>
        </div>
    </div>
    <div>
        <div class="room" style="background-color: rgb(230, 59, 221)">
            <Icon icon="bi:people-fill" />
            <h2>Phòng TOK2-1A</h2>
            <div style="margin-bottom: 13px;">Ngô Hải B</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>10/10/2023 8:00</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <button>Chi tiết</button>
        </div>
        <div class="room" style="background-color: rgb(67, 230, 67);">
            <Icon icon="bi:people-fill" />
            <h2>Phòng TOK2-2A</h2>
            <div style="margin-bottom: 13px;">Nguyễn Văn C</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>08/10/2023 8:00</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <button>Chi tiết</button>
        </div>
        <div class="room" style="background-color:rgb(236, 178, 69)">
            <Icon icon="bi:people-fill" />
            <h2>Phòng TOK2-3A</h2>
            <div style="margin-bottom: 13px;">Lê Tống V</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>05/10/2023 8:00</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>07/10/2023 12:00</div>
            </div>
            <button>Chi tiết</button>
        </div>
        <div class="room">
            <Icon icon="bi:people-fill" />
            <h2>Phòng TOK2-4A</h2>
            <div style="margin-bottom: 13px;">Trống</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>Chưa xác định</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>Chưa xác định</div>
            </div>
            <RouterLink class="checkin" to="/createNew" v-if="empty===true">Check in</RouterLink>
            <button v-else>Chi tiết</button>
        </div>
        <div class="room" style="background-color:rgb(236, 178, 69)">
            <Icon icon="bi:people-fill" />
            <h2>Phòng TOK2-5A</h2>
            <div style="margin-bottom: 13px;">Ngô Thừa D</div>
            <div class="time">
                <Icon icon="fluent-mdl2:date-time" />
                <div>06/10/2023 18:00</div>
            </div>
            <div class="time">
                <Icon icon="svg-spinners:clock" />
                <div>07/10/2023 12:00</div>
            </div>
            <button>Chi tiết</button>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active{
    background-color: rgb(67, 230, 67) !important;
}
.home {
  display: flex;
  align-items: center;
  font-size: 19px;
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: 0.5s;
  gap: 5px;
}
.home:hover {
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
  margin: none;
}
.status{
    background-color: white;
    border: 0.5px solid black;
    margin: 0 200px 0 200px;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    .color{
        border-radius: 5px;
        padding: 5px 10px 5px 10px;
        color: white;
        margin-right: 4px;
        border: 0.5px solid black;
    }
}
.information{
    margin: 0 200px 0 200px;
    border: 0.5px solid black;
    background-color: white;
    margin-top: 10px;
    border-radius: 4px;
    padding: 10px 0 10px 0;
    >div{
        display: flex;
        justify-content: space-around;
        margin: 5px 0 25px 0;
    }
    .room{
        background-color: rgb(62, 183, 231);
        border: 0.5px solid black;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .room >button{
        color: white;
        background-color: black;
        border-radius: 8px;
        border: 0.5px solid white;
        padding: 6px 8px 6px 8px;
        margin: 10px 0 18px 0;
        font-size: 13px;
    }
    .time{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
}
.checkin{
    color: white;
    background-color: black;
    border-radius: 8px;
    border: 0.5px solid white;
    padding: 2px 8px 4px 8px;
    font-size: 13px;
    margin: 10px 0 18px 0;
    text-decoration: none;
}
</style>