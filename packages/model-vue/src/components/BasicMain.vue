<template>
  <v-main app>
    <v-container fluid class="pa-0">
      <router-view :spec="viewSpec" />
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * BasicMain Component
 * Main content area wrapper for router views
 */

const route = useRoute()

/**
 * Get view spec from route metadata and model
 */
const viewSpec = computed(() => {
  const model = (window as any).$model
  if (!model) return {}
  
  const viewName = route.meta?.view || model.main?.app?.web?.defaults?.view
  const viewConfig = model.main?.app?.web?.view?.[viewName]
  
  return viewConfig?.spec || {}
})
</script>

<style lang="scss" scoped>
/* BasicMain styles */
</style>
