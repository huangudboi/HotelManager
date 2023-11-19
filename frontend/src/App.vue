<script setup>
import { RouterView } from 'vue-router'
import BaseModal from '@/components/BaseModal.vue'
import BaseLoading from '@/components/BaseLoading.vue'

</script>

<template>
  <RouterView />
  <BaseLoading />
  <BaseModal />
</template>

<style scoped>
</style>
