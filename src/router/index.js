import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('../views/SignUp.vue'),
      },
    ],
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/Todo.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
