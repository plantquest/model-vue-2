<template>
  <v-expansion-panels v-model="panelModel" class="mb-12">
    <v-expansion-panel style="background-color: #DCEEEF">
      <v-expansion-panel-title 
        style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" 
        @click="handleToggleIcon"
      >
        <template v-slot:actions>
          <v-icon v-if="panelModel !== undefined">mdi-chevron-up</v-icon>
          <v-icon v-else>mdi-chevron-down</v-icon>
        </template>
        <v-icon class="mr-2">mdi-layers</v-icon>
        <h4 style="width: 300px; font-size: 14px; padding-left: 2px;">
          THIS ROUTE CONTAINS MULTIPLE LEVELS
        </h4>
      </v-expansion-panel-title>
      
      <v-expansion-panel-text style="padding-bottom: 10px;">
        <NavStageItem
          v-for="(stage, index) in stages"
          :key="stage.id || `stage-${index}`"
          :stage="stage"
          :index="index"
          :is-active="activeStage === index"
          @select="emit('stage-select', index)"
        />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import NavStageItem from './NavStageItem.vue'
import type { Stage } from '@/types/components'

interface Props {
  expanded: number | undefined
  stages: Stage[]
  activeStage: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:expanded': [value: number | undefined]
  'stage-select': [index: number]
  'toggle-icon': []
}>()

// Local panel model that syncs with parent
const panelModel = computed({
  get: () => props.expanded,
  set: (value) => emit('update:expanded', value)
})

// Icon source based on expansion state
const iconSrc = computed(() => 
  panelModel.value !== undefined ? 'nav_in.svg' : 'nav_out.svg'
)

const handleToggleIcon = () => {
  emit('toggle-icon')
}

// Watch for expansion changes
watch(() => props.expanded, (newVal) => {
  // Expansion state changed
})
</script>

<style lang="scss">
.v-expansion-panel-content__wrap {
  // border styling handled by parent
}

.v-expansion-panel.v-expansion-panel--active.v-item--active {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.v-divider {
  border-color: rgb(var(--vxg-ct2)) !important;
  margin: 16px 8px;
  height: 22px;
}
</style>
