import api from "@/lib/axios"

const servicesApi = {
  all: () => {
    return api.get('/services')
  }
}

export default servicesApi