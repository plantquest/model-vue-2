<template>
  <div class="head-toolbar">
    <!-- Select dropdown -->
    <v-select
      v-if="showSelect"
      style="max-width:20%;display:inline-block;margin-left:10px;"
      :items="selectItems"
      ref="selectRef"
      :label="selectLabel"
      :model-value="modelValue"
      @update:model-value="handleSelectChange"
      tile
      outlined
      hide-details
      dense
    />

    <!-- Add button -->
    <template v-if="showAdd">
      <v-btn
        class="vxg-head-btn"
        @click="handleAdd"
      >
        <v-icon start>
          mdi-map-marker-path
        </v-icon>
        Add {{ addButtonText }}
      </v-btn>
      <v-divider vertical class="mx-4"></v-divider>
    </template>

    <!-- Remove button -->
    <template v-if="showRemove">
      <v-btn
        class="vxg-head-btn"
        @click="handleRemove"
      >
        <v-icon start>
          mdi-map-marker-path
        </v-icon>
        Remove {{ itemName }}
      </v-btn>
      <v-divider vertical class="mx-4"></v-divider>
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * HeadToolbar Component
 * 
 * Provides entity selector and action buttons for BasicHead toolbar:
 * - Entity type selector dropdown
 * - Add entity button
 * - Remove entity button
 * 
 * Part of the BasicHead toolbar component suite.
 * 
 * @component
 */

import { computed, ref } from 'vue'

export interface SelectItem {
  value: string
  text: string
}

interface Props {
  /** Current select value */
  modelValue?: string
  /** Select dropdown items */
  selectItems?: SelectItem[]
  /** Select dropdown label */
  selectLabel?: string
  /** Entity name for button labels */
  itemName?: string
  /** Whether to show select dropdown */
  showSelect?: boolean
  /** Whether to show add button */
  showAdd?: boolean
  /** Whether to show remove button */
  showRemove?: boolean
}

interface Emits {
  /** Emitted when select value changes */
  (e: 'update:modelValue', value: string): void
  /** Emitted when add button is clicked */
  (e: 'add'): void
  /** Emitted when remove button is clicked */
  (e: 'remove'): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  selectItems: () => [],
  selectLabel: '',
  itemName: 'Item',
  showSelect: false,
  showAdd: false,
  showRemove: false
})

const emit = defineEmits<Emits>()

const selectRef = ref()

/**
 * Add button text with special handling for Asset type
 * "Asset" becomes "Fixed Asset", others use entity name as-is
 */
const addButtonText = computed<string>(() => {
  return props.itemName === 'Asset' ? 'Fixed Asset' : props.itemName
})

/**
 * Handle select dropdown change
 */
const handleSelectChange = (value: string): void => {
  emit('update:modelValue', value)
}

/**
 * Handle add button click
 */
const handleAdd = (): void => {
  emit('add')
}

/**
 * Handle remove button click
 */
const handleRemove = (): void => {
  emit('remove')
}
</script>

<style lang="scss" scoped>
.head-toolbar {
  display: inline-flex;
  align-items: center;
}

.vxg-head-btn {
  height: 100%;
  background-color: white !important;
  color: rgb(var(--vxg-ct0));
  text-transform: none !important;
  box-shadow: none !important;
  margin-left: 10px;
  
  .v-icon {
    color: rgb(var(--vxg-ci0)) !important;
  }
}
</style>
