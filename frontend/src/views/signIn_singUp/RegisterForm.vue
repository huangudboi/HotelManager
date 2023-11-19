<script setup>
  // VALIDATE Register Form:
  // 1. Fullname: không được để trống, không được chứa kí tự đặc biệt
  // 2. Username: Không được trống, tối thiểu 10 ký tự
  // 3. Email: phải đúng định dạng có @, không được để trống
  // 4. Password: không được trống, tối thiểu 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số 
  // 5. RePassword: nhập lại phải trùng

import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useModalStore } from '@/stores/modal'
import { MODAL_TYPE } from '@/constants'
import axios from 'axios'
import router from '@/router'

const { openModal } = useModalStore()

const register = async(abc) => {
  const result = await axios.post('http://localhost:8080/register',{
    fullname: abc.fullName,
    username: abc.userName,
    email: abc.email,
    password: abc.passWord,
  }) ;
  return result
}

//Giá trị các ô input khi người dùng nhập
const formData = ref({
  fullName: '',
  userName: '',
  email: '',
  passWord: '',
  rePassWord: '',
})

//Giá trị text validate khi nhập sai
const formError = ref({
  fullName: '',
  userName: '',
  email: '',
  passWord: '',
  rePassWord: '',
})

//Hàm @input cho mỗi ô input, khi nhập thì sẽ tắt validate lỗi.
const removeValidate = (itemKey) => {
  formError.value[itemKey] = ''
}
// Hàm validate Fullname
const validateName = () => {
  const nameValue = formData.value.fullName
  let errorName = ''
  if (!nameValue) {
    errorName = 'Fullname is required'
  }else if (!/^[a-zA-Z]+$/.test(nameValue)){
    errorName = "Only contain lowercase and uppercase"
  } else {
    errorName = ''
  }
  formError.value.fullName = errorName
}
// Hàm validate Username
const validateUser = () => {
  const userValue = formData.value.userName
  let errorUser = ''
  if (!userValue) {
    errorUser = 'Username is required'
  } else if (userValue.length < 7) {
    errorUser = 'User haves at least 7 characters'
  } else {
    errorUser = ''
  }
  formError.value.userName = errorUser
}
// Hàm validate Email
const validateEmail = () => {
  const emailValue = formData.value.email
  let errorEmail = ''
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!emailValue) {
    errorEmail = 'Email is required'
  }else if(!mailFormat.test(emailValue)) {
    errorEmail = 'Email must be correct format ...@...'
  } else {
    errorEmail = ''
  }
  formError.value.email = errorEmail
}
// Hàm validate Pass
const validatePass = () => {
  const passValue = formData.value.passWord
  let errorPass = ''
  if (!passValue) {
    errorPass = 'Password is required'
  }else if(!/[0-9]/.test(passValue) || !/[a-z]/.test(passValue) || !/[A-Z]/.test(passValue) ){
    errorPass = 'At least 1 uppercase, 1 lowercase, 1 number'
  }else if(passValue.length < 8){
    errorPass = 'Password haves minimum 8 characters'
  } else {
    errorPass = ''
  }
  formError.value.passWord = errorPass
}

// Hàm validate RePass nhập lại
const validateRePass = () => {
  const passValue = formData.value.passWord
  const rePassValue = formData.value.rePassWord
  let errorRePass = ''
  if (!rePassValue) {
    errorRePass = 'RePassword is required'
  }else if(passValue!==rePassValue){
    errorRePass = "Password don't match"
  } else {
    errorRePass = ''
  }
  formError.value.rePassWord = errorRePass
}

// Ẩn/hiện password
const visibility1 = ref('password')
const clickShowPass1 = () => {
  visibility1.value = 'text'
}
const clickHidePass1 = () => {
  visibility1.value = 'password'
}
// Ẩn/hiện rePassword
const visibility2 = ref('password')
const clickShowPass2 = () => {
  visibility2.value = 'text'
}
const clickHidePass2 = () => {
  visibility2.value = 'password'
}

//Object này chứa các hàm validate của các trường
const validateRules = {
  fullName: { validator: validateName },
  userName: { validator: validateUser },
  email: { validator: validateEmail },
  passWord: { validator: validatePass },
  rePassWord: { validator: validateRePass },
  
}
const handleValidate = () => {
  Object.keys(validateRules).forEach((key) => {
    if (validateRules[key]?.validator && typeof validateRules[key]?.validator === 'function') {
      validateRules[key].validator()
    }
  })
}

// Hàm checkRegister
const checkRegister = () => {
  handleValidate() // chạy hàm validate trước khi submit form
  let isValidated = true
  Object.keys(formError.value).forEach((itemKey) => {
    if (formError.value[itemKey] !== '') {
      isValidated = false
    }
  })
  if (isValidated) {
    register(formData.value)
    openModal({
      open: true,
      type: MODAL_TYPE.SUCCESS,
      title: 'Success',
      content: 'Đăng ký thành công -> Go to Login.',
      okText: 'OK'
    })
    router.replace('/login')
  } else {
    openModal({
      open: true,
      type: MODAL_TYPE.ERROR,
      title: 'Error',
      content: 'Cần nhập đúng định dạng form trước khi click Register.',
      okText: 'OK'
    })
  }
}

</script>

<template>         
<div>
  <div class="form">
    <p>Register</p>
    <div class="information">
      <div class="text">
        <div class="label">FULL NAME</div>
        <input
          type="text"
          id="fullName"
          v-model="formData.fullName"
          @blur="validateRules.fullName.validator()"
          @input="removeValidate('fullName')"
          placeholder="Enter your fullname"
        />
        <div class="form-error" :class="{ active: formError.fullName }">
          {{ formError.fullName }}
        </div>
      </div>
      <div class="text">
        <div class="label">USER NAME</div>
        <input
          type="text"
          id="useName"
          v-model="formData.userName"
          @blur="validateRules.userName.validator()"
          @input="removeValidate('userName')"
          placeholder="Enter the username"
        />
        <div class="form-error" :class="{ active: formError.userName }">
          {{ formError.userName }}
        </div>
      </div>
      <div class="text">
        <div class="label">EMAIL</div>
        <input
          type="text"
          id="email"
          v-model="formData.email"
          @blur="validateRules.email.validator()"
          @input="removeValidate('email')"
          placeholder="Enter your email"
        />
        <div class="form-error" :class="{ active: formError.email }">
          {{ formError.email }}
        </div>
      </div>
      <div class="text">
        <div class="label">PASSWORD</div>
        <input
          class="passWord"
          :type="visibility1"
          id="passWord"
          v-model="formData.passWord"
          @blur="validateRules.passWord.validator()"
          @input="removeValidate('passWord')"
          placeholder="Enter password"
        />
        <Icon class="icon" icon="fluent:eye-20-filled" @click="clickShowPass1()" v-if="visibility1==='password'"/>
        <Icon class="icon" icon="fluent:eye-off-20-filled" @click="clickHidePass1()" v-if="visibility1==='text'"/> 
        <div class="form-error" :class="{ active: formError.passWord }">
          {{ formError.passWord }}
        </div>
      </div>
      <div class="text">
        <div class="label">REPASSWORD</div>
        <input
          :type="visibility2"
          id="rePassword"
          v-model="formData.rePassWord"
          @blur="validateRules.rePassWord.validator()"
          @input="removeValidate('rePassWord')"
          placeholder="Repassword"
        />
        <Icon class="icon" icon="fluent:eye-20-filled" @click="clickShowPass2()" v-if="visibility2==='password'"/>
        <Icon class="icon" icon="fluent:eye-off-20-filled" @click="clickHidePass2()" v-if="visibility2==='text'"/> 
        <div class="form-error" :class="{ active: formError.rePassWord }">
          {{ formError.rePassWord }}
        </div>
      </div>
    </div>
    <div class="action">
      <button class="button" @click="checkRegister">Register</button>
    </div>
    <div class="haveAccount">
      <div>Do you have an account?</div>
      <RouterLink class="login" to="/login">Login</RouterLink>
    </div>
  </div>
</div>

</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,100&display=swap');
.form {
  font-family: 'Roboto', sans-serif;
  height: max-content;
  padding: 20px 50px;
  border-radius: 10px;
  background: rgba(14, 13, 13, 0.832);
  border: 2px solid black;
  backdrop-filter: blur(4px);

  .information {
    .text {
      padding: 4px 0;
      outline: none;
      border-bottom: 1px solid white;
      font-size: 15px;
      position: relative;
    }
  }
  .button {
    border: none;
    padding: 10px 120px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 20px;
    margin-top: 35px;
    margin-bottom: 0px;
    font-weight: bold;
    display: inline-block;
  }
}

.label {
  color: white;
  margin: 20px 0 0 0px;
  font-size: 15px;
  letter-spacing: 1px;
}

.text > input {
  background: none;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 350px;
  font-size: 24px;
  outline: none;
  color: white;
  border: none;

  &::placeholder {
    font-size: 17px;
  }
}

.form > p {
  color: white;
  text-align: center;
  padding-top: 5px;
  font-size: 40px;
  font-weight: bold;
}

.action > button:hover {
  background-color: orange;
}

.form > p:hover {
  color: orange;
}

.form-error {
  color: red;
  top: 100%;
  position: absolute;
}

.action {
  display: flex;
  justify-content: center;
}

.icon {
  color: white;
  font-size: 25px;
}

.haveAccount {
  display: flex;
  margin-top: 3px;
  list-style: none;
  justify-content: center;
  color: white !important;
  gap: 5px;
}

.login {
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: 0.5s;
  &:hover {
    text-decoration: underline;
  }
}

</style>
