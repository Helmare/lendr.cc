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
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/LoginView.vue')
    },
    {
      path: '/login/reset',
      name: 'reset',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/ResetPasswordView.vue')
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
    if (to.name == 'login' || to.name == 'reset') {
      return { name: from.name || 'dashboard' }
    }
    else if (me.role != 'admin' && to.meta.adminOnly) {
      return { name: from.name || 'dashboard' }
    }
  }
  else {
    if (to.name != 'login' && (to.name != 'reset' && !to.query.f)) {
      return { name: 'login' }
    }
  }
});

export default router;