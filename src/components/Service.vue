<script setup>
  import { useAppointmentStore } from '@/stores/appointments';
  import { formatCurrency } from '@/helpers'

  defineProps({
    service: {
      type: Object,
      required: true
    }
  })

  const appointmentStore = useAppointmentStore()
</script>

<template>
  <div 
    @click="appointmentStore.onServiceSelected(service)" 
    class="p-5 space-y-5 rounded-lg cursor-pointer"
    :class="appointmentStore.isServiceSelected(service.id) ? 'bg-blue-500 text-white' : 'bg-white'"
  >
    <p class="text-2xl font-semibold">{{ service.name }}</p>
    <p
      class="text-3xl font-black"
      :class="appointmentStore.isServiceSelected(service.id) ? 'text-white' : 'text-blue-600'"
    >{{ formatCurrency(service.price) }}</p>
  </div>
</template>
