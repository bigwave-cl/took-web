import Vue from 'vue'
import App from './App'
import router from './router'
import GlobalComponents from './components';
import './utils/wxbutton.js';

Vue.config.productionTip = false;

Vue.use(GlobalComponents);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
