import HomeViewVue from '@/views/HomeView.vue'
import AppointmentsLayoutVue from '../views/appointments/AppointmentsLayout.vue'
import NewAppointmentLayoutVue from '../views/appointments/NewAppointmentLayout.vue'
import ServicesViewVue from '../views/appointments/ServicesView.vue'
import AppointmentViewVue from '../views/appointments/AppointmentView.vue'
import AuthLayoutVue from '@/views/auth/AuthLayout.vue'
import RegisterViewVue from '@/views/auth/RegisterView.vue'
import ConfirmAccountViewVue from '@/views/auth/ConfirmAccountView.vue'
import LoginViewVue from '@/views/auth/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MyAppointmentsViewVue from '@/views/appointments/MyAppointmentsView.vue'
import authApi from '@/api/authApi'
import EditAppointmentLayoutVue from '@/views/appointments/EditAppointmentLayout.vue'
import ForgotPasswordViewVue from '@/views/auth/ForgotPasswordView.vue'
import NewPasswordViewVue from '@/views/auth/NewPasswordView.vue'
import AdminLayoutVue from '@/views/admin/AdminLayout.vue'
import AppointmentsViewVueAdmin from '@/views/admin/AppointmentsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayoutVue,
      meta: { requiresAdmin: true },
      children: [
        {
          path: '/admin',
          name: 'admin-appointments',
          component: AppointmentsViewVueAdmin,
        }
      ]
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayoutVue,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/reservaciones',
          name: 'my-appointments',
          component: MyAppointmentsViewVue
        },
        {
          path: '/reservaciones/nueva',
          component: NewAppointmentLayoutVue,
          children: [
            {
              path: '/reservaciones/nueva',
              name: 'new-appointment',
              component: ServicesViewVue
            },
            {
              path: '/reservaciones/nueva/detalles',
              name: 'appointment-details',
              component: AppointmentViewVue
            }
          ]
        },
        {
          path: '/reservaciones/:id/editar',
          component: EditAppointmentLayoutVue,
          children: [
            {
              path: '/reservaciones/:id/editar',
              name: 'edit-appointment',
              component: ServicesViewVue
            },
            {
              path: '/reservaciones/:id/editar/detalles',
              name: 'edit-appointment-details',
              component: AppointmentViewVue
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayoutVue,
      children: [
        {
          path: '/auth/registro',
          name: 'register',
          component: RegisterViewVue
        },
        {
          path: '/auth/confirmar-cuenta/:token',
          name: 'confirm-account',
          component: ConfirmAccountViewVue
        },
        {
          path: '/auth/login',
          name: 'login',
          component: LoginViewVue
        },
        {
          path: '/auth/olvide-password',
          name: 'forgot-password',
          component: ForgotPasswordViewVue
        },
        {
          path: '/auth/olvide-password/:token',
          name: 'new-password',
          component: NewPasswordViewVue
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      const { data } = await authApi.auth()
      if (data.user.admin) {
        next('/admin')
      } else {
        next()
      }
    } catch (error) {
      console.log(error.response.data.error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if (requiresAdmin) {
    try {
      const { data } = await authApi.auth()
      if (data.user.admin) {
        next()
      } else {
        next({ name: 'login' })
      }
    } catch (error) {
      console.log(error.response.data.error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
