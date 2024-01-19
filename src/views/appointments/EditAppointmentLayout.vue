<script setup>
  import { onMounted } from 'vue'
  import { RouterView, useRoute, useRouter } from 'vue-router'
  import { appointmentApi } from '@/api/appointmentApi'
  import { useAppointmentStore } from '@/stores/appointments';
  const route = useRoute()
  const router = useRouter()

  const appointmentStore = useAppointmentStore()
  const { id } = route.params
  onMounted(async () => {
    try {
      const { data } = await appointmentApi.getAppointmentById(id)
      appointmentStore.setSelectedAppointment(data.appointment)
    } catch (error) {
      router.push({ name: 'my-appointments' })
    }
  })
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'edit-appointment' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >Servicios
    </RouterLink>
    <RouterLink
      :to="{ name: 'edit-appointment-details' }"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >Cita y Resumen
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
