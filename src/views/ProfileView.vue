<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAccountStore } from '../stores/account'

import { useEvent } from '@/stores/events.js'
import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const eventStore = useEvent()
const accountStore = useAccountStore()

const userData = reactive({
  imageUrl: '',
  email: '',
  fullname: ''
})

onMounted(() => {
  const userProfile = accountStore.profile
  userData.imageUrl = (userProfile.imageUrl || 'https://picsum.photos/200')
  userData.email = userProfile.email
  userData.fullname = userProfile.fullname

})

const handleFileChange = async (event) => {
  const file = event.target.files[0]

  if (file) {
    const uploadRef = storageRef(storage, `users/${accountStore.user.uid}/${file.name}`)
    const snapshot = await uploadBytes(uploadRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    userData.imageUrl = downloadURL

  }
}

const updateProfile = async () => {
  try {
    const profileData = {
      imageUrl: userData.imageUrl,
      email: userData.email,
      fullname: userData.fullname
    }
    await accountStore.updateProfile(profileData)
    eventStore.popupMessage('success', 'Successful')
  } catch (e) {
    console.log('error', e)
  }


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
              <span class="label-text font-bold text-2xl">Role: {{ accountStore.profile.role }}</span>
            </label>
          </div>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " disabled
              v-model="userData.email" />
          </div>
          <div class="form-control w-full ">
            <label class="label">
              <span class="label-text">Fullname</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
              v-model="userData.fullname" />
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