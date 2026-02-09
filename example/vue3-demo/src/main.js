import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'
import routes from './router'

// Import model-vue components and composables
import Vxg from '@plantquest/model-vue'

// Create Vuex store with model-vue state structure
const store = createStore({
  state: {
    vxg: {
      cmp: {
        BasicHead: {
          show: true,
          allow: {
            add: true,
            remove: true,
            print: true,
            bookmark: true
          },
          actions: [],
          notifications: [],
          searchableItems: []
        },
        BasicSide: {
          show: false,
          content: null,
          width: 280
        },
        BasicNavStages: {
          currentStage: 0,
          stages: [
            { id: 0, label: 'Stage 1', icon: 'mdi-numeric-1', route: 'stage-1' },
            { id: 1, label: 'Stage 2', icon: 'mdi-numeric-2', route: 'stage-2' },
            { id: 2, label: 'Stage 3', icon: 'mdi-numeric-3', route: 'stage-3' }
          ],
          completedStages: [],
          history: []
        }
      },
      ent: {
        meta: {
          name: 'Vue 3 Demo'
        }
      }
    },
    auth: {
      authenticated: false,
      user: null
    }
  },
  mutations: {
    SET_CMP_FLAGS(state, { name, flags }) {
      if (state.vxg.cmp[name]) {
        Object.assign(state.vxg.cmp[name], flags)
      }
    }
  },
  actions: {
    set_cmp_flags({ commit }, payload) {
      commit('SET_CMP_FLAGS', payload)
    },
    'auth/login'({ commit }, credentials) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_AUTH', {
            authenticated: true,
            user: { id: 1, name: 'Demo User', email: credentials.email }
          })
          resolve()
        }, 500)
      })
    },
    'auth/logout'({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_AUTH', { authenticated: false, user: null })
          resolve()
        }, 200)
      })
    }
  }
})

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  }
})

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount app
const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)
app.use(Vxg)

app.mount('#app')
