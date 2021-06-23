import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductList from '../components/ProductList.vue'
import OrderOverview from '../components/OrderOverview.vue'
import OrderConfirmation from '../components/OrderConfirmation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/OrderOverview',
    name: 'OrderOverview',
    component: OrderOverview,
  },
  {
    path: '/OrderConfirmation',
    name: 'OrderConfirmation',
    component: OrderConfirmation,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
