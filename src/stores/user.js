import { appointmentApi } from "@/api/appointmentApi"
import authApi from "@/api/authApi"
import { defineStore } from "pinia"
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref({})
  const userAppointments = ref([])
  const loading = ref(true)

  onMounted(async () => {
    try {
      const { data } = await authApi.auth()
      user.value = data.user
      await getAppointmentsOfUser()
    } catch (error) {
      console.log(error.response.data.error)
    }
    loading.value = false
  })

  const getAppointmentsOfUser = async () => {
    const { data } = await appointmentApi.getApointmentsOfUser(user.value.id)
    userAppointments.value = data.appointments
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    user.value = {}
    router.push({ name: 'login' })
  }

  const getUserName = computed(() => {
    return user.value?.name
  })

  return {
    user,
    getUserName,
    logout,
    userAppointments,
    loading,
    getAppointmentsOfUser
  }
})