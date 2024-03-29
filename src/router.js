import { createRouter, createWebHistory } from 'vue-router';
import { useMemberStore } from './stores';
import DashboardView from './views/DashboardView.vue';
import LendrClient from './api/lendr';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { memberOnly: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/login/reset',
      name: 'reset',
      component: () => import('./views/ResetPasswordView.vue'),
      beforeEnter: (to, from) => {
        if (!to.query.f) {
          return { name: 'login' }
        }
      }
    },
    {
      path: '/member/payment',
      name: 'payment',
      component: () => import('./views/admin/PaymentView.vue'),
      meta: { adminOnly: true }
    },
    {
      path: '/member/:id',
      name: 'member',
      component: () => import('./views/admin/MemberView.vue'),
      meta: { adminOnly: true }
    },
    {
      path: '/loan/create',
      name: 'create-loan',
      component: () => import('./views/admin/CreateLoanView.vue'),
      meta: { adminOnly: true }
    }
  ]
});
router.beforeEach(async (to, from) => {
  const lendr = new LendrClient();
  const store = useMemberStore();

  // Check authentication.
  let me = null;
  if (lendr.isLoggedIn()) {
    const res = await lendr.get('/member/me', { requireAuth: true });
    if (res != null && res.status != 401) {
      me = await res.json();
    }
  }
  store.me = me;

  // Block and redirect.
  if (me) {
    if (!(to.meta.memberOnly || to.meta.adminOnly) || (to.meta.adminOnly && me.role != 'admin')) {
      return { name: 'dashboard' }
    }
  }
  else if (to.meta.memberOnly) {
    return { name: 'login' }
  }
});

export default router;