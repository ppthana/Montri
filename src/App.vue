<script setup>
import { RouterView } from 'vue-router'
import { useEvent } from '@/stores/events.js'


const eventStore = useEvent()

</script>

<template>
  <div>
    <div v-if="eventStore.data.status" class="toast toast-top ">
      <div class="alert" :class="`alert-${eventStore.data.status}`">
        <span>{{ eventStore.data.message }}</span>
      </div>

    </div>
    <RouterView />
  </div>
</template>