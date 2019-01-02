// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import Master from './components/layouts/Master';
import { store } from './store/store'
// import { auth } from 'firebase';

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

// Route guards:
router.beforeEach((to, from, next) => {
  // Check each route's meta:
  if (to.matched.some( record => record.meta.requiresAuth)) {
    // This route requires auth, check if logged in
    // if not, redirect to login page:
    if(!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some( record => record.meta.requiresVisitor)) {
    if(store.getters.loggedIn) {
      next({
        name: 'todo',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { Master },
  template: '<Master/>'
})
