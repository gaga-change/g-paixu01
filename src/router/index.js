import Vue from 'vue'
import Router from 'vue-router'
import SortList from '@/components/SortList'
import Menu from '@/components/Menu'
import SortList_List from '@/components/SortList_List'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/sort-list',
      name: 'SortList',
      component: SortList
    }, {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: "*", redirect: "/menu"
    }
  ]
})
