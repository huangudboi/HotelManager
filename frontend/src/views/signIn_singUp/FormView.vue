<script setup>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const props = defineProps({
    isLoginScreen: {
        type: Boolean,
        default: true,
    }
})

</script>

<template>
    <div class="background">
        <LoginForm v-if="props.isLoginScreen" />
        <RegisterForm v-else />
    </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,100&display=swap');

.background {
    background-image: url('@/assets/images/khachsan1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    width:  100%;
    height: 80%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style> 