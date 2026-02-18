<template>
  <v-icon
    v-if="show"
    large
    @click="handleClick"
    style="display:inline-block;"
    light
  >
    mdi-account
  </v-icon>
</template>

<script setup lang="ts">
/**
 * HeadUser Component
 * 
 * Simple user avatar icon that emits a click event.
 * Part of the BasicHead toolbar component suite.
 * 
 * @component
 */

interface Props {
  /** Whether to show the user icon */
  show?: boolean
}

interface Emits {
  /** Emitted when user icon is clicked */
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

const emit = defineEmits<Emits>()

/**
 * Handle user icon click
 * Emits click event to parent
 */
const handleClick = (): void => {
  emit('click')
}
</script>

<style lang="scss" scoped>
/* No custom styles needed - uses Vuetify defaults */
</style>
