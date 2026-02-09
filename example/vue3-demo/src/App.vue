<template>
  <v-app>
    <BasicHead
      title="Model-Vue 3 Demo"
      :search-enabled="true"
      :actions="actions"
    />

    <BasicSide :items="navItems" />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <BasicFoot
      :links="footerLinks"
      version="1.0.0-alpha.1"
      copyright="© 2026 PlantQuest"
    />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { BasicHead, BasicSide, BasicFoot } from '@plantquest/model-vue'

const actions = ref([
  { name: 'add', label: 'Add', icon: 'mdi-plus', type: 'emit' },
  { name: 'remove', label: 'Remove', icon: 'mdi-delete', type: 'emit' },
  { name: 'print', label: 'Print', icon: 'mdi-printer', type: 'emit' }
])

const navItems = ref([
  { code: 'home', label: 'Home', icon: 'mdi-home', route: '/' },
  { code: 'components', label: 'Components', icon: 'mdi-view-dashboard', route: '/components' },
  { code: 'stages', label: 'Stages', icon: 'mdi-stairs', route: '/stages' },
  { code: 'auth', label: 'Authentication', icon: 'mdi-login', route: '/auth' }
])

const footerLinks = ref([
  { id: 'docs', label: 'Documentation', route: '/docs' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/plantquest/model-vue-2' }
])
</script>
