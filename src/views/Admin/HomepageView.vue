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

const partName = ref('')
const itemName = ref('')

const motoBrand = ref('')
const searchmotoBrand = ref('')

const motoType = ref('')
const searchmotoType = ref('')

const partBrand = ref('')
const searchpartBrand = ref('')




const filteredPartname = computed(() => {

  const uniqueItems = new Set()
  return productsStore.list.filter((item) => {
    const isDuplicate = uniqueItems.has(item.partname)
    if (!isDuplicate) {
      uniqueItems.add(item.partname)
      return item.partname.includes(partName.value) ||
        (item.subname != undefined && item.subname.includes(partName.value))
    }
    return false
  })


  //   return productsStore.list.filter((item) => {
  //     return item.partname.includes(partName.value)
  //       || (item.subname != undefined && item.subname.includes(partName.value))
  // })
})

const showPartname = () => {
  return this.filteredPartname.length > 0
}

const filterPartname = () => {
  itemName.value = ''
}

const selectPartname = (name) => {
  console.log("Select", name)
  itemName.value = name
  partName.value = name
}

// moto brand
const filteredmotoBrand = computed(() => {

  const uniqueItems = new Set()
  return productsStore.list.filter((item) => {
    const isDuplicate = uniqueItems.has(item.motobrand)
    if (!isDuplicate) {
      uniqueItems.add(item.motobrand)
      return item.motobrand.toLowerCase().includes(motoBrand.value) || item.motobrand.toUpperCase().includes(motoBrand.value) || item.motobrand.includes(motoBrand.value)
    }
    return false
  })
  // return productsStore.list.filter((item) => {
  //   return item.motobrand.toLowerCase().includes(motoBrand.value)
  // })

})

const showmotoBrand = () => {
  return this.filteredmotoBrand.length > 0
}
const filtermotoBrand = () => {
  searchmotoBrand.value = ''
}

const selectmotoBrand = (motoB) => {
  searchmotoBrand.value = motoB
  motoBrand.value = motoB
}

// moto type
const filteredmotoType = computed(() => {

  const uniqueItems = new Set()
  return productsStore.list.filter((item) => {
    const isDuplicate = uniqueItems.has(item.mototype)
    if (!isDuplicate) {
      uniqueItems.add(item.mototype)
      return item.mototype.toLowerCase().includes(motoType.value) || item.mototype.toUpperCase().includes(motoType.value) || item.mototype.includes(motoType.value)
    }
    return false
  })
  // return productsStore.list.filter((item) => {
  //   return item.mototype.toLowerCase().includes(motoType.value)
  // })
})

const showmotoType = () => {
  return this.filteredmotoType.length > 0
}

const filtermotoType = () => {
  searchmotoType.value = ''
}

const selectmotoType = (motoT) => {
  searchmotoType.value = motoT
  motoType.value = motoT
}

//part brand
const filteredpartBrand = computed(() => {
  const uniqueItems = new Set()
  return productsStore.list.filter((item) => {
    const isDuplicate = uniqueItems.has(item.partbrand)
    if (!isDuplicate) {
      uniqueItems.add(item.partbrand)
      return item.partbrand.toLowerCase().includes(partBrand.value) || item.partbrand.toUpperCase().includes(partBrand.value) || item.partbrand.includes(partBrand.value)
    }
    return false
  })
  // return productsStore.list.filter((item) => {
  //   return item.partbrand.toLowerCase().includes(partBrand.value)
  // })
})

const showpartBrand = () => {
  return this.filteredpartBrand.length > 0
}

const filterpartBrand = () => {
  searchpartBrand.value = ''
}

const selectpartBrand = (partbrand) => {
  searchpartBrand.value = partbrand
  partBrand.value = partbrand
}

const clearAllFilters = () => {
  partName.value = ''
  itemName.value = ''
  motoBrand.value = ''
  searchmotoBrand.value = ''
  motoType.value = ''
  searchmotoType.value = ''
  partBrand.value = ''
  searchpartBrand.value = ''
};


</script>

<template>
  <Adminlayout>

    <div class="container mx-auto ">

      <!-- Part name search -->
      <div>
        <label for="search">ชิ้นส่วนอะไหล่</label>
        <div>
          <input v-model="partName" @input="filterPartname" type="text"
            class="input input-bordered input-primary w-full max-w-md " placeholder="ชื่ออะไหล่" />
          <div v-if="showPartname && !itemName"
            class=" content-sizing w-full max-w-md rounded-md shadow-2xl px-3 overflow-content">
            <div v-for="(suggestion, index) in filteredPartname" :key="index" :class="partName ? 'my-2' : ''"
              @click="selectPartname(suggestion.partname)">
              {{ partName ? suggestion.partname : '' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Moto search -->
      <div class="flex flex-row gap-2 content">
        <div class="relative">
          <div class="text-start">
            <label for="search">ยี่ห้อรถ</label>
          </div>
          <div class="relative">
            <input v-model="motoBrand" @input="filtermotoBrand" type="text"
              class="input input-bordered input-primary w-full max-w-ms " placeholder="ยี่ห้อมอเตอร์ไซค์" />
            <div v-if="showmotoBrand && !searchmotoBrand"
              class="  content-sizing rounded-md w-full max-w-ms shadow-2xl px-3  overflow-content ">
              <div v-for="(suggestion, index) in filteredmotoBrand" :key="index" :class="motoBrand ? ' my-2 ' : ''"
                @click="selectmotoBrand(suggestion.motobrand)">
                {{ motoBrand ? suggestion.motobrand : '' }}
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="text-start">
            <!-- mototype -->
            <label for="search">รุ่นรถ</label>
          </div>
          <div>
            <input v-model="motoType" @input="filtermotoType" type="text"
              class="input input-bordered input-primary w-full max-w-ms  " placeholder="รุ่นมอเตอร์ไซค์" />
            <div v-if="showmotoType && !searchmotoType"
              class="content-sizing rounded-md w-full max-w-ms shadow-2xl px-3  overflow-content">
              <div v-for="(suggestion, index) in filteredmotoType" :key="index" :class="motoType ? 'my-2' : ''"
                @click="selectmotoType(suggestion.mototype)">
                {{ motoType ? suggestion.mototype : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Part & clear -->
      <div class="flex flex-row justify-start gap-4 content">
        <div class="flex flex-col justify-start">
          <div class="relative">
            <div class="text-start">
              <label for="search" class="part-brand">ยี่ห้ออะไหล่</label>
            </div>
          </div>
          <div class="relative">
            <input v-model="partBrand" @input="filterpartBrand" type="text"
              class=" input input-bordered input-primary w-full max-w-ms" placeholder="ยี่ห้ออะไหล่" />
            <div v-if="showpartBrand && !searchpartBrand"
              class="content-sizing rounded-md w-full max-w-ms shadow-2xl px-3  overflow-content">
              <div v-for="(suggestion, index) in filteredpartBrand" :key="index" :class="partBrand ? 'my-2' : ''"
                @click="selectpartBrand(suggestion.partbrand)">
                {{ partBrand ? suggestion.partbrand : '' }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="underline" @click="clearAllFilters">ล้างทั้งหมด</button>
        </div>
      </div>

      <div class="divider "></div>
      <!-- โชว์สินค้า -->
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4 ">
        <div v-for="(item, index) in productsStore.list" :key="index">
          <div
            v-if="itemName === (item.partname || item.subname) || searchmotoBrand === item.motobrand || searchmotoType === item.mototype || searchpartBrand === item.partbrand"
            class="content card w-30vh max-h-96 bg-base-100 shadow-xl">
            <figure><img class="w-full max-h-max" :src="item.image" /></figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.partname }} {{ item.motobrand }}</h2>
              <!-- <p>ยี่ห้อมอเตอร์ไซค์: {{ item.motobrand }}</p> -->
              <p>วันหมดอายุ: {{ item.expiredDate }}</p>
              <div class="card-actions justify-end">
                <RouterLink :to="{ name: 'product-details', params: { id: item.productId } }" class="btn btn-primary">
                  Details
                </RouterLink>
              </div>
            </div>
          </div>

          <div v-else-if="itemName === '' && searchmotoBrand === '' && searchmotoType === '' && searchpartBrand === ''"
            class="content card w-30vh max-h-96 bg-base-100 shadow-2xl">
            <figure><img class="w-full max-h-max" :src="item.image" /></figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.partname }} {{ item.motobrand }}</h2>

              <p>วันหมดอายุ: {{ item.expiredDate }}</p>
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

.overflow-content {
  overflow-y: auto;
  height: auto;
}

.content-sizing {
  position: absolute;
  background-color: lightgray;
  z-index: 3;

}
</style>