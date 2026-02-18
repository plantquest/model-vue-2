<template>
  <v-icon :color="color" :icon="icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * LED status type
 */
type LedStatus = 'on' | 'off' | 'warning' | 'error'

/**
 * Spec object for LED configuration
 */
interface LedSpec {
  /** Status value from item data */
  status?: LedStatus
  /** Field name to read status from */
  field?: string
}

/**
 * Param object containing item data
 */
interface LedParam {
  item?: Record<string, any>
}

/**
 * BasicLed component props
 */
interface Props {
  /** Direct status prop */
  status?: LedStatus
  /** Spec object for configuration */
  spec?: LedSpec
  /** Param object with item data */
  param?: LedParam
}

const props = withDefaults(defineProps<Props>(), {
  status: 'off',
  spec: () => ({}),
  param: () => ({})
})

/**
 * Resolved status from props, spec, or item
 */
const resolvedStatus = computed((): LedStatus => {
  // Priority: direct prop > spec.status > item[spec.field]
  if (props.status && props.status !== 'off') {
    return props.status
  }
  
  if (props.spec?.status) {
    return props.spec.status
  }
  
  if (props.spec?.field && props.param?.item) {
    const itemStatus = props.param.item[props.spec.field]
    if (itemStatus) {
      return itemStatus as LedStatus
    }
  }
  
  return 'off'
})

/**
 * Color based on status
 */
const color = computed(() => {
  switch (resolvedStatus.value) {
    case 'on':
      return 'green'
    case 'warning':
      return 'orange'
    case 'error':
      return 'red'
    case 'off':
    default:
      return 'grey'
  }
})

/**
 * Icon for the LED
 */
const icon = computed(() => 'mdi-circle')
</script>

<style lang="scss" scoped>
/* BasicLed styles */
</style>
