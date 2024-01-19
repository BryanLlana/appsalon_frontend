import { appointmentApi } from "@/api/appointmentApi"
import { convertToDDMMYYYY } from "@/helpers"
import { defineStore } from "pinia"
import { ref, computed, onMounted, inject, watch } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "./user"

export const useAppointmentStore = defineStore('appointments', () => {
  const appointmentId = ref('')
  const services = ref([])
  const date = ref('')
  const time = ref('')
  const hours = ref([])
  const appointmentsByDate = ref([])
  const userStore = useUserStore()

  const toast = inject('toast')
  const router = useRouter()

  onMounted(() => {
    const startHour = 10
    const endHour = 19
    for(let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

  watch(date, async () => {
    time.value = ''
    if (date.value === '') return
    const { data } = await appointmentApi.getByDate(date.value)
    
    if (appointmentId.value) {
      appointmentsByDate.value = data.appointments.filter(appointment => appointment.id !== appointmentId.value)
      const currentAppointment = data.appointments.filter(appointment => appointment.id === appointmentId.value)[0]
      time.value = currentAppointment.time
    } else {
      appointmentsByDate.value = data.appointments
    }
  })

  const setSelectedAppointment = appointment => {
    services.value = appointment.services
    date.value = convertToDDMMYYYY(appointment.date)
    time.value = appointment.time
    appointmentId.value = appointment.id
  }

  const onServiceSelected = service => {
    if (services.value.some(serviceState => serviceState.id === service.id)) {
      services.value = services.value.filter(serviceState => serviceState.id !== service.id)
    } else {
      if (services.value.length === 2) {
        alert('Solo puedes seleccionar 2 servicios por cita')
      } else {
        services.value.push(service)
      }
    }
  }

  const saveAppointment = async () => {
    const appointment = {
      services: services.value.map(serviceState => serviceState.id),
      date: date.value,
      time: time.value,
      totalAmount: totalAmount.value
    }

    if (appointmentId.value) {
      const { data } = await appointmentApi.updateAppointment(appointmentId.value, appointment)
      toast.open({
        message: data.msg,
        type: 'success'
      })
    } else {
      const { data } = await appointmentApi.create(appointment)
      toast.open({
        message: data.msg,
        type: 'success'
      })
    }

    clearAppointment()
    userStore.getAppointmentsOfUser()
    router.push({ name: 'my-appointments' })
  }

  const clearAppointment = () => {
    services.value = []
    date.value = ''
    time.value = ''
    appointmentId.value = ''
  }

  const canceleAppointment = async id => {
    if (confirm('¿Desea cancelar la reservación?')) {
      try {
        const { data } = await appointmentApi.deleteAppointment(id)
        toast.open({
          message: data.msg,
          type: 'success'
        })
        userStore.getAppointmentsOfUser()
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: 'error'
        })
      }
    }
  }

  const notServicesSelected = computed(() => {
    return services.value.length === 0
  })

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const isServiceSelected = computed(() => {
    return id => services.value.some(serviceState => serviceState.id === id)
  })

  const disableTime = computed(() => {
    return hour => {
      return appointmentsByDate.value.find(appointment => appointment.time === hour)
    }
  })

  return {
    services,
    date,
    hours,
    time,
    setSelectedAppointment,
    onServiceSelected,
    canceleAppointment,
    clearAppointment,
    saveAppointment,
    isServiceSelected,
    notServicesSelected,
    totalAmount,
    disableTime
  }
})