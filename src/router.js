import { auth } from './services/firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';

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
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('Login');
  else if (!requiresAuth && currentUser) next('Home');
  else next();
});

export default router;
