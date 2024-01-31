<script setup>
  import { formatCurrency } from '@/helpers'
  import { useAppointmentStore } from '@/stores/appointments';

  defineProps({
    service: {
      type: Object,
      required: true
    }
  })

  const appointmentStore = useAppointmentStore()
</script>

<template>
  <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center gap-1">
    <div>
      <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
      <p class="text-3xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
    </div>  
    <button
      type="button"
      class="inline-flex items-center bg-red-600 rounded-md text-white text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-700"
      @click="appointmentStore.onServiceSelected(service)"
    >Eliminar
    </button>
  </div>
</template>
