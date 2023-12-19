<script setup>
import { RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ref, onMounted } from 'vue';
import { getStorage, ref as storageRef, listAll, getMetadata } from 'firebase/storage';
import Table from '@/components/Table.vue'
const fileDetails = ref([]);

onMounted(async () => {
  const storage = getStorage();
  const productDirectoryRef = storageRef(storage, 'product');

  try {
    const result = await listAll(productDirectoryRef);
    const filePromises = result.items.map(async (item) => {
      const metadata = await getMetadata(item);
      return {
        name: item.name,
        updatedAt: metadata.updated,
      };
    });
    const files = await Promise.all(filePromises);
    fileDetails.value = files;
    console.log('File details:', fileDetails.value);
  } catch (error) {
    console.error('Error cannot get files in product:', error);
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};


</script>

<template>
  <AdminLayout>
    <div class="flex-1  pt-8 px-6 bg-base-100">
      <div class="card w-full p-6 mt-2">
        <div class="text-xl font-semibold inline-block">
          File
          <div class="inline-block float-right">
            <div class="inline-block float-right">
              <RouterLink :to="{ name: 'admin-product-upload' }" class="btn px-6 btn-sm normal-case btn-primary">
                Upload File
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="divider mt-2"></div>
        <div class="h-full w-full pb-6 bg-base-100">
          <div class="overflow-x-auto w-full">
            <Table :headers="['File name', 'uploadAt', '']">
              <tr v-for="(file, index) in fileDetails">
                <td>{{ file.name }}</td>
                <td>{{ formatDate(file.updatedAt) }}</td>

                <!-- <td>{{ file.updatedAt.toString()}}</td> -->
              </tr>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
