<script setup>
  import { displayDate, formatCurrency } from '@/helpers'
  import { RouterLink } from 'vue-router'
  import { useAppointmentStore } from '@/stores/appointments';
  defineProps({
    appointment: {
      type: Object,
      required: true
    }
  })

  const appointmentStore = useAppointmentStore()
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black flex flex-col">
      Fecha: <span class="font-light">{{ displayDate(appointment.date) }}</span>
      Hora: <span class="font-light">{{ appointment.time }} Horas.</span>
    </p>
    <p class="text-lg font-black">Servicios solicitados en la cita</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
    </div>

    <p class="text-2xl font-black text-right">
      Total a Pagar: <span class="text-blue-600">{{ formatCurrency(appointment.totalAmount) }}</span>
    </p>

    <div class="flex gap-2 items-center">
      <RouterLink
        :to="{ name: 'edit-appointment', params: { id: appointment.id }}"
        class="bg-slate-600 rounded-lg p-3 text-white text-center text-sm uppercase font-black flex-1 md:flex-none"
      >Editar</RouterLink>
      <button
        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none"
        @click="appointmentStore.canceleAppointment(appointment.id)"
      >Cancelar</button>
    </div>
  </div>
</template>
