<script setup>
  import AdminAppointment from '@/components/AdminAppointment.vue'
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()
</script>

<template>
  <p class="text-white text-lg mt-5">A continuación podrás administrar tus próximas citas</p>
  <div class="grid grid-cols-1 gap-5 mt-10">
    <AdminAppointment 
      v-for="appointment in userStore.userAppointments"
      :key="appointment.id"
      :appointment="appointment"
    />
  </div>
</template>
