<template>
  <v-combobox
    ref="searchRef"
    v-model="modelValue"
    :items="items"
    flat
    hide-details
    outlined
    dense
    clearable
    placeholder="Search"
    :append-icon="null"
    :filter="customFilter"
    :prepend-inner-icon="prependIcon"
    @keydown="emit('keydown', $event)"
    @click:clear="emit('clear', $event)"
    @change="emit('change', $event)"
    @click="emit('click')"
    @blur="emit('blur')"
    @click:append="emit('clickAppend')"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/**
 * HeadSearch Props
 */
interface Props {
  /** Search value */
  modelValue: string
  /** Autocomplete items */
  items: string[]
  /** Show icon */
  showIcon?: boolean
  /** Custom filter function */
  customFilter?: (item: any, queryText: string, itemText: string) => boolean
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  customFilter: undefined
})

/**
 * Component emits
 */
const emit = defineEmits<{
  'update:modelValue': [value: string]
  keydown: [event: KeyboardEvent]
  clear: [event: Event]
  change: [event: any]
  click: []
  blur: []
  clickAppend: []
}>()

// Template ref
const searchRef = ref()

/**
 * Prepend icon (magnify glass)
 */
const prependIcon = computed(() => 
  props.showIcon ? 'mdi-magnify magnifierIcon' : ''
)

/**
 * Expose search ref for parent access
 */
defineExpose({
  searchRef,
  reset: () => searchRef.value?.reset()
})
</script>

<style lang="scss" scoped>
.magnifierIcon {
  margin: 3px 0 0 40px;
  font-size: large;
  color: #141b2d;
}
</style>
