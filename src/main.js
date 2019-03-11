import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import ItemList from '@/components/ItemList';
import EditForm from '@/components/EditForm';

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {path: '/', component: ItemList},
    {path: '/edit/:id?', component: EditForm},
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
