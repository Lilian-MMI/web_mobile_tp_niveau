import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Accueil' },
    redirect: '/quizzs',
    children: [
      {
        path: '/quizzs',
        name: 'Quizzs',
        meta: { title: 'Les quizzs' },
        component: () => import('../views/Quizzs.vue'),
      },
      {
        path: '/quizzs/:id',
        params: { id: 'id' },
        name: 'Quizz',
        meta: { title: 'Jeu' },
        component: () => import('../views/Quizz.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    redirect: '/',
    meta: { title: 'Erreur 404' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
