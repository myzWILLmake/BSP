import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

import App from './components/App.vue'
import LogView from './components/LogView.vue'
import RegisterView from './components/RegisterView.vue'

import MainView from './components/MainView/index.vue'
import Account from './components/MainView/Account.vue'
import ChatsList from './components/MainView/ChatsList.vue'
import Contacts from './components/MainView/Contacts.vue'
import NewFriends from './components/MainView/NewFriends.vue'
import AddFriend from './components/MainView/AddFriend.vue'
import ModifyInfo from './components/MainView/ModifyInfo.vue'

import ChatRoomView from './components/ChatRoomView.vue'

Vue.use(Router)
Vue.use(Resource)

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
        component: Contacts,
      },
      '/account': {
        component: Account
      }
    }
  },
  '/chats/:person_id': {
    name: 'room',
    component: ChatRoomView
  },
  '/add/friend': {
    name: 'add-friend',
    component: AddFriend
  },
  '/new/friends': {
    name: 'new-friends',
    component: NewFriends
  },
  '/modify': {
    name: 'modify',
    component: ModifyInfo
  }
})

router.start(App, '#app')
