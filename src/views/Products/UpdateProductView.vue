<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

import { useAdminProductStore } from '@/stores/admin/product'
import { useEvent } from '@/stores/events.js'
import VueDatePicker from '@vuepic/vue-datepicker';

const eventStore = useEvent()


const adminProduct = useAdminProductStore()
const rounter = useRouter()
const route = useRoute()

const productIndex = ref(-1)


const productData = reactive({
  image: '',
  partname: '',
  subname: '',
  motobrand: '',
  mototype: '',
  partbrand: '',
  price: 0,
  remainQuantity: 0,
  quantity: 0,
  details: '',
  expiredDate: '',
  updatedAt: '',
  status: ''
})

const updatedProduct =  async () => {
  
 await adminProduct.updateProduct(productIndex.value, productData)
  eventStore.popupMessage('success', 'Updated')
  rounter.push({ name: 'admin-product' })
}

onMounted( async () => {
  if (route.params.id) {
    productIndex.value = route.params.id
    const getProduct =  await adminProduct.getProduct(productIndex.value)

    productData.image = getProduct.image
    productData.partname = getProduct.partname
    productData.subname = getProduct.subname
    productData.motobrand = getProduct.motobrand
    productData.mototype = getProduct.mototype
    productData.partbrand = getProduct.partbrand
    productData.price = getProduct.price
    productData.quantity = getProduct.quantity
    productData.details = getProduct.details
    productData.expiredDate = getProduct.expiredDate
    productData.status = getProduct.status

  }
})

</script>

<template>
  <AdminLayout>
    <div class="shadow-xl py-8 container mx-auto mt-4 p-4 ">
      <div class="text-1xl font-bold">EDIT</div>
      <div class=" divider"></div>
      <div class="grid grid-cols-2 gap-3">
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">รูปภาพ</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.image" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ชื่ออะไหล่</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.partname" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ชื่อรอง</span>
          </label>
          <input type="text" placeholder="" class="input input-bordered input-secondary w-full " v-model="productData.subname" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ยี่ห้อมอเตอร์ไซค์</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.motobrand" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">รุ่นมอเตอร์ไซค์</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.mototype" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ยี่ห้ออะไหล่</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.partbrand" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ราคา</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.price" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">จำนวน</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.quantity" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">วันหมดอายุ</span>
          </label>
          <VueDatePicker v-model="productData.expiredDate" model-type="dd.MM.yyyy" />
          <!-- <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full " v-model="productData.expiredDate" /> -->
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-base-content">
              รายละเอียด
            </span>
          </label>
          <textarea placeholder="Details product" class="textarea textarea-bordered textarea-secondary w-full" v-model="productData.details">
          </textarea>
        </div>
      </div>
      <div class=" divider"></div>
      <div class="grid grid-cols-2 gap-3">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select v-model="productData.status" class="select select-bordered select-secondary">
            <option disabled selected>Choose status</option>
            <option value="open">Open</option>
            <option value="close">Out of Stock</option>
          </select>
        </div>
      </div>
      <div class="flex mt-4 justify-end gap-2">
        <RouterLink to="/admin/products" class="btn btn-ghost">Back</RouterLink>
        <RouterLink to="/admin/products" class="btn btn-primary" @click="updatedProduct()" v-model="productData.updatedAt">Update</RouterLink>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.container {

  padding-top: 50px;
  margin-bottom: 100px;
}

.container>div {
  width: 100%;
}

input{
  border-style: inset;
}

textarea{
  border-style: inset;
}

select{
  border-style: inset;
}
</style>