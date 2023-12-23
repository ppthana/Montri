<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import VueDatePicker from '@vuepic/vue-datepicker'

import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useAdminProductStore } from '@/stores/admin/product'
import { useEvent } from '@/stores/events.js'

const eventStore = useEvent()


const adminProduct = useAdminProductStore()


const productData = reactive({
  image: ('' || 'https://picsum.photos/200'),
  partname: '',
  subname: '',
  motobrand: '',
  mototype: '',
  partbrand: '',
  price: 0,
  productLocation: '',
  quantity: 0,
  remainQuantity: 0,
  details: '',
  expiredDate: '',
  updatedAt: '',
  status: ''
})

const createProduct = async () => {
  try {
    await adminProduct.addProduct(productData)
    eventStore.popupMessage('success', 'Item Created')
    // rounter.push({ name: 'admin-product' })
  } catch (error) {
    console.log('error', error)
  }
}

const handleFileChange = async (event) => {
  

  const file = event.target.files[0]

  if (file) {

    const uploadRef = storageRef(storage, `product-image/${file.name}`)
    const snapshot = await uploadBytes(uploadRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    productData.image = downloadURL

  }
}

</script>

<template>
  <AdminLayout>
    <div class="shadow-xl py-8 container mx-auto mt-4 p-4 ">
      <div class="text-1xl font-bold">AddItem</div>
      <div class=" divider"></div>
      <!-- input lable -->
      <div class="grid grid-cols-2 gap-3">
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">รูปภาพ</span>
          </label>
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img :src="productData.image" />
            </div>
          </div>
          <input class="file-input file-input-bordered file-input-primary w-full max-w-xs my-5" type="file" @change="handleFileChange" accept=".png, .jpg, .jpeg" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ชื่ออะไหล่</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.partname" :class="{ 'input-error': !productData.partname }" required />
            <p v-if="!productData.partname" class="text-xs text-error mt-1">โปรดระบุชื่ออะไหล่</p>

        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ชื่อรอง</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.subname" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ยี่ห้อมอเตอร์ไซค์</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.motobrand" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">รุ่นมอเตอร์ไซค์</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.mototype" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ยี่ห้ออะไหล่</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.partbrand" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ราคา</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.price" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">จำนวน</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.quantity" />
        </div>

        <!-- เพิ่ม field -->

        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">ที่อยู่สินค้า</span>
          </label>
          <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
          v-model="productData.productLocation" />
        </div>
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">วันหมดอายุ</span>
          </label>
          <VueDatePicker v-model="productData.expiredDate" model-type="dd.MM.yyyy" />

          <!-- <input type="text" placeholder="Type here" class="input input-bordered input-secondary w-full "
            v-model="productData.expiredDate" /> -->
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text text-base-content">
              รายละเอียด
            </span>
          </label>
          <textarea placeholder="Details product" class="textarea textarea-bordered textarea-secondary w-full"
            v-model="productData.details">
          </textarea>
        </div>
      </div>
      <!-- status -->
      <div class=" divider"></div>
      <div class="grid grid-cols-2 gap-3">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select v-model="productData.status" class="select select-bordered select-secondary">
            <option selected>Choose status</option>
            <option value="open">Open</option>
            <option value="close">Out of Stock</option>
          </select>
        </div>
      </div>
      <div class="flex mt-4 justify-end gap-2">
        <RouterLink to="/admin/products" class="btn btn-ghost">Back</RouterLink>
        <RouterLink to="/admin/products" class="btn btn-primary" @click="createProduct()" v-model="productData.updatedAt">
          Create</RouterLink>
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

input {
  border-style: inset;
}

textarea {
  border-style: inset;
}

select {
  border-style: inset;
}
</style>