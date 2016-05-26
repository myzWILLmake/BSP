import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App.vue'
import LogView from './components/LogView.vue'
import RegisterView from './components/RegisterView.vue'

import MainView from './components/MainView/index.vue'
import Account from './components/MainView/Account.vue'
import ChatsList from './components/MainView/ChatsList.vue'
import Contacts from './components/MainView/Contacts.vue'

import ChatRoomView from './components/ChatRoomView.vue'

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
  '/main': {
    name: 'main',
    component: MainView,
    subRoutes: {
      '/chats': {
        component: ChatsList
      },
      '/contacts': {
        component: Contacts
      },
      '/account': {
        component: Account
      }
    }
  },
  '/chats/:person_id':{
    name: 'room',
    component: ChatRoomView
  }
})


router.start(App, '#app')
