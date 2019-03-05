import Vue from 'vue';
import App from './App.vue';
import router from './services/router';
import { auth } from './services/firebase';

let app = '';
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
