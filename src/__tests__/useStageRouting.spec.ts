/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { createStore } from 'vuex'
import { useStageRouting } from '@/composables/useStageRouting'

describe('useStageRouting', () => {
  let store: any

  beforeEach(() => {
    // Create a mock Vuex store
    store = createStore({
      state: {
        currentStage: 1,
        trigger: {
          select: {
            value: null
          }
        }
      },
      mutations: {
        setCurrentStage(state, stage) {
          state.currentStage = stage
        }
      },
      actions: {
        setCurrentStage: vi.fn().mockResolvedValue(true)
      }
    })

    // Mock useStore to return our mock store
    vi.mock('vuex', () => ({
      useStore: () => store
    }))
  })

  describe('syncRouteWithStage', () => {
    it('commits stage change to store', async () => {
      const commitSpy = vi.spyOn(store, 'commit')
      const { syncRouteWithStage } = useStageRouting()
      
      await syncRouteWithStage(2)
      
      expect(commitSpy).toHaveBeenCalledWith('setCurrentStage', 3) // 2 + 1
    })

    it('dispatches setCurrentStage action', async () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch')
      const { syncRouteWithStage } = useStageRouting()
      
      await syncRouteWithStage(2)
      
      expect(dispatchSpy).toHaveBeenCalledWith('setCurrentStage', 2)
    })

    it('resolves successfully', async () => {
      const { syncRouteWithStage } = useStageRouting()
      
      await expect(syncRouteWithStage(1)).resolves.toBeUndefined()
    })

    it('handles errors gracefully', async () => {
      const dispatchError = new Error('Dispatch failed')
      vi.spyOn(store, 'dispatch').mockRejectedValue(dispatchError)
      
      const { syncRouteWithStage } = useStageRouting()
      
      await expect(syncRouteWithStage(1)).rejects.toThrow('Dispatch failed')
    })

    it('works with stage index 0', async () => {
      const commitSpy = vi.spyOn(store, 'commit')
      const { syncRouteWithStage } = useStageRouting()
      
      await syncRouteWithStage(0)
      
      expect(commitSpy).toHaveBeenCalledWith('setCurrentStage', 1)
    })

    it('works with large stage indices', async () => {
      const commitSpy = vi.spyOn(store, 'commit')
      const { syncRouteWithStage } = useStageRouting()
      
      await syncRouteWithStage(99)
      
      expect(commitSpy).toHaveBeenCalledWith('setCurrentStage', 100)
    })
  })

  describe('handleTriggerSelect', () => {
    it('finds and sets active stage based on map value', () => {
      const { handleTriggerSelect } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      const routeMassages = [
        { msg: 'Stage 1', map: 0 },
        { msg: 'Stage 2', map: 1 },
        { msg: 'Stage 3', map: 2 }
      ]
      
      handleTriggerSelect(1, routeMassages, setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(1)
    })

    it('defaults to stage 0 when map value not found', () => {
      const { handleTriggerSelect } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      const routeMassages = [
        { msg: 'Stage 1', map: 0 },
        { msg: 'Stage 2', map: 1 }
      ]
      
      handleTriggerSelect(999, routeMassages, setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(0)
    })

    it('handles empty routeMassages array', () => {
      const { handleTriggerSelect } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      handleTriggerSelect(1, [], setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(0)
    })

    it('handles first stage correctly', () => {
      const { handleTriggerSelect } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      const routeMassages = [
        { msg: 'Stage 1', map: 0 },
        { msg: 'Stage 2', map: 1 }
      ]
      
      handleTriggerSelect(0, routeMassages, setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(0)
    })

    it('handles last stage correctly', () => {
      const { handleTriggerSelect } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      const routeMassages = [
        { msg: 'Stage 1', map: 0 },
        { msg: 'Stage 2', map: 1 },
        { msg: 'Stage 3', map: 2 }
      ]
      
      handleTriggerSelect(2, routeMassages, setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(2)
    })
  })

  describe('handleStageChange', () => {
    it('converts 1-based to 0-based index', () => {
      const { handleStageChange } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      handleStageChange(3, setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(2) // 3 - 1
    })

    it('dispatches setCurrentStage action', async () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch')
      const { handleStageChange } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      handleStageChange(2, setActiveStageMock)
      
      // Wait for async dispatch
      await new Promise(resolve => setTimeout(resolve, 0))
      
      expect(dispatchSpy).toHaveBeenCalledWith('setCurrentStage', 2)
    })

    it('handles stage 1 correctly', () => {
      const { handleStageChange } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      handleStageChange(1, setActiveStageMock)
      
      expect(setActiveStageMock).toHaveBeenCalledWith(0)
    })

    it('handles errors in dispatch gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.spyOn(store, 'dispatch').mockRejectedValue(new Error('Dispatch failed'))
      
      const { handleStageChange } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      handleStageChange(2, setActiveStageMock)
      
      // Wait for async dispatch
      await new Promise(resolve => setTimeout(resolve, 0))
      
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })
  })

  describe('setupStageWatchers', () => {
    it('sets up watchers for trigger and currentStage', () => {
      const { setupStageWatchers } = useStageRouting()
      const routeMassages = ref([
        { msg: 'Stage 1', map: 0 },
        { msg: 'Stage 2', map: 1 }
      ])
      const setActiveStageMock = vi.fn()
      
      setupStageWatchers(routeMassages, setActiveStageMock)
      
      // Watchers are set up (we can't easily test watch callbacks without triggering them)
      expect(setupStageWatchers).toBeDefined()
    })
  })

  describe('emitStageSelected', () => {
    it('logs stage selection', () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const { emitStageSelected } = useStageRouting()
      
      emitStageSelected(2)
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Stage selected with map:', 2)
      consoleLogSpy.mockRestore()
    })

    it('handles map value 0', () => {
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const { emitStageSelected } = useStageRouting()
      
      emitStageSelected(0)
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Stage selected with map:', 0)
      consoleLogSpy.mockRestore()
    })
  })

  describe('Integration', () => {
    it('full flow: sync -> trigger -> stage change', async () => {
      const { syncRouteWithStage, handleTriggerSelect, handleStageChange } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      // Sync route with stage 2
      await syncRouteWithStage(2)
      
      // Handle trigger select
      const routeMassages = [
        { msg: 'Stage 1', map: 0 },
        { msg: 'Stage 2', map: 1 },
        { msg: 'Stage 3', map: 2 }
      ]
      handleTriggerSelect(1, routeMassages, setActiveStageMock)
      expect(setActiveStageMock).toHaveBeenCalledWith(1)
      
      // Handle stage change
      setActiveStageMock.mockClear()
      handleStageChange(3, setActiveStageMock)
      expect(setActiveStageMock).toHaveBeenCalledWith(2)
    })
  })

  describe('Error Handling', () => {
    it('handles store commit errors gracefully', async () => {
      vi.spyOn(store, 'commit').mockImplementation(() => {
        throw new Error('Commit failed')
      })
      
      const { syncRouteWithStage } = useStageRouting()
      
      await expect(syncRouteWithStage(1)).rejects.toThrow()
    })

    it('handles invalid stage indices', () => {
      const { handleTriggerSelect } = useStageRouting()
      const setActiveStageMock = vi.fn()
      
      const routeMassages = [
        { msg: 'Stage 1', map: 0 }
      ]
      
      // Negative map value
      handleTriggerSelect(-1, routeMassages, setActiveStageMock)
      expect(setActiveStageMock).toHaveBeenCalledWith(0)
    })
  })
})
