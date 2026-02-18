/**
 * useStageRouting Composable
 * 
 * Manages route synchronization with navigation stages.
 * Handles trigger.select changes and currentStage updates from the Vuex store.
 */

import { watch } from 'vue'
import { useStore } from 'vuex'

export function useStageRouting() {
  const store = useStore()

  // ============================================================================
  // Methods
  // ============================================================================

  /**
   * Sync route with selected stage
   * Dispatches store actions to update current stage and trigger map selection
   * @param stageIndex - Stage index (0-based)
   */
  const syncRouteWithStage = (stageIndex: number): Promise<void> => {
    return Promise.resolve()
      .then(() => {
        // Update current stage in store
        store.commit('setCurrentStage', stageIndex + 1)
        return store.dispatch('setCurrentStage', stageIndex)
      })
      .then(() => {
        // Log for debugging
        console.log('Route synced with stage:', stageIndex)
      })
      .catch(error => {
        console.error('Error syncing route with stage:', error)
        throw error
      })
  }

  /**
   * Handle trigger.select value changes from store
   * Updates the active stage when map selection changes
   * @param value - Selected map value from trigger
   * @param routeMassages - Array of route messages to find matching stage
   * @param setActiveStage - Callback to update active stage
   */
  const handleTriggerSelect = (
    value: any,
    routeMassages: any[],
    setActiveStage: (index: number) => void
  ): void => {
    console.log('__trigger_select_value', value)

    // Find stage index that matches the selected map value
    const stageIndex = routeMassages.findIndex(stage => stage.map === value)
    
    if (stageIndex !== -1) {
      setActiveStage(stageIndex)
      console.log('__activeStage updated to', stageIndex)
    } else {
      // Default to first stage if no match
      setActiveStage(0)
    }
  }

  /**
   * Handle currentStage changes from store
   * @param newStage - New current stage value (1-based)
   * @param setActiveStage - Callback to update active stage
   */
  const handleStageChange = (
    newStage: number,
    setActiveStage: (index: number) => void
  ): void => {
    console.log('Current Stage changed:', newStage)
    
    // Convert to 0-based index
    setActiveStage(newStage - 1)
    
    // Dispatch to store
    store.dispatch('setCurrentStage', newStage)
      .catch(error => {
        console.error('Error dispatching setCurrentStage:', error)
      })
  }

  /**
   * Setup watchers for store state changes
   * @param routeMassages - Ref to route messages array
   * @param setActiveStage - Callback to update active stage
   */
  const setupStageWatchers = (
    routeMassages: any,
    setActiveStage: (index: number) => void
  ): void => {
    // Watch trigger.select.value changes
    watch(
      () => store.state.trigger?.select?.value,
      (value) => {
        if (value !== undefined && routeMassages.value) {
          handleTriggerSelect(value, routeMassages.value, setActiveStage)
        }
      }
    )

    // Watch currentStage changes
    watch(
      () => store.state.currentStage,
      (newVal) => {
        if (newVal !== undefined) {
          handleStageChange(newVal, setActiveStage)
        }
      }
    )
  }

  /**
   * Emit stage selected event to parent
   * @param stageMap - Map index for the selected stage
   */
  const emitStageSelected = (stageMap: number): void => {
    // This would typically emit an event, but in Composition API
    // we'll let the component handle the emit
    console.log('Stage selected with map:', stageMap)
  }

  // ============================================================================
  // Return Public API
  // ============================================================================

  return {
    syncRouteWithStage,
    handleTriggerSelect,
    handleStageChange,
    setupStageWatchers,
    emitStageSelected
  }
}
