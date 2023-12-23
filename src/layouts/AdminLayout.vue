<script setup>
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
const accountStore = useAccountStore()

const rounter = useRouter()

const logout = async () => {
  try {
    await accountStore.logout()
    rounter.push({ name: 'login' })
    
  } catch (error) {
    console.log('error', error)
  }
}


</script>

<template>
  <div class="  navbar">
    <div class="flex-1">
      <RouterLink to="/home">
        <button class="btn btn-ghost text-4xl  text-red-600"> Montri</button>
      </RouterLink>
    </div>
    <div class="flex-none">
      <!-- <button @click="login" v-if="!accountStore.isLoggedIn" class="btn btn-ghost">
        Login
      </button> -->
      <div  class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component"
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <RouterLink to="/profile">
              <a class="justify-between">
                Profile
              </a>
            </RouterLink>

          </li>
          <li>
            <button @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <slot></slot>
  <div v-if="accountStore.profile.role == 'admin'" class="fixed bottom-7 bg-primary flex container ">
    <RouterLink to='/admin/products'>
      <div class=" text-white underline font-semibold">Products</div>
    </RouterLink>
    <div class=" text-white underline font-semibold">itemDesc</div>
    <RouterLink to="/admin/drop-check" class=" text-white underline font-semibold">Purchase form upload</RouterLink>

  </div>
</template>


<style scoped>
.container {
  margin: 0 auto;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  height: 35px;
  width: auto;
  left: 0px;
  right: 0px;
  z-index: 3;
}
</style>