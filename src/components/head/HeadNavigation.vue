<template>
  <div class="head-navigation">
    <!-- Drawer expand icon (left side) -->
    <template v-if="showExpandSide && !drawerOpen">
      <v-icon
        large
        @click="handleDrawerToggle"
        style="display:inline-block;"
        light
      >
        mdi-chevron-right
      </v-icon>
      <v-divider vertical style="margin:0px 16px;"></v-divider>
    </template>

    <!-- Detail collapse icon (right side) -->
    <template v-if="showExpandMain && !detailOpen">
      <v-divider vertical style="margin:0px 16px;"></v-divider>
      <v-icon
        large
        @click="handleDetailToggle"
        style="display:inline-block;"
        light
      >
        mdi-chevron-left
      </v-icon>
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * HeadNavigation Component
 * 
 * Provides navigation controls for opening/closing:
 * - Side drawer (BasicSide)
 * - Detail panel (BasicMain)
 * 
 * Part of the BasicHead toolbar component suite.
 * 
 * @component
 */

interface Props {
  /** Whether side drawer is currently open */
  drawerOpen?: boolean
  /** Whether detail panel is currently open */
  detailOpen?: boolean
  /** Whether to show drawer expand control */
  showExpandSide?: boolean
  /** Whether to show detail expand control */
  showExpandMain?: boolean
}

interface Emits {
  /** Emitted when drawer toggle is clicked */
  (e: 'toggle-drawer'): void
  /** Emitted when detail toggle is clicked */
  (e: 'toggle-detail'): void
}

const props = withDefaults(defineProps<Props>(), {
  drawerOpen: false,
  detailOpen: false,
  showExpandSide: false,
  showExpandMain: false
})

const emit = defineEmits<Emits>()

/**
 * Handle drawer toggle click
 */
const handleDrawerToggle = (): void => {
  emit('toggle-drawer')
}

/**
 * Handle detail toggle click
 */
const handleDetailToggle = (): void => {
  emit('toggle-detail')
}
</script>

<style lang="scss" scoped>
.head-navigation {
  display: inline-flex;
  align-items: center;
}
</style>
