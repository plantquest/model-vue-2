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
          show: true,  // Show the drawer
          content: null,
          width: 280,
          logo: '<div style="padding: 10px; color: white; background: #27324A;">PlantQuest Demo</div>',
          showSearch2: false,  // False = Search mode, True = Navigation mode
          isExpanded: false,
          items: [],
          search: '',  // Primary search value
          search2: '',  // Secondary search (destination) in navigation mode
          filterIcon: true,  // Show filter icon
          prependIcon: 'mdi-magnify'  // Search icon
        },
        BasicNavStages: {
          currentStage: 0,
          stages: [],
          completedStages: [],
          history: []
        }
      },
      ent: {
        meta: {
          name: 'Vue 3 Demo'
        },
        asset: {
          list: [
            { tag: 'Asset 1', custom12: 'Description 1', id: 1 },
            { tag: 'Asset 2', custom12: 'Description 2', id: 2 },
            { tag: 'Test Asset', custom12: 'Test Description', id: 3 },
            { tag: 'Demo Item', custom12: 'Demo Description', id: 4 }
          ]
        },
        menu: {
          items: {
            home: { title: 'Home', icon: 'home', code: 'home' },
            components: { title: 'Components', icon: 'view-dashboard', code: 'components' },
            stages: { title: 'Stages', icon: 'map-marker-path', code: 'stages' }
          },
          order: 'home,components,stages'
        }
      },
      seneca: null
    },
    auth: {
      authenticated: false,
      user: null
    },
    // Mock building navigation data for BasicNavStages
    pathData: null,
    currentStage: 0,
    trigger: {
      select: {
        value: null
      }
    },
    // BasicSide navigation mode state (top-level for easy access)
    showSearch2: false,  // False = Search mode, True = Navigation mode
    showExpansion: false,  // Expansion panel state
    main_asset: [
      { map: 1, custom02: 'Level 1', x: 100, y: 200 },
      { map: 2, custom02: 'Level 2', x: 150, y: 250 },
      { map: 3, custom02: 'Level 3', x: 200, y: 300 }
    ]
  },
  mutations: {
    SET_CMP_FLAGS(state, { name, flags }) {
      if (state.vxg.cmp[name]) {
        Object.assign(state.vxg.cmp[name], flags)
      }
    },
    SET_AUTH(state, authData) {
      state.auth = authData
    },
    SET_ASSETS(state, assets) {
      if (!state.vxg.ent.asset) {
        state.vxg.ent.asset = {}
      }
      state.vxg.ent.asset.list = assets
    },
    // Required by BasicNavStages for stage selection
    setCurrentStage(state, stageIndex) {
      state.currentStage = stageIndex
      console.log('✅ Current stage set to:', stageIndex)
    }
  },
  actions: {
    set_cmp_flags({ commit }, payload) {
      commit('SET_CMP_FLAGS', payload)
    },
    
    // Required by BasicNavStages for route parsing
    set_path_data({ state }, { pathDetails }) {
      return new Promise((resolve) => {
        console.log('✅ set_path_data action called with:', pathDetails)
        // In real PlantQuest, this would process and store path details
        // For demo, just resolve successfully
        resolve({ success: true, pathDetails })
      })
    },
    
    // Required by BasicNavStages and useStageRouting for stage selection
    setCurrentStage({ commit }, stageIndex) {
      return new Promise((resolve) => {
        commit('setCurrentStage', stageIndex)
        console.log('✅ setCurrentStage action: navigated to stage', stageIndex)
        resolve()
      })
    },
    
    // Required by BasicHead and BasicSide components
    vxg_get_assets({ state, commit }, tool) {
      return new Promise((resolve) => {
        // Simulate asset loading
        setTimeout(() => {
          const assets = state.vxg.ent.asset?.list || []
          
          // Call the tool callback if provided (for MiniSearch integration)
          if (tool && tool.res) {
            tool.res(null, { assets })
          }
          
          resolve({ assets })
        }, 100)
      })
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
