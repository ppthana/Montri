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
  quantity: 0,
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
    productData.subname = getProduct.subname
    productData.quantity = getProduct.quantity
    productData.details = getProduct.details
    productData.expiredDate = getProduct.expiredDate.toDate().toString() 
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
          Partname: {{ productData.partname }}
        </label>
        <label class="label text-md  text-gray-500">
          Subname: {{ productData.subname }}
        </label>
        <label class="label text-xs  text-gray-500">
          Expired date: {{ productData.expiredDate }}
        </label>
        <textarea class="w-full pl-1 mt-5 bg-gray-200" disabled> {{ productData.details }}</textarea>

      </div>
      <div>
        <label class="text-md label justify-start mx-auto p-2">จำนวนสินค้าที่เหลือ: {{ productData.quantity }}</label>
        <div class="flex flex-col items-end">
          <button class="btn btn-primary underline" onclick="my_modal_2.showModal()">Check</button>
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