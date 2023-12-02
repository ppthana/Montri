<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'

import { useEvent } from '@/stores/events.js'

const eventStore = useEvent()

const userData = reactive({
  imageUrl: 'https://picsum.photos/200',
  email: '',
  Fullname: ''
})

onMounted(() => {
  const savedUserProfile = localStorage.getItem('user-profile')
  if (savedUserProfile) {
    const userProfile = JSON.parse(savedUserProfile)
    userData.imageUrl = userProfile.imageUrl
    userData.email = userProfile.email
    userData.Fullname = userProfile.Fullname
  }
})

const handleFileChange = (event) => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.imageUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = () => {
  localStorage.setItem('user-profile', JSON.stringify(userData))
  eventStore.popupMessage('success', 'Successful')
  
}
</script>

<template>
  <AdminLayout>
    <div class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md">
      <h1 class="text-2xl">Your profile</h1>
      <div class="flex flex-col items-center">
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img :src="userData.imageUrl" />
          </div>
        </div>

        <input type="file" @change="handleFileChange">

        <div class="form-control w-full mt-5">

          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text font-bold text-2xl">Role: Admin</span>
            </label>
          </div>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
              v-model="userData.email" />
          </div>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">Fullname</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
              v-model="userData.Fullname" />
          </div>
        </div>

        <button class="btn btn-primary w-full mt-4" @click="updateProfile">Update profile</button>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
input {
  border-style: inset;
}
</style>