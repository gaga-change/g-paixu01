import Vue from 'vue'
import Router from 'vue-router'
import SortList from '@/components/SortList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SortList',
      component: SortList
    }
  ]
})
