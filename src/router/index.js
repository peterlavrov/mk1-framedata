import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FighterView from '../views/FighterView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fighter/:name',
    name: 'fighter',
    component: FighterView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;