<script setup>
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'

</script>

<template>
  <header class="header">
    <div class="title">
      <img src="@/assets/images/logo.jpg" alt="Logo" />
      <h2 class="nameheader">PISTACHIO HOTEL</h2>
    </div>
    <div class="router">
      <RouterLink class="report button" to="/report">Danh sách phòng</RouterLink>
      <RouterLink class="createNew button" to="/createNew">Đăng ký khách hàng</RouterLink>
    </div>
    <div class="account">
      <div style="display: flex; gap: 3px; ">
        <div class="username">user1234</div>
        <el-avatar :icon="UserFilled" :size="24"/>
      </div>
      <RouterLink class="logout" to="/login">
        <div>Logout</div>
        <Icon icon="uil:signout" />
      </RouterLink>
    </div>
  </header>
  <div class="map">
    <img style="width: 320px;" src="@/assets/images/mapVN.webp" alt="" />
    <img src="@/assets/images/sanh.jpg" alt="base" />
  </div>
  <footer class="footer">
    <div class="information">
      <h1>Xin chào!</h1>
      <h2>
        Phần mềm quản lý phòng khách sạn 
      </h2>
    </div>
    <div class="contact">
      <h1>Thông tin liên hệ:</h1>
      <div>
        <div>
          <div class="icon">
            <Icon icon="solar:phone-linear" style="font-size: 16px" />
            <h1>Số điện thoại:</h1>
          </div>
          <div class="icon">
            <Icon icon="mdi-light:home" style="font-size: 16px" />
            <h1>Địa chỉ:</h1>
          </div>
          <div class="icon">
            <Icon icon="ic:outline-attach-email" style="font-size: 14px" />
            <h1>Email:</h1>
          </div>
        </div>
        <div style="margin-top: 2px">
          <h2>0908300703</h2>
          <h2>Tháp A, tòa nhà Sông Đà, Mễ Trì, Nam Từ Liêm, Hà Nội</h2>
          <h2>nguyenbalam2306@gmail.com</h2>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  height: 80px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
.title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 50px;
}
.title > img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.title > h2 {
  font-weight: bold;
  font-size: 23px;
}
.nameheader:hover {
  color: rgb(253, 253, 253);
}
.button {
  background-color: rgba(0, 0, 0, 0.37);
  color: white;
  height: max-content;
  border-radius: 20px;
  padding: 13px 10px 13px 10px;
  border: none;
  margin-right: 10px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
}
.button:hover {
  background: none;
  color: black;
}
.account {
  padding-right: 100px;
  .username {
    font-size: 18px;
  }
}

.logout {
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;
  text-decoration: none;
  transition: 0.5s;
  > div {
    font-weight: bold;
  }
}
.footer {
  background-color: rgb(5, 5, 5);
  border-radius: 30px 30px 0 0;
  color: white;
  display: flex;
  font-size: 8px;
  gap: 600px;
  padding: 0 10px 5px 180px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.map {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 18px 0;
}
.map > img {
  height: 490px;
}
.information {
  margin-top: 15px;
}
.information > h1 {
  font-weight: bold;
  color: orange;
  margin-bottom: 15px;
}
.contact{
  margin-bottom: 9px;
}
.contact > div {
  display: flex;
  gap: 50px;
}
.contact > h1 {
  font-weight: bold;
  color: orange;
  margin-top: 10px;
  margin-bottom: 5px;
}
.icon {
  display: flex;
  align-items: center;
  font-size: 6.5px;
  color: orange;
  gap: 5px;
}
</style>
