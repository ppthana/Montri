<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import Adminlayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/stores/admin/product'

const productsStore = useAdminProductStore()

onMounted(async () => {
  await productsStore.showProduct()

})

console.log('Homepage', productsStore.list)

const itemName = ref("")
const searchTerm = ref("")
// const SearchPart = async () => {
//   const data = await $fetch('/api/partname', {
//     method: 'GET',
//     params: {
//       "searchTerm": searchTerm.value
//     }
//   })
//   listItem.value.push(...data)
//   console.log("This api get", listItem.value)
// }


let filteredSuggestions = computed(() => {
  return productsStore.list.filter((item) => {
    return item.partname.includes(searchTerm.value)
      || (item.subname != undefined && item.subname.includes(searchTerm.value))
  })

}),

  showSuggestions = () => {
    return this.filteredSuggestions.length > 0
  },

  filterSuggestions = () => {
    itemName.value = ""
  },
  selectSuggestion = (name) => {
    console.log("Select", name)
    itemName.value = name
    searchTerm.value = name
  }


</script>

<template>
  <Adminlayout>

    <div class="container mx-auto">

      <div>
        <label for="search">ชิ้นส่วนอะไหล่</label>
        <div>
          <input v-model="searchTerm" @input="filterSuggestions" type="text"
            class="input input-bordered input-primary w-full max-w-md " placeholder="ชื่ออะไหล่" />
          <div v-if="showSuggestions && !itemName"
            class=" bg-white part-name-suggestion content-sizing rounded-md  suggestion-item-label">
            <div v-for="(suggestion, index) in filteredSuggestions" :key="index"
              :class="searchTerm ? 'suggestion-item ' : ''" @click="selectSuggestion(suggestion.partname)">
              {{ searchTerm ? suggestion.partname : "" }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-2 content">
        <div class="relative">
          <div class="text-start">
            <label for="search" class="moto-brand">ยี่ห้อรถ</label>
          </div>
          <div class="relative">
            <input v-model="searchTerm" @input="filterSuggestions" type="text"
              class="input input-bordered input-primary w-full max-w-ms " placeholder="ยี่ห้อมอเตอร์ไซค์" />
            <!-- <div v-if="showSuggestions && !itemName"
            class="  moto-brand-suggestion  bg-white rounded-md part-content suggestion-item-label ">
            <div v-for="(suggestion, index) in filteredSuggestions" :key="index"
              :class="searchTerm ? 'suggestion-item border ' : ''" @click="selectSuggestion(suggestion.part_name)">
              {{ searchTerm ? suggestion.part_name : "" }}
            </div>
          </div> -->
          </div>
        </div>
        <div class="relative">
          <div class="text-start">
            <label for="search" class="moto-brand">รุ่นรถ</label>
          </div>
          <div>
            <input v-model="searchTerm" @input="filterSuggestions" type="text"
              class="input input-bordered input-primary w-full max-w-ms  " placeholder="รุ่นมอเตอร์ไซค์" />
            <!-- <div v-if="showSuggestions && !itemName"
              class="  moto-type-suggestion  bg-white rounded-md part-content suggestion-item-label">
              <div v-for="(suggestion, index) in filteredSuggestions" :key="index"
                :class="searchTerm ? 'suggestion-item border ' : ''" @click="selectSuggestion(suggestion.part_name)">
                {{ searchTerm ? suggestion.part_name : "" }}
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-start gap-4 content">
        <div class="flex flex-col justify-start">
          <div class="relative">
            <div class="text-start">
              <label for="search" class="part-brand">ยี่ห้ออะไหล่</label>
            </div>
          </div>
          <div class="relative">
            <input v-model="searchTerm" @input="filterSuggestions" type="text"
              class=" input input-bordered input-primary w-full max-w-ms" placeholder="ยี่ห้ออะไหล่" />
            <!-- <div v-if="showSuggestions && !itemName"
            class="bg-white part-brand-suggestion part-content rounded-md  suggestion-item-label">
            <div v-for="(suggestion, index) in filteredSuggestions" :key="index"
              :class="searchTerm ? 'suggestion-item border ' : ''" @click="selectSuggestion(suggestion.part_name)">
              {{ searchTerm ? suggestion.part_name : "" }}
            </div>
          </div> -->
          </div>
        </div>
        <div>
          <button class="underline">ล้างทั้งหมด</button>
        </div>
      </div>

      <div class="divider "></div>
      <!-- โชว์สินค้า -->
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4 ">
        <div v-for="(item, index) in productsStore.list" :key="index">
          <div v-if="itemName === (item.partname || item.subname)" 
          class="content card w-30vh bg-base-100 shadow-xl">
            <figure><img class="w-full " :src="item.image" /></figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.partname }}</h2>

              <div class="card-actions justify-end">
                <RouterLink :to="{ name: 'product-details', params: { id: item.productId } }" class="btn btn-primary">
                  Details
                </RouterLink>
              </div>
            </div>
          </div>

          <div v-else-if="itemName === ''" class="content card w-30vh bg-base-100 shadow-xl">
            <figure><img class="w-full " :src="item.image" /></figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.partname }}</h2>
              <!-- <p>{{ item.quantity }}</p> -->
              <div class="card-actions justify-end">
                <RouterLink :to="{ name: 'product-details', params: { id: item.productId } }" class="btn btn-primary">
                  Details
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  </Adminlayout>
</template>

<style scoped>
.container {
  margin: 0 auto;
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 50px;
  margin-bottom: 100px;
}

.container>div {
  width: 100%;
}

.content {
  margin-top: 10px;
}

input {
  border-style: inset;
}

.suggestion-item-label {
  overflow-y: auto;
  height: auto;
}

.content-sizing {
  position: absolute;
  background-color: white;
  z-index: 3;
  width: 50%;

}


.part-name-suggestion {

  margin: auto;
}
</style>