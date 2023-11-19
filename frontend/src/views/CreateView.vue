<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'
import axios from 'axios'
import router from '@/router'

const checkin = async(abc) => {
  const result = await axios.post('http://localhost:8080/checkin',{
    room: abc.room,
    timecheckin: currentTime,
    fullname: abc.fullname,
    phone: abc.phone,
    address: abc.address,
    email: abc.email,
    dateofbirth: abc.dateofbirth,
    cccd: abc.cccd,
    numberpeople: abc.numberpeople,
    image: imageUrl.value,
    empty: 0,
  }) ;
  return result
}

const { openModal } = useModalStore()

//Giá trị các ô input khi người dùng nhập
const formData = ref({
  fullname: '',
  phone: '',
  address: '',
  email: '',
  dateofbirth: '',
  cccd: '',
  numberpeople: '',
  room: '',
})
//Giá trị các ô input lỗi
const formError = ref({
  fullname: '',
  phone: '',
  address: '',
  email: '',
  dateofbirth: '',
  cccd: '',
  numberpeople: '',
})

//Hàm @input cho mỗi ô input, khi nhập thì sẽ tắt validate lỗi.
const removeValidate = (itemKey) => {
  formError.value[itemKey] = ''
}
// Hàm validate name
const validateName = () => {
  const name1 = formData.value.fullname
  let errorName = ''
  if (!name1) {
    errorName = 'Name is required'
  } else if (name1.length < 7) {
    errorName = 'Name haves at least 7 characters'
  } else {
    errorName = ''
  }
  formError.value.fullname = errorName
}
// Hàm validate phone
const validatePhone = () => {
  const phone1 = formData.value.phone
  let errorPhone = ''
  if (!phone1) {
    errorPhone = 'Phone is required'
  } else if (!/[0-9]/.test(phone1)) {
    errorPhone = 'Phone only contains number'
  } else if (phone1.length < 10) {
    errorPhone = 'Phone haves minimum 10 numbers'
  } else {
    errorPhone = ''
  }
  formError.value.phone = errorPhone
}
// Hàm validate address
const validateAdr = () => {
  const address1 = formData.value.address
  let errorAdr = ''
  if (!address1) {
    errorAdr = 'Address is required'
  } else {
    errorAdr = ''
  }
  formError.value.address = errorAdr
}
// Hàm validate email 
const validateEmail = () => {
  const email1 = formData.value.email
  let errorEmail = ''
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email1) {
    errorEmail = 'Email is required'
  } else if (!mailFormat.test(email1)) {
    errorEmail = 'Email must be correct format ...@...'
  } else {
    errorEmail = ''
  }
  formError.value.email = errorEmail
}

// Hàm validate date of birth
const validateDate = () => {
  const name2 = formData.value.dateofbirth
  let errorName = ''
  if (!name2) {
    errorName = 'Date of birth is required'
  } else if (name2.length < 7) {
    errorName = 'At least 7 characters'
  } else {
    errorName = ''
  }
  formError.value.dateofbirth = errorName
}
// Hàm validate cccd
const validateCccd = () => {
  const phone2 = formData.value.cccd
  let errorPhone = ''
  if (!phone2) {
    errorPhone = 'Cmt/cccd number is required'
  } else if (!/[0-9]/.test(phone2)) {
    errorPhone = 'Only contains number'
  } else if (phone2.length < 8) {
    errorPhone = 'Have minimum 8 numbers'
  } else {
    errorPhone = ''
  }
  formError.value.cccd = errorPhone
}

// Hàm validate Số ng
const validateNumberPeople = () => {
  const numberpeople = formData.value.numberpeople
  let errorKinhdo = ''
  if (!numberpeople) {
    errorKinhdo = 'Number people is required'
  } else {
    errorKinhdo = ''
  }
  formError.value.numberpeople = errorKinhdo
}

//Object này chứa các hàm validate của các trường
const validateRules = {
  fullname: { validator: validateName },
  phone: { validator: validatePhone },
  address: { validator: validateAdr },
  email: { validator: validateEmail },
  dateofbirth: { validator: validateDate },
  cccd: { validator: validateCccd },
  numberpeople: { validator: validateNumberPeople }
}
const handleValidate = () => {
  Object.keys(validateRules).forEach((key) => {
    if (validateRules[key]?.validator && typeof validateRules[key]?.validator === 'function') {
      validateRules[key].validator()
    }
  })
}

// Hàm checkForm
const checkCreate = () => {
  handleValidate() // chạy hàm validate trước khi submit form
  let isValidated = true
  Object.keys(formError.value).forEach((itemKey) => {
    if (formError.value[itemKey] !== '') {
      isValidated = false
    }
  })
  if (isValidated) {
    checkin(formData.value);
    openModal({
      open: true,
      type: MODAL_TYPE.SUCCESS,
      title: 'Success',
      content: 'Làm thủ tục check in thành công.',
      okText: 'OK'
    })
    router.replace('/report')
  } else {
    openModal({
      open: true,
      type: MODAL_TYPE.ERROR,
      title: 'Error',
      content: 'Cần nhập đúng định dạng form trước khi click Thêm mới.',
      okText: 'OK'
    })
  }
}
const imageUrl = ref(null)
const fileInput = ref(null)
const currentTime = new Date().toLocaleString('en-GB')
const handleFileUpload = () => {
  const file = fileInput.value.files[0]
  if (file) {
    // // Hiển thị thông tin về tệp hình ảnh (tên, loại, kích thước)
    // console.log("Tên tệp: " + file.name);
    // console.log("Loại tệp: " + file.type);
    // console.log("Kích thước tệp: " + file.size + " bytes")
    // // Xử lý tệp hình ảnh (ví dụ: hiển thị hình ảnh)
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result; // Đặt URL dữ liệu của hình ảnh cho hiển thị
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <div class="header">
    <RouterLink class="home" to="/">
      <Icon icon="bi-box-arrow-left" />
      <div>Quay lại trang Home</div>
    </RouterLink>
  </div>
  <header class="title">Checkin khách hàng</header>
  <div class="name">Thông tin khách hàng:</div>
  <div class="information">
    <div>
      <div class="text">
        <div class="label">Thời gian check in</div>
        <div style="margin-top: 2px; font-size: 17px;">{{ currentTime }}</div>
      </div>
      <div class="text">
        <div class="label">Tên khách hàng</div>
        <input
          type="text"
          id="fullname"
          v-model="formData.fullname"
          @blur="validateRules.fullname.validator()"
          @input="removeValidate('fullname')"
          placeholder="Enter fullname"
        />
        <div class="form-error" :class="{ active: formError.fullname }">
          {{ formError.fullname }}
        </div>
      </div>
      <div class="text">
        <div class="label">Số điện thoại</div>
        <input
          type="text"
          id="phone"
          v-model="formData.phone"
          @blur="validateRules.phone.validator()"
          @input="removeValidate('phone')"
          placeholder="Enter phone"
        />
        <div class="form-error" :class="{ active: formError.phone }">
          {{ formError.phone }}
        </div>
      </div>
      <div class="text">
        <div class="label">Địa chỉ</div>
        <input
          type="text"
          id="address"
          v-model="formData.address"
          @blur="validateRules.address.validator()"
          @input="removeValidate('address')"
          placeholder="Enter address"
        />
        <div class="form-error" :class="{ active: formError.address }">
          {{ formError.address }}
        </div>
      </div>
      <div class="text">
        <div class="label">Email</div>
        <input
          type="text"
          id="email"
          v-model="formData.email"
          @blur="validateRules.email.validator()"
          @input="removeValidate('email')"
          placeholder="Enter email"
        />
        <div class="form-error" :class="{ active: formError.email }">
          {{ formError.email }}
        </div>
      </div>
    </div>
    <div>
      <div class="text">
        <div class="label">Ngày sinh</div>
        <input
          type="text"
          id="dateofbirth"
          v-model="formData.dateofbirth"
          @blur="validateRules.dateofbirth.validator()"
          @input="removeValidate('dateofbirth')"
          placeholder="Enter date of birth"
        />
        <div class="form-error" :class="{ active: formError.dateofbirth }">
          {{ formError.dateofbirth }}
        </div>
      </div>
      <div class="text">
        <div class="label">Số CMT/CCCD</div>
        <input
          type="text"
          id="cccd"
          v-model="formData.cccd"
          @blur="validateRules.cccd.validator()"
          @input="removeValidate('cccd')"
          placeholder="Enter cmt/cccd"
        />
        <div class="form-error" :class="{ active: formError.cccd }">
          {{ formError.cccd }}
        </div>
      </div>
      <div class="text">
        <div class="label">Số người</div>
        <input
          type="text"
          id="numberpeople"
          v-model="formData.numberpeople"
          @blur="validateRules.numberpeople.validator()"
          @input="removeValidate('numberpeople')"
          placeholder="Enter number of people"
        />
        <div class="form-error" :class="{ active: formError.numberpeople }">
          {{ formError.numberpeople }}
        </div>
      </div>
      <select
        id="roomnumber"
        class="roomnumber"
        v-model="formData.room"
      >
        <option value="">--- Chọn phòng ---</option>
        <option value="TOK1-1A">Phòng TOK1-1A</option>
        <option value="TOK1-2A">Phòng TOK1-2A</option>
        <option value="TOK1-3A">Phòng TOK1-3A</option>
        <option value="TOK1-4A">Phòng TOK1-4A</option>
        <option value="TOK1-5A">Phòng TOK1-5A</option>
      </select>
      <div style="display: flex; align-items: center; gap: 5px; margin-top: 13px;">
        <label for="file">Tải ảnh lên để thêm vào data nhận diện</label>
        <Icon icon="material-symbols:upload" width="20" height="20" />
      </div>
      <div class="exel">
        <input
          type="file"
          ref="fileInput"
          name="file"
          id="fileInput"
          class="inputfile"
          @change="handleFileUpload()"
        />
      </div>
    </div>
  </div>
  <div class="button">
    <button @click="checkCreate()">Check in</button>
  </div>
</template>

<style lang="scss" scoped>
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
  padding: 20px 0 0 60px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
}
.name {
  font-size: 30px;
  font-weight: bold;
  color: #52b94e;
  margin: 0 0 15px 200px;
}
.information {
  display: flex;
  justify-content: center;
  gap: 100px;
}
.text {
  padding: 4px 0;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 15px;
  position: relative;
  margin-bottom: 12px;
}
.button > button {
  padding: 16px 70px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 20px;
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
}
.label {
  // margin: 10px 0 0px;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold;
}

.text > input {
  background: none;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 300px;
  font-size: 18px;
  outline: none;
  border: none;

  &::placeholder {
    font-size: 14px;
  }
}
.form-error {
  color: red;
  top: 100%;
  position: absolute;
}
.roomnumber{
  border: 2px solid black;
  padding: 4px 20px 4px 10px;
  border-radius: 20px;
  width: 300px;
  margin-top: 15px;
  font-size: 14px;
}
</style>
