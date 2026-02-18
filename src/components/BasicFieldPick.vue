<template>
  <v-select
    :model-value="modelValue"
    :items="filteredItems"
    :label="label"
    :disabled="disabled"
    :multiple="multiple"
    :loading="isLoading"
    item-title="text"
    item-value="value"
    variant="outlined"
    @update:model-value="handleSelection"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

/**
 * Field kind definition from the model
 */
interface FieldKind {
  title: string
  level?: number
}

/**
 * Field definition object
 */
interface Field {
  name: string
  title: string
  kind?: Record<string, FieldKind>
  readonly?: boolean
  custom?: {
    allow?: (...args: any[]) => boolean
    field?: Record<string, { filter?: (entry: [string, FieldKind]) => boolean }>
  }
}

/**
 * Select item for dropdown
 */
interface SelectItem {
  text: string
  value: string
}

/**
 * Component props
 */
interface Props {
  /** Field definition object containing metadata */
  field?: Field
  /** Parameters object containing item data */
  param?: {
    item?: Record<string, any>
  }
  /** Model value for v-model support */
  modelValue?: string | string[]
  /** Label text for the select */
  label?: string
  /** Whether field is disabled */
  disabled?: boolean
  /** Whether multiple selection is allowed */
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  field: () => ({ name: '', title: '', kind: {} }),
  param: () => ({ item: {} }),
  modelValue: undefined,
  label: '',
  disabled: false,
  multiple: false
})

/**
 * Component emits
 */
const emit = defineEmits<{
  /** Emitted when selection changes */
  'update:modelValue': [value: string | string[]]
  /** Emitted when selection changes (for backwards compatibility) */
  change: [value: string | string[]]
}>()

const store = useStore()
const isLoading = ref(false)

/**
 * Get the item from param
 */
const item = computed(() => props.param.item || {})

/**
 * Get custom field configuration
 */
const custom = computed(() => props.field.custom || {})

/**
 * Get allow function from custom config
 */
const allowFunc = computed(() => custom.value.allow || (() => true))

/**
 * Get current user from store
 */
const currentUser = computed(() => store?.state?.current_user || null)

/**
 * Create field filter function
 */
const makeFieldFilter = (field: Field) => {
  const filter =
    custom.value.field?.[field.name]?.filter

  return filter || (() => true)
}

/**
 * Generate select items from field kinds
 */
const pickItems = computed((): SelectItem[] => {
  const field = props.field
  const kinds = field.kind ? Object.entries(field.kind) : []
  
  let picks = kinds
    .filter(makeFieldFilter(field))
    .map(([n, d]) => ({
      text: d.title,
      value: n
    }))
  
  // Filter based on current user profile for permission-based dropdowns
  if (currentUser.value) {
    // If current user is Admin (sea), remove System Owner (gea) from options
    if (currentUser.value.profile === 'sea') {
      picks = picks.filter(item => item.value !== 'gea')
    }
    
    // If current user is User (ob), remove System Owner and Admin from options
    if (currentUser.value.profile === 'ob') {
      picks = picks.filter(item => 
        item.value !== 'gea' && item.value !== 'sea'
      )
    }
  }
  
  return picks
})

/**
 * Filtered items based on field configuration and permissions
 */
const filteredItems = computed(() => pickItems.value)

/**
 * Computed label from field or prop
 */
const label = computed(() => props.label || props.field.title || '')

/**
 * Computed disabled state
 */
const disabled = computed(() => {
  return props.disabled || 
         props.field.readonly || 
         !allowFunc.value('edit')
})

/**
 * Handle selection change
 */
const handleSelection = (value: string | string[]) => {
  // Update the item if we're in legacy mode with field/param
  if (props.field && item.value) {
    item.value[props.field.name] = value
  }
  
  emit('update:modelValue', value)
  emit('change', value)
}

/**
 * Allow function for permission checking
 */
const allow = (...args: any[]) => {
  return allowFunc.value(...args)
}

// Expose allow function for template usage
defineExpose({
  allow
})
</script>

<style lang="scss" scoped>
/* Component-specific styles */
</style>
