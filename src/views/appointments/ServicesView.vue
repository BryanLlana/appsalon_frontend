<script setup>
  import Service from '@/components/Service.vue'
  import { useServiceStore } from '@/stores/services'

  const serviceStore = useServiceStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Servicios</h2>
  <p class="text-white text-lg mt-5">A continuación elige al menos un servicio para tu cita</p>

  <div class="grid grid-cols-2 gap-5 mt-5">
    <Service v-for="service in serviceStore.services" :service="service" :key="service.id" />
  </div>
</template>