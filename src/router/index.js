import Vue from 'vue'
import Router from 'vue-router'
import SortList from '@/components/SortList'
import SortList_List from '@/components/SortList_List'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'SortList',
      component: SortList
    },
    {
      path: "*", redirect: "/"
    }
  ]
})
