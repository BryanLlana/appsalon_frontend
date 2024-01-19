import api from '@/lib/axios'

const authApi = {
  register: data => {
    return api.post('/auth/register', data)
  },
  verifyAccount: token => {
    return api.get(`/auth/verify/${token}`)
  },
  login: data => {
    return api.post('/auth/login', data)
  },
  auth: () => {
    const token = JSON.parse(localStorage.getItem('authToken'))
    return api.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  },
  forgorPassword: data => {
    return api.post('/auth/forgot-password', data)
  },
  verifyPasswordResetToken: token => {
    return api.get(`/auth/forgot-password/${token}`)
  },
  updatePasword: (data, token) => {
    return api.post(`/auth/forgot-password/${token}`, data)
  }
}

export default authApi