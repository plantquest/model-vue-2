<template>
  <v-expansion-panel 
    :model-value="modelValue"
    style="background-color:#DCEEEF"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-expansion-panel-title 
      style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"
    >
      <template #actions>
        <img 
          :src="`${publicPath}${iconSrc}`" 
          :alt="modelValue ? 'Collapse Icon' : 'Expand Icon'"
          style="margin-left: 45px;" 
        />
      </template>
      
      <img 
        :src="`${publicPath}Layers.svg`" 
        alt="Layers" 
        class="Layers" 
        style="margin-left: -16px; width: 30px;" 
      />
      
      <h4 style="width: 300px;font-size: 14px;padding-left: 2px;">
        THIS ROUTE CONTAINS MULTIPLE LEVELS
      </h4>
    </v-expansion-panel-title>
    
    <v-expansion-panel-text style="padding-bottom: 10px;">
      <slot></slot>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * NavStagePanel Props
 */
interface Props {
  /** Whether panel is expanded */
  modelValue: boolean
  /** Public path for assets */
  publicPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  publicPath: '/'
})

/**
 * Component emits
 */
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

/**
 * Icon source based on expansion state
 */
const iconSrc = computed(() => 
  props.modelValue ? 'nav_in.svg' : 'nav_out.svg'
)
</script>

<style lang="scss" scoped>
/* Styles inherited from BasicNavStages */
</style>
