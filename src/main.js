import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App.vue'
import LogView from './components/LogView.vue'
import RegisterView from './components/RegisterView.vue'
import MainView from './components/MainView.vue'

import AccountView from './components/MainView/AccountView.vue'
import ChatsView from './components/MainView/ChatsView.vue'
import ContactsView from './components/MainView/ContactsView.vue'

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
    component: MainView,
    subRoutes: {
      '/chats': {
        component: ChatsView
      },
      '/contacts': {
        component: ContactsView
      },
      '/account': {
        component: AccountView
      }
    }
  }
})

router.redirect({
  '*': '/login'
})

router.start(App, '#app')
