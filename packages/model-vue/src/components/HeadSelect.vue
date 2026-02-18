<template>
  <v-select
    v-if="show && tool.select?.active"
    style="max-width:20%;display:inline-block;margin-left:10px;"
    :items="items"
    ref="selectRef"
    :label="tool.select?.title || 'Select'"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    tile
    outlined
    hide-details
    dense
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * Select item interface
 */
interface SelectItem {
  value: string
  text: string
}

/**
 * HeadSelect Props
 */
interface Props {
  /** Selected value */
  modelValue: string
  /** Select items */
  items: SelectItem[]
  /** Tool configuration */
  tool: any
  /** Show select */
  show: boolean
}

const props = defineProps<Props>()

/**
 * Component emits
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Template ref
const selectRef = ref()

/**
 * Expose select ref
 */
defineExpose({
  selectRef
})
</script>

<style lang="scss" scoped>
/* HeadSelect styles */
</style>
