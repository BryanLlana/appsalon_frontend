<script setup>
  import authApi from '@/api/authApi'
  import { reset } from '@formkit/core'
  import { inject } from 'vue'
  const toast = inject('toast')
  const handleSubmit = async values => {
    try {
      const { data } = await authApi.forgorPassword(values)
      toast.open({
        message: data.msg,
        type: 'success'
      })
      reset('forgotPassword')
    } catch (error) {
      toast.open({
        message: error.response.data.error,
        type: 'error'
      })
    }
  }
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
  <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

  <FormKit
    id="forgotPassword"
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
    <FormKit type="submit">Enviar instrucciones</FormKit>
  </FormKit>
</template>
