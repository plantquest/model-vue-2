/**
 * useNavStages Composable Tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNavStages } from './useNavStages'
import { createStore } from 'vuex'

// Mock Vuex store
const createMockStore = (state = {}) => {
  return createStore({
    state: {
      currentStage: 1,
      activeStage: 0,
      trigger: {
        select: {
          value: null
        }
      },
      ...state
    },
    mutations: {
      setCurrentStage: vi.fn()
    },
    actions: {
      setCurrentStage: vi.fn()
    }
  })
}

describe('useNavStages', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, selectedStage } = useNavStages()
      
      expect(activeStage.value).toBe(0)
      expect(selectedStage.value).toBe(0)
    })

    it('should provide currentStage from store', () => {
      const mockStore = createMockStore({ currentStage: 3 })
      global.useStore = () => mockStore
      
      const { currentStage } = useNavStages()
      
      expect(currentStage.value).toBe(3)
    })
  })

  describe('selectStage', () => {
    it('should update local activeStage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, selectStage } = useNavStages()
      
      selectStage(2)
      
      expect(activeStage.value).toBe(2)
    })

    it('should update selectedStage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { selectedStage, selectStage } = useNavStages()
      
      selectStage(2)
      
      expect(selectedStage.value).toBe(2)
    })

    it('should commit to store with 1-indexed value', () => {
      const mockStore = createMockStore()
      const commitSpy = vi.spyOn(mockStore, 'commit')
      global.useStore = () => mockStore
      
      const { selectStage } = useNavStages()
      selectStage(2)
      
      expect(commitSpy).toHaveBeenCalledWith('setCurrentStage', 3)
    })

    it('should dispatch to store with 0-indexed value', () => {
      const mockStore = createMockStore()
      const dispatchSpy = vi.spyOn(mockStore, 'dispatch')
      global.useStore = () => mockStore
      
      const { selectStage } = useNavStages()
      selectStage(2)
      
      expect(dispatchSpy).toHaveBeenCalledWith('setCurrentStage', 2)
    })

    it('should return index and map', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { selectStage } = useNavStages()
      const result = selectStage(2, 5)
      
      expect(result).toEqual({ index: 2, map: 5 })
    })
  })

  describe('Navigation Methods', () => {
    it('should go to next stage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, nextStage } = useNavStages()
      
      nextStage(5) // 5 total stages
      
      expect(activeStage.value).toBe(1)
    })

    it('should not go past last stage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, selectStage, nextStage } = useNavStages()
      
      selectStage(4) // Set to last stage (of 5)
      nextStage(5)
      
      expect(activeStage.value).toBe(4) // Should stay at 4
    })

    it('should go to previous stage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, selectStage, prevStage } = useNavStages()
      
      selectStage(2)
      prevStage()
      
      expect(activeStage.value).toBe(1)
    })

    it('should not go before first stage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, prevStage } = useNavStages()
      
      prevStage()
      
      expect(activeStage.value).toBe(0) // Should stay at 0
    })

    it('should reset to first stage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { activeStage, selectStage, resetStages } = useNavStages()
      
      selectStage(3)
      resetStages()
      
      expect(activeStage.value).toBe(0)
    })
  })

  describe('getSelectedStage', () => {
    it('should return current selected stage', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { selectStage, getSelectedStage } = useNavStages()
      
      selectStage(2)
      
      expect(getSelectedStage()).toBe(2)
    })
  })
})
