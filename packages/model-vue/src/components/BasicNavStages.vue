<template>
  <div 
    v-if="hasStages" 
    class="basic-nav-stages" 
    style="position: absolute; z-index: 99; height: 300px; left: 7px; top: 250px; max-width: calc(100% - 11px);"
  >
    <NavStagesExpansion
      v-model:expanded="isExpanded"
      :stages="stages"
      :active-stage="activeStage"
      @stage-select="handleStageSelect"
      @toggle-icon="handleIconToggle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useNavStages } from '@/composables/useNavStages'
import { useStageRouting } from '@/composables/useStageRouting'
import NavStagesExpansion from './NavStagesExpansion.vue'

// ============================================================================
// Component Setup
// ============================================================================

const store = useStore()

// ============================================================================
// Composables
// ============================================================================

const {
  stages,
  activeStage,
  routeMassages,
  hasStages,
  parsePathData,
  selectStage: selectStageComposable,
  clearStages
} = useNavStages()

const {
  syncRouteWithStage,
  handleTriggerSelect,
  handleStageChange
} = useStageRouting()

// ============================================================================
// Local State
// ============================================================================

const isExpanded = ref<number | undefined>(0)
const showNav = ref(true)

// ============================================================================
// Computed
// ============================================================================

const pathData = computed(() => store.state.pathData)
const currentStage = computed(() => store.state.currentStage)
const triggerSelectValue = computed(() => store.state.trigger?.select?.value)

// ============================================================================
// Emits
// ============================================================================

const emit = defineEmits<{
  stageSelected: [index: number]
}>()

// ============================================================================
// Methods
// ============================================================================

/**
 * Handle stage selection from child component
 */
const handleStageSelect = (index: number): void => {
  console.log(`🚀 BasicNavStages.handleStageSelect: Stage ${index} selected, current activeStage=${activeStage.value}`)
  
  // Get the map value for the selected stage
  const selectedStage = stages.value[index]
  const mapValue = selectedStage?.map
  
  // Select stage using composable
  selectStageComposable(index)
  
  console.log(`📊 BasicNavStages.handleStageSelect: After selectStageComposable, activeStage=${activeStage.value}`)
  
  // Sync route with stage
  syncRouteWithStage(index)
    .catch(error => {
      console.error('Error syncing route:', error)
    })
  
  // Emit to parent
  if (mapValue !== undefined) {
    emit('stageSelected', mapValue)
  }
}

/**
 * Handle icon toggle from expansion panel
 */
const handleIconToggle = (): void => {
  // Icon toggle is handled by NavStagesExpansion component
  console.log('Icon toggled, expanded:', isExpanded.value)
}

/**
 * Toggle navigation visibility (for event bus compatibility)
 */
const toggleShowNav = (): void => {
  showNav.value = !showNav.value
}

/**
 * Clear component state
 */
const clearState = (): void => {
  isExpanded.value = 0
  clearStages()
}

// ============================================================================
// Watchers
// ============================================================================

/**
 * Watch pathData changes from store
 */
watch(
  () => store.state.pathData,
  (data) => {
    if (!data || !data.asset123) {
      console.warn('PathData is undefined or missing asset123')
      clearStages()
      return
    }

    console.log('pathData changed, parsing...', data.asset123)

    // Parse path data using composable
    parsePathData(data.asset123)
      .then(() => {
        console.log('Path data parsed successfully, stages:', stages.value.length)
        
        // Dispatch to store
        return store.dispatch('set_path_data', { pathDetails: data.asset123 })
      })
      .then(result => {
        console.log('Dispatch result:', result)
      })
      .catch(error => {
        console.error('Error handling pathData:', error)
      })
  },
  { deep: true }
)

/**
 * Watch currentStage changes from store
 */
watch(
  () => store.state.currentStage,
  (newVal) => {
    if (newVal !== undefined) {
      handleStageChange(newVal, (index: number) => {
        activeStage.value = index
      })
    }
  }
)

/**
 * Watch trigger.select.value changes from store
 */
watch(
  () => store.state.trigger?.select?.value,
  (value) => {
    if (value !== undefined && routeMassages.value.length > 0) {
      handleTriggerSelect(
        value,
        routeMassages.value,
        (index: number) => {
          activeStage.value = index
        }
      )
    }
  }
)

/**
 * Watch expansion state changes
 */
watch(isExpanded, (newVal) => {
  console.log('Expansion state changed:', newVal)
})

// ============================================================================
// Lifecycle Hooks
// ============================================================================

/**
 * Mount lifecycle
 */
onMounted(() => {
  console.log('BasicNavStages mounted, currentStage:', store.state.currentStage)
  
  // Setup event bus listener for backward compatibility
  // Note: In Vue 3, event bus should be replaced with mitt or provide/inject
  // For now, we'll use provide/inject pattern if needed
  
  // If pathData already exists, parse it
  if (store.state.pathData?.asset123) {
    parsePathData(store.state.pathData.asset123)
      .catch(error => {
        console.error('Error parsing initial pathData:', error)
      })
  }
})

/**
 * Unmount lifecycle
 */
onUnmounted(() => {
  // Cleanup if needed
  console.log('BasicNavStages unmounted')
})
</script>

<style lang="scss">
.basic-nav-stages {
  .v-expansion-panel-content__wrap {
    // Panel content styling
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
}
</style>
