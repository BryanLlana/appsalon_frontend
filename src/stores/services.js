import servicesApi from "@/api/servicesApi"
import { defineStore } from "pinia"
import { onMounted, ref } from "vue"

export const useServiceStore = defineStore('services', () => {
  const services = ref([])
  
  onMounted(async () => {
    try {
      const { data } = await servicesApi.all()
      services.value = data.services
    } catch (error) {
      console.log(error)
    }
  })
  return {
    services
  }
})