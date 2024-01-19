import api from "@/lib/axios"

export const appointmentApi = {
  create: data => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.post('/appointments', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getByDate: date => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.get(`/appointments?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getApointmentsOfUser: userId => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.get(`/users/${userId}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  getAppointmentById: id => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.get(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  updateAppointment: (id, data) => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.put(`/appointments/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  deleteAppointment: id => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.delete(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}