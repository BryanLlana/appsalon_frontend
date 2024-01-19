<script setup>
  import authApi from '@/api/authApi';
import { inject, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute()
  const router = useRouter()
  const toast = inject('toast')
  const validToken = ref(false)

  onMounted(async () => {
    try {
      await authApi.verifyPasswordResetToken(route.params.token)
      validToken.value = true
    } catch (error) {
      toast.open({
        message: error.response.data.error,
        type: 'error'
      })
    }
  })
  
  const handleSubmit = async values => {
    console.log(values)
    try {
      const { data } = await authApi.updatePasword(values, route.params.token)
      toast.open({
        message: data.msg,
        type: 'success'
      })
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 3000)
    } catch (error) {
      toast.open({
        message: error.response.data.error,
        type: 'error'
      })
    }
  }
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nuevo Password</h1>
    <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>
  
    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Mínimo 8 caracteres"
        validation="required|length:8"
        :validation-messages="{ required: 'El password es obligatorio', length: 'El password es muy corto' }"
      />
      <FormKit type="submit">Guardar password</FormKit>
    </FormKit>
  </div>
  <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
</template>