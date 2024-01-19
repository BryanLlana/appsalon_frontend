<script setup>
  import authApi from '@/api/authApi'
  import { inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore()
  const toast = inject('toast')
  const router = useRouter()

  const handleSubmit = async values => {
    try {
      const { data } = await authApi.login(values)
      localStorage.setItem('authToken', JSON.stringify(data.token))
      userStore.user = data.user
      userStore.getAppointmentsOfUser(data.user.id)
      router.push({ name: 'my-appointments' })
    } catch (error) {
      toast.open({
        message: error.response.data.error,
        type: 'error'
      })
    }
  }
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
  <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

  <FormKit
    id="loginForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      validation="required|email"
      :validation-messages="{ required: 'El email es obligatorio', email: 'Email no válido' }"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      validation="required"
      :validation-messages="{ required: 'El password es obligatorio' }"
    />
    <FormKit type="submit">Iniciar Sesión</FormKit>
  </FormKit>
</template>