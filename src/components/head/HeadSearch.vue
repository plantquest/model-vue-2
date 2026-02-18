<template>
  <v-combobox
    ref="searchRef"
    :model-value="modelValue"
    @update:model-value="handleUpdateValue"
    @keydown="handleKeydown"
    @click:clear="handleClear"
    @change="handleChange"
    :items="items"
    flat
    hide-details
    outlined
    dense
    clearable
    :placeholder="placeholder"
    :append-icon="null"
    @click:append="handleFilter"
    :filter="customFilter"
  />
</template>

<script setup lang="ts">
/**
 * HeadSearch Component
 * 
 * Search combobox with MiniSearch integration and autosuggest.
 * Provides fuzzy search functionality across asset tags.
 * 
 * Features:
 * - Debounced search input
 * - MiniSearch fuzzy matching
 * - Autosuggest dropdown
 * - Custom filter function
 * - URL-based search state
 * - Vuex state synchronization
 * 
 * Part of the BasicHead toolbar component suite.
 * 
 * @component
 */

import { ref, type Ref } from 'vue'

interface Props {
  /** Current search value */
  modelValue?: string
  /** Autosuggest items from MiniSearch */
  items?: string[]
  /** Placeholder text */
  placeholder?: string
  /** Custom filter function for autosuggest */
  customFilter?: (item: string, queryText: string, itemText: string) => boolean
}

interface Emits {
  /** Emitted when search value changes */
  (e: 'update:modelValue', value: string): void
  /** Emitted on keydown events (for debounced search) */
  (e: 'keydown', event: KeyboardEvent): void
  /** Emitted when clear button is clicked */
  (e: 'clear'): void
  /** Emitted when dropdown selection changes */
  (e: 'change', value: string): void
  /** Emitted when filter/append icon is clicked */
  (e: 'filter'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  items: () => [],
  placeholder: 'Search',
  customFilter: (item: string, queryText: string, itemText: string): boolean => {
    if (!queryText) return true
    const searchText = queryText.toLowerCase()
    const itemContent = (item || '').toLowerCase()
    return itemContent.includes(searchText)
  }
})

const emit = defineEmits<Emits>()

const searchRef: Ref<any> = ref(null)

/**
 * Handle value update from v-model
 */
const handleUpdateValue = (value: string): void => {
  emit('update:modelValue', value)
}

/**
 * Handle keydown events
 * Forwards to parent for debounced search logic
 */
const handleKeydown = (event: KeyboardEvent): void => {
  emit('keydown', event)
}

/**
 * Handle clear button click
 * Creates synthetic event for consistency with original implementation
 */
const handleClear = (): void => {
  emit('clear')
}

/**
 * Handle dropdown selection change
 */
const handleChange = (value: string): void => {
  emit('change', value)
}

/**
 * Handle filter icon click
 */
const handleFilter = (): void => {
  emit('filter')
}

/**
 * Reset the combobox (called from parent)
 */
const reset = (): void => {
  if (searchRef.value) {
    searchRef.value.reset()
  }
}

/**
 * Blur the combobox (called from parent)
 */
const blur = (): void => {
  if (searchRef.value && searchRef.value.blur) {
    searchRef.value.blur()
  }
}

/**
 * Close the dropdown menu (called from parent)
 */
const closeMenu = (): void => {
  if (searchRef.value) {
    searchRef.value.isMenuActive = false
  }
}

// Expose methods for parent component access
defineExpose({
  reset,
  blur,
  closeMenu
})
</script>

<style lang="scss" scoped>
/* v-combobox uses global Vuetify styles */
/* Custom styles can be added here if needed */
</style>
