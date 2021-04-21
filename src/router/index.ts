import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/',
    name: 'Editor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/editor/Editor.vue')
  }
];

const BASE_URL = process.env.NODE_ENV === 'production' ? 'data-visualization' : undefined;

const router: Router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
});

export default router;
