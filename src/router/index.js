import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FighterView from '../views/FighterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/fighter/:name',
      name: 'fighter',
      component: FighterView
    },
    {
      path: '/kameo/:name',
      name: 'kameo',
      component: FighterView // Используем тот же компонент, но с фильтром
    }
  ]
});

export default router;