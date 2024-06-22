import { createRouter, createWebHistory, RouterView } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
  ],
});

export default router;
