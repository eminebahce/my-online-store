import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductList from '../components/ProductList.vue'
import OrderOverview from '../components/OrderOverview.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
