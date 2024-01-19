<script setup>
  import authApi from '@/api/authApi'
  import { reset } from '@formkit/vue'
  import { inject } from 'vue'

  const toast = inject('toast')

  const handleSubmit = async values => {
    const { name, email, password, password_confirm: password2 } = values
    try {
      const { data } = await authApi.register({ name, email, password, password2 })
      toast.open({
        message: data.msg,
        type: 'success'
      })
      reset('registerForm')
    } catch (error) {
      toast.open({
        message: error.response.data.error,
        type: 'error'
      })
    }
  }
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
  <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalon</p>

  <FormKit
    id="registerForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Ejm: Juan Roman"
      validation="required"
      :validation-messages="{ required: 'El nombre es obligatorio' }"
    />
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Ejm: juan@gmail.com"
      validation="required|email"
      :validation-messages="{ required: 'El email es obligatorio', email: 'Email no válido' }"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="Mínimo 8 caracteres"
      validation="required|length:8"
      :validation-messages="{ required: 'El password es obligatorio', length: 'El password es muy corto' }"
    />
    <FormKit
      type="password"
      label="Repetir-Password"
      name="password_confirm"
      placeholder="Repite el password"
      validation="required|confirm"
      :validation-messages="{ required: 'El password es obligatorio', confirm: 'Los passwords no son iguales' }"
    />
    <FormKit type="submit">Crear Cuenta</FormKit>
  </FormKit>
</template>
