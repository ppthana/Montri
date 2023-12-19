<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import LoginLayout from '@/layouts/LoginLayout.vue'


const accountStore = useAccountStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  console.log('email', email.value)
  console.log('password', password.value)
  try {
    await accountStore.signInAdmin(email.value, password.value)
    router.push({ name: 'Homepage' })
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <LoginLayout>
  <div class="min-h-screen bg-base-200 flex items-center">
    <div class="card mx-auto w-full max-w-2xl shadow-xl">
      <div class="py-24 px-10">
        <h2 class="text-2xl font-semibold mb-2 text-center">Login</h2>
        <div class="mb-4">
          <div class="form-control w-full mt-4">
            <label class="label"><span class="label-text text-base-content undefined">AccountID/Email</span></label>
            <input type="emailId" placeholder="Your email" class="input input-bordered w-full" v-model="email" />
          </div>
          <div class="form-control w-full mt-4">
            <label class="label"><span class="label-text text-base-content undefined">Password</span></label>
            <input type="password" placeholder="Your password" class="input input-bordered w-full" v-model="password" />
          </div>
        </div>
        <p class="text-center text-error mt-8"></p>
        <button @click="login" class="btn mt-2 w-full btn-primary">Login</button>
      </div>
    </div>
  </div>
  </LoginLayout>
</template>