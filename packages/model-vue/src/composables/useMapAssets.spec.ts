/**
 * useMapAssets Composable Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useMapAssets } from './useMapAssets'
import { createStore } from 'vuex'
import type { PathNode, Asset } from '@/types/navigation'

// Mock store with assets
const createMockStore = (assets: Asset[] = []) => {
  return createStore({
    state: {
      main_asset: assets
    }
  })
}

describe('useMapAssets', () => {
  let mockAssets: Asset[]

  beforeEach(() => {
    mockAssets = [
      { id: 'asset1', map: '0', xco: 100, yco: 100, level: 'Ground Floor' },
      { id: 'asset2', map: '0', xco: 200, yco: 200, level: 'Ground Floor' },
      { id: 'asset3', map: '1', xco: 150, yco: 150, level: 'Level 2' },
      { id: 'asset4', map: '1', xco: 300, yco: 300, level: 'Level 2' }
    ]
  })

  describe('getMapName', () => {
    it('should return level name for nearest asset', () => {
      const mockStore = createMockStore(mockAssets)
      global.useStore = () => mockStore
      
      const { getMapName } = useMapAssets()
      
      const node: PathNode = {
        id: 'node1',
        type: 'Standard',
        map: 1, // Map 0 in assets (map - 1)
        x: 110,
        y: 110
      }
      
      const result = getMapName(node)
      expect(result).toBe('Ground Floor')
    })

    it('should find closest asset by distance', () => {
      const mockStore = createMockStore(mockAssets)
      global.useStore = () => mockStore
      
      const { getMapName } = useMapAssets()
      
      const node: PathNode = {
        id: 'node1',
        type: 'Standard',
        map: 1,
        x: 190, // Closer to asset2 (200,200) than asset1 (100,100)
        y: 195
      }
      
      const result = getMapName(node)
      expect(result).toBe('Ground Floor')
    })

    it('should return @ when no assets found', () => {
      const mockStore = createMockStore([])
      global.useStore = () => mockStore
      
      const { getMapName } = useMapAssets()
      
      const node: PathNode = {
        id: 'node1',
        type: 'Standard',
        map: 1,
        x: 100,
        y: 100
      }
      
      const result = getMapName(node)
      expect(result).toBe('@')
    })

    it('should filter by correct map level', () => {
      const mockStore = createMockStore(mockAssets)
      global.useStore = () => mockStore
      
      const { getMapName } = useMapAssets()
      
      const node: PathNode = {
        id: 'node1',
        type: 'Standard',
        map: 2, // Map 1 in assets
        x: 160,
        y: 160
      }
      
      const result = getMapName(node)
      expect(result).toBe('Level 2')
    })
  })

  describe('getNearestAsset', () => {
    it('should return nearest asset object', () => {
      const mockStore = createMockStore(mockAssets)
      global.useStore = () => mockStore
      
      const { getNearestAsset } = useMapAssets()
      
      const node: PathNode = {
        id: 'node1',
        type: 'Standard',
        map: 1,
        x: 105,
        y: 105
      }
      
      const result = getNearestAsset(node)
      expect(result).toBeDefined()
      expect(result?.id).toBe('asset1')
    })

    it('should return undefined when no assets', () => {
      const mockStore = createMockStore([])
      global.useStore = () => mockStore
      
      const { getNearestAsset } = useMapAssets()
      
      const node: PathNode = {
        id: 'node1',
        type: 'Standard',
        map: 1,
        x: 100,
        y: 100
      }
      
      const result = getNearestAsset(node)
      expect(result).toBeUndefined()
    })
  })

  describe('getAssetsForMap', () => {
    it('should return assets for specific map', () => {
      const mockStore = createMockStore(mockAssets)
      global.useStore = () => mockStore
      
      const { getAssetsForMap } = useMapAssets()
      
      const result = getAssetsForMap(0)
      expect(result).toHaveLength(2)
      expect(result.every(a => a.map === '0')).toBe(true)
    })

    it('should return empty array when no assets on map', () => {
      const mockStore = createMockStore(mockAssets)
      global.useStore = () => mockStore
      
      const { getAssetsForMap } = useMapAssets()
      
      const result = getAssetsForMap(99)
      expect(result).toHaveLength(0)
    })
  })

  describe('calculateDistance', () => {
    it('should calculate correct distance', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { calculateDistance } = useMapAssets()
      
      const result = calculateDistance(0, 0, 3, 4)
      expect(result).toBe(5) // 3-4-5 triangle
    })

    it('should return 0 for same point', () => {
      const mockStore = createMockStore()
      global.useStore = () => mockStore
      
      const { calculateDistance } = useMapAssets()
      
      const result = calculateDistance(100, 100, 100, 100)
      expect(result).toBe(0)
    })
  })
})
