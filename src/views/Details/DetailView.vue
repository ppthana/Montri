<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

import { useAdminProductStore } from '@/stores/admin/product'

const route = useRoute()
const productIndex = ref(-1)

const adminProduct = useAdminProductStore()

const productData = reactive({
  image: '',
  partname: '',
  subname: '',
  partbrand: '',
  productLocation: '',
  price: 0,
  remainQuantity: 0,
  details: '',
  expiredDate: ''
})

onMounted(async () => {

  if (route.params.id) {

    productIndex.value = route.params.id
    const getProduct = await adminProduct.getProduct(productIndex.value)
    console.log('detail page', getProduct)
    productData.productId = getProduct.productId
    productData.image = getProduct.image
    productData.partname = getProduct.partname
    productData.partbrand = getProduct.partbrand
    productData.productLocation = getProduct.productLocation
    productData.subname = getProduct.subname
    productData.price = getProduct.price
    productData.remainQuantity = getProduct.remainQuantity
    productData.details = getProduct.details
    productData.expiredDate = getProduct.expiredDate
  }

})

console.log('Details page', productData)
</script>

<template>
  <AdminLayout>
    <div class="container mx-auto max-w-2xl p-4 bg-base-100 my-2 border border-base-200 shadow-2xl mb-10 w-screen">
      <div class="flex flex-col items-center">
        <div class="avatar">
          <div class="w-full">
            <img class=" w-full" :src="productData.image" style="width: 40vh; height: auto;" />
          </div>
        </div>
      </div>
      <div class=" justify-start mx-auto p-2">
        <label class="label text-2xl">
          ชื่อสินค้า: {{ productData.partname }}
        </label>
        <label v-if="productData.subname != ''" class="label text-md  text-gray-500">
          ราคา:
          {{ productData.price }} บาท
        </label>
        <label v-else class="label text-md  text-gray-500">
          ราคา:
          {{ productData.price }} บาท
        </label>
        <label class="label text-xs  text-gray-500">
          ที่อยู่สินค้า: {{ productData.productLocation }}
        </label>
        <textarea class="w-full pl-1 mt-5 bg-gray-200" disabled> {{ productData.details }}</textarea>

      </div>
      <div>
        <label class="label text-xs justify-start mx-auto p-2 text-gray-500">จำนวนสินค้าที่เหลือ: {{ productData.remainQuantity }}, วันหมดอายุ: {{ productData.expiredDate }}
        </label>
        <div class="flex flex-col items-end">
          <button class="btn btn-primary underline" onclick="my_modal_2.showModal()">Map location</button>
          <dialog id="my_modal_2" class="modal">
            <div class="modal-box">
              <img src="@/assets/image/Store-house.jpg" style="width: 70vh; height: auto; " class=" items-center" />
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>


        </div>
      </div>

      <Modal></Modal>
    </div>
  </AdminLayout>
</template>

<style>
textarea {
  height: 250px;
}
</style>