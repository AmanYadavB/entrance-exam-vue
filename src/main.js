import Vue from 'vue'
import ace from 'brace'
import store from './store'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import {
  PageNotFound
} from './components/utils/PageNotFound';
import {
  ExamineeNavBar
} from './components/ExamineeNavBar';
import {
  ExaminerNavBar
} from './components/ExaminerNavBar'
Vue.config.productionTip = false

Vue.use( BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ace);
Vue.use( Router );
Vue.use( Vuelidate);
Vue.use( Vuex );
Vue.use( VueToast, {
  position: 'top'
});
Vue.component('PageNotFound',PageNotFound);
Vue.component('ExamineeNavBar',ExamineeNavBar);
Vue.component('ExaminerNavBar', ExaminerNavBar);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
