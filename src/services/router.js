import { auth } from '../services/firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import Category from '../components/Category/Category.vue';
import Items from '../components/Items/Items.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/storagy',
      name: 'Storagy',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'category',
          name: 'Category',
          component: Category,
          children: [
            {
              path: ':id',
              name: 'CategoryItems',
              component: Items,
            }
          ]
        },
        {
          path: 'items',
          name: 'Items',
          component: Items,
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('Login');
  else if (!requiresAuth && currentUser) next('Storagy');
  else next();
});

export default router;
