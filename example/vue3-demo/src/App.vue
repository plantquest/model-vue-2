<template>
  <v-app>
    <!-- Simple header without complex components -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Model-Vue 3 Demo</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Simple navigation drawer -->
    <v-navigation-drawer v-model="drawer" app>
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
import { ref } from 'vue'

const drawer = ref(true)

const navItems = ref([
  { code: 'home', label: 'Home', icon: 'mdi-home', route: '/' },
  { code: 'components', label: 'Components', icon: 'mdi-view-dashboard', route: '/components' },
  { code: 'stages', label: 'Stages', icon: 'mdi-stairs', route: '/stages' },
  { code: 'auth', label: 'Authentication', icon: 'mdi-login', route: '/auth' }
])
</script>
