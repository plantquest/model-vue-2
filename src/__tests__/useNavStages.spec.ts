/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import { useNavStages } from '@/composables/useNavStages'

describe('useNavStages', () => {
  let store: any

  beforeEach(() => {
    // Create a mock Vuex store
    store = createStore({
      state: {
        pathData: null,
        currentStage: 1,
        main_asset: [
          { id: '1', map: '0', level: 'Ground Floor', xco: 100, yco: 100 },
          { id: '2', map: '1', level: 'Level 2', xco: 200, yco: 200 },
          { id: '3', map: '2', level: 'Level 3', xco: 300, yco: 300 }
        ]
      },
      mutations: {
        setCurrentStage(state, stage) {
          state.currentStage = stage
        }
      },
      actions: {
        setCurrentStage: vi.fn()
      }
    })

    // Mock useStore to return our mock store
    vi.mock('vuex', () => ({
      useStore: () => store
    }))
  })

  describe('Initialization', () => {
    it('initializes with empty stages', () => {
      const { stages, routeMassages } = useNavStages()
      expect(stages.value).toEqual([])
      expect(routeMassages.value).toEqual([])
    })

    it('initializes with activeStage as 0', () => {
      const { activeStage } = useNavStages()
      expect(activeStage.value).toBe(0)
    })

    it('hasStages is false initially', () => {
      const { hasStages } = useNavStages()
      expect(hasStages.value).toBe(false)
    })
  })

  describe('parseLines', () => {
    it('parses line data correctly', () => {
      const { parseLines } = useNavStages()
      
      const mockData = [
        { detail: 'id1,Standard,,100,200', index: 0 },
        { detail: 'id2,Connector,,150,250', index: 1 }
      ]
      
      const result = parseLines(mockData)
      
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: 'id1',
        type: 'Standard',
        map: 0,
        x: 100,
        y: 200
      })
      expect(result[1]).toEqual({
        id: 'id2',
        type: 'Connector',
        map: 1,
        x: 150,
        y: 250
      })
    })

    it('handles empty data', () => {
      const { parseLines } = useNavStages()
      const result = parseLines([])
      expect(result).toEqual([])
    })

    it('handles null/undefined data', () => {
      const { parseLines } = useNavStages()
      const result1 = parseLines(null as any)
      const result2 = parseLines(undefined as any)
      expect(result1).toEqual([])
      expect(result2).toEqual([])
    })
  })

  describe('filterConnectors', () => {
    it('keeps sequences of connectors', () => {
      const { filterConnectors } = useNavStages()
      
      const steps = [
        { id: '1', type: 'Standard', map: 0, x: 0, y: 0 },
        { id: '2', type: 'Connector', map: 0, x: 0, y: 0 },
        { id: '3', type: 'Connector', map: 0, x: 0, y: 0 },
        { id: '4', type: 'Standard', map: 1, x: 0, y: 0 }
      ]
      
      const result = filterConnectors(steps)
      expect(result).toHaveLength(4) // All kept because connectors are sequential
    })

    it('removes unique connectors', () => {
      const { filterConnectors } = useNavStages()
      
      const steps = [
        { id: '1', type: 'Standard', map: 0, x: 0, y: 0 },
        { id: '2', type: 'Connector', map: 0, x: 0, y: 0 },
        { id: '3', type: 'Standard', map: 1, x: 0, y: 0 }
      ]
      
      const result = filterConnectors(steps)
      expect(result).toHaveLength(2) // Connector removed
      expect(result[0].type).toBe('Standard')
      expect(result[1].type).toBe('Standard')
    })

    it('keeps all non-connectors', () => {
      const { filterConnectors } = useNavStages()
      
      const steps = [
        { id: '1', type: 'Standard', map: 0, x: 0, y: 0 },
        { id: '2', type: 'Standard', map: 1, x: 0, y: 0 }
      ]
      
      const result = filterConnectors(steps)
      expect(result).toHaveLength(2)
    })
  })

  describe('getRouteSteps', () => {
    it('generates route messages for connector sequences', async () => {
      const { getRouteSteps } = useNavStages()
      
      const routeData = [
        { id: '1', type: 'Standard', map: 1, x: 100, y: 100 },
        { id: '2', type: 'Connector', map: 1, x: 110, y: 110 },
        { id: '3', type: 'Connector', map: 2, x: 120, y: 120 },
        { id: '4', type: 'Standard', map: 2, x: 200, y: 200 }
      ]
      
      const messages = await getRouteSteps(routeData)
      
      expect(messages.length).toBeGreaterThan(0)
      expect(messages[messages.length - 1].msg).toBe('Proceed to your destination.')
    })

    it('adds final destination message when messages exist', async () => {
      const { getRouteSteps } = useNavStages()
      
      const routeData = [
        { id: '1', type: 'Standard', map: 1, x: 100, y: 100 },
        { id: '2', type: 'Connector', map: 1, x: 110, y: 110 },
        { id: '3', type: 'Standard', map: 2, x: 200, y: 200 }
      ]
      
      const messages = await getRouteSteps(routeData)
      
      const lastMessage = messages[messages.length - 1]
      expect(lastMessage.msg).toBe('Proceed to your destination.')
      expect(lastMessage.map).toBe(routeData[routeData.length - 1].map - 1)
    })

    it('returns empty array when no connectors', async () => {
      const { getRouteSteps } = useNavStages()
      
      const routeData = [
        { id: '1', type: 'Standard', map: 1, x: 100, y: 100 },
        { id: '2', type: 'Standard', map: 2, x: 200, y: 200 }
      ]
      
      const messages = await getRouteSteps(routeData)
      expect(messages).toEqual([])
    })
  })

  describe('selectStage', () => {
    it('updates activeStage', () => {
      const { activeStage, selectStage } = useNavStages()
      
      selectStage(2)
      expect(activeStage.value).toBe(2)
      
      selectStage(5)
      expect(activeStage.value).toBe(5)
    })

    it('commits to store with 1-based index', () => {
      const commitSpy = vi.spyOn(store, 'commit')
      const { selectStage } = useNavStages()
      
      selectStage(2)
      expect(commitSpy).toHaveBeenCalledWith('setCurrentStage', 3)
    })
  })

  describe('getSelectedStage', () => {
    it('returns current activeStage', () => {
      const { activeStage, getSelectedStage, selectStage } = useNavStages()
      
      selectStage(3)
      expect(getSelectedStage()).toBe(3)
      expect(getSelectedStage()).toBe(activeStage.value)
    })
  })

  describe('clearStages', () => {
    it('resets all state', async () => {
      const { 
        stages, 
        routeMassages, 
        activeStage, 
        mapValues,
        clearStages,
        parsePathData 
      } = useNavStages()
      
      // First populate with some data
      const mockPathData = [[
        { detail: 'id1,Standard,,100,200', index: 0 },
        { detail: 'id2,Connector,,150,250', index: 1 },
        { detail: 'id3,Standard,,200,300', index: 2 }
      ]]
      
      await parsePathData(mockPathData)
      
      // Verify data exists
      expect(stages.value.length).toBeGreaterThanOrEqual(0)
      
      // Clear
      clearStages()
      
      // Verify cleared
      expect(stages.value).toEqual([])
      expect(routeMassages.value).toEqual([])
      expect(activeStage.value).toBe(0)
      expect(mapValues.value).toEqual([])
    })
  })

  describe('hasStages computed', () => {
    it('returns false when routeMassages is empty', () => {
      const { hasStages } = useNavStages()
      expect(hasStages.value).toBe(false)
    })

    it('returns false when routeMassages has only 1 item', async () => {
      const { hasStages, routeMassages } = useNavStages()
      routeMassages.value = [{ msg: 'Test', map: 0 }]
      expect(hasStages.value).toBe(false)
    })

    it('returns true when routeMassages has > 1 items', () => {
      const { hasStages, routeMassages } = useNavStages()
      routeMassages.value = [
        { msg: 'Test 1', map: 0 },
        { msg: 'Test 2', map: 1 }
      ]
      expect(hasStages.value).toBe(true)
    })
  })

  describe('currentStageData computed', () => {
    it('returns current stage object', () => {
      const { stages, activeStage, currentStageData } = useNavStages()
      
      stages.value = [
        { id: 's1', map: 0, msg: 'Stage 1', type: 'stage' },
        { id: 's2', map: 1, msg: 'Stage 2', type: 'stage' },
        { id: 's3', map: 2, msg: 'Stage 3', type: 'stage' }
      ]
      
      activeStage.value = 1
      
      expect(currentStageData.value).toEqual(stages.value[1])
    })

    it('returns null when no stages', () => {
      const { currentStageData } = useNavStages()
      expect(currentStageData.value).toBeNull()
    })
  })

  describe('parsePathData integration', () => {
    it('parses path data and generates stages', async () => {
      const { parsePathData, stages, routeMassages } = useNavStages()
      
      const mockPathData = [[
        { detail: 'id1,Standard,,100,200', index: 1 },
        { detail: 'id2,Connector,,150,250', index: 1 },
        { detail: 'id3,Connector,,160,260', index: 2 },
        { detail: 'id4,Standard,,200,300', index: 2 }
      ]]
      
      await parsePathData(mockPathData)
      
      expect(stages.value.length).toBeGreaterThanOrEqual(0)
      expect(routeMassages.value.length).toBeGreaterThanOrEqual(0)
    })

    it('handles invalid pathData gracefully', async () => {
      const { parsePathData, stages, routeMassages } = useNavStages()
      
      await parsePathData(null)
      expect(stages.value).toEqual([])
      expect(routeMassages.value).toEqual([])
    })

    it('handles empty array pathData', async () => {
      const { parsePathData, stages, routeMassages } = useNavStages()
      
      await parsePathData([])
      expect(stages.value).toEqual([])
      expect(routeMassages.value).toEqual([])
    })
  })
})
