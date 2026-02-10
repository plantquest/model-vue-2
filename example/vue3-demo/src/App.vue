<template>
  <v-app>
    <!-- Simple header without complex components -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="!isSideRoute"></v-app-bar-nav-icon>
      <v-app-bar-title>Model-Vue 3 Demo</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-chip v-if="isSideRoute && isNavigationActive" color="success" size="small">
        Navigation Mode Active
      </v-chip>
    </v-app-bar>

    <!-- Standard Navigation Drawer (all pages except /side) -->
    <v-navigation-drawer v-if="!isSideRoute" v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.code"
          :to="item.route"
          link
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- BasicSide Component (only on /side route) -->
    <BasicSide 
      v-if="isSideRoute"
      :key="route.path"
      :spec="basicSideSpec"
      :logo="basicSideLogo"
    />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <v-spacer></v-spacer>
      <span>© 2026 PlantQuest - v1.0.0-alpha.1</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { BasicSide } from '@plantquest/model-vue'

const route = useRoute()
const store = useStore()
const drawer = ref(true)

// Computed property to check if we're on the side route
const isSideRoute = computed(() => route.name === 'side')

const basicSideLogo = '<div style="padding: 10px; color: white; background: #27324A; font-weight: bold;">🏢 PlantQuest</div>'
const basicSideSpec = {
  footer: {
    active: false
  },
  view: {}
}

const isNavigationActive = computed(() => store.state.showSearch2 || false)

const navItems = ref([
  { code: 'home', label: 'Home', icon: 'mdi-home', route: '/' },
  { code: 'components', label: 'Components', icon: 'mdi-view-dashboard', route: '/components' },
  { code: 'stages', label: 'Stages', icon: 'mdi-stairs', route: '/stages' },
  { code: 'side', label: 'Side Navigation', icon: 'mdi-menu', route: '/side' },
  { code: 'auth', label: 'Authentication', icon: 'mdi-login', route: '/auth' }
])
</script>
