<script setup>
import { reactive, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Papa from 'papaparse'

import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useAdminProductStore } from '@/stores/admin/product'
import { useEvent } from '@/stores/events.js'

const eventStore = useEvent()


const adminProduct = useAdminProductStore()

// let fileUploaded = ref({})
// const fileName = ref('');


const uploadProduct = async (row) => {
  try {
    await adminProduct.addProduct(row)
    eventStore.popupMessage('success', 'Created Item')
    
  } catch (error) {
    console.log('error', error)
  }
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]

  if (file) {
    const uploadRef = storageRef(storage, `product/${file.name}`)
    const snapshot = await uploadBytes(uploadRef, file)
    // const downloadURL = await getDownloadURL(snapshot.ref)

    Papa.parse(file, {
      complete: (result) => {
        // console.log(result)
        if (result.data.length > 1) {
          const headers = result.data[0]
          const rowData = result.data.slice(1)

          const fieldMapping = {
            'Header1 in CSV': 'image',
            'Header2 in CSV': 'partname',
            'Header3 in CSV': 'subname',
            'Header4 in CSV': 'motobrand',
            'Header5 in CSV': 'mototype',
            'Header6 in CSV': 'partbrand',
            'Header7 in CSV': 'price',
            'Header8 in CSV': 'quantity',
            'Header9 in CSV': 'remainQuantity',
            'Header10 in CSV': 'details',
            'Header11 in CSV': 'expiredDate',
            'Header12 in CSV': 'updateAt',
            'Header13 in CSV': 'status'
          }


          rowData.forEach(async (row) => {

            if (row.image === '') {
              row.status = 'open'
              await uploadProduct(row)
              console.log(row.status)
            } else {
              await uploadProduct(row)
            }

            // newProductData.push(row)

            // console.log('New Product Data:', newProductData)
          })
          // console.log('New Product Data:', newProductData)

          // fileUploaded = {data: newProductData}

        }
      },
      header: true,
    })
  }
}



</script>

<template>
  <AdminLayout>
    <div class="shadow-xl py-8 container mx-auto mt-4 p-4 ">
      <div class="text-1xl font-bold">Upload product</div>
      <div class=" divider"></div>
      <!-- input lable -->
      <div class="grid grid-cols-2 gap-3">
        <div class="form-control w-full ">
          <label class="label">
            <span class="label-text">Please upload file:</span>
          </label>
          <input class="file-input file-input-bordered file-input-primary w-full max-w-xs" type="file"
            @change="handleFileChange" accept=".csv" />
        </div>
      </div>
      <!-- status -->
      <div class=" divider"></div>

      <div class="flex mt-4 justify-end gap-2">
        <RouterLink :to="{ name: 'admin-dropcheck' }" class="btn btn-ghost">Back</RouterLink>
        <RouterLink :to="{ name: 'admin-dropcheck' }" class="btn btn-primary" @click="uploadProduct()">
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