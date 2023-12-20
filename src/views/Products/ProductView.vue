<script setup>
import { RouterLink } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/stores/admin/product'
import { useEvent } from '@/stores/events.js'
import Edit from '@/components/icon/Edit.vue'
import Trash from '@/components/icon/Trash.vue'
import Table from '@/components/Table.vue'
import { onMounted } from 'vue'

const adminProduct = useAdminProductStore()
const eventStore = useEvent()
onMounted(async () => {
  await adminProduct.loadProduct()
})

const removeProduct = async (index) => {
  try {
    await adminProduct.removeProduct(index)
    eventStore.popupMessage('success', 'Deleted product')
    adminProduct.loadProduct()

  } catch (error) {
    console.log('error', error)
  }

}

console.log('adminProduct', adminProduct.list)
</script>

<template>
  <AdminLayout>
    <div class="flex-1  pt-8 px-6 bg-base-100">
      <div class="card w-full p-6 mt-2">
        <div class="text-xl font-semibold inline-block">
          Product
          <div class="inline-block float-right">
            <div class="inline-block float-right">
              <RouterLink to="/admin/products/create" class="btn px-6 btn-sm normal-case btn-primary">
                +Add New
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="overflow-x-auto w-full">
            <Table :headers="['ชื่ออะไหล่', 'รูปภาพ', 'ราคา', 'จำนวน', 'ยี่ห้ออะไหล่', 'สถานะ', 'updatedAt', '']">
              <tr v-for="(product, index) in adminProduct.list">
                <td>{{ product.partname }}</td>
                <td>
                  <img :src="product.image" class="w-12">
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }}/{{ product.quantity }}</td>
                <td>{{ product.partbrand }}</td>
                <td>
                  <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                    {{ product.status }}
                  </div>
                </td>
                <td>{{ product.updatedAt }}</td>
                <td>
                  <div class="flex gap-3">
                    <RouterLink :to="{ name: 'admin-product-update', params: { id: product.productId } }"
                      class="btn btn-ghost ">
                      <Edit></Edit>
                    </RouterLink>
                    <div @click="removeProduct(product.productId)" class="btn btn-ghost">
                      <Trash>
                      </Trash>
                    </div>
                  

                  </div>
                </td>
              </tr>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout></template>