import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import GlobalComponents from './components';
import './utils/html.rem.js';

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);
Vue.use(GlobalComponents);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})