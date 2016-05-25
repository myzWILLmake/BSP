import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App.vue'
import LogView from './components/LogView.vue'
import RegisterView from './components/RegisterView.vue'
import MainView from './components/MainView.vue'

Vue.use(Router)

var router = new Router()

router.map({
  '/login': {
    name: 'login',
    component: LogView
  },
  '/register': {
    name: 'register',
    component: RegisterView
  },
  '/main/:user_id': {
    name: 'main',
    component: MainView
  }
})

router.redirect({
  '*': '/login'
})

router.start(App, '#app')
