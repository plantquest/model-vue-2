/**
 * useMapAssets Composable
 * Handles map and asset integration for navigation
 */

import { computed } from 'vue'
import { useStore } from 'vuex'
import type { PathNode, Asset } from '@/types/navigation'

/**
 * Composable for map and asset operations
 */
export function useMapAssets() {
  const store = useStore()
  
  // Computed main assets from store
  const mainAssets = computed<Asset[]>(() => store.state.main_asset || [])
  
  /**
   * Get map/level name for a path node
   * Finds the nearest asset and returns its level name
   * @param node - Path node with coordinates and map index
   * @returns Level name or '@' if not found
   */
  const getMapName = (node: PathNode): string => {
    console.log('Getting map name for node:', node)
    console.log('Available assets:', mainAssets.value)
    
    // Filter assets on the same map level
    const assets = mainAssets.value.filter((asset: Asset) => 
      !isNaN(parseInt(asset.map as string)) && 
      parseInt(asset.map as string) === node.map - 1
    )
    
    if (assets.length === 0) {
      console.warn('No assets found for map:', node.map - 1)
      return '@'
    }
    
    // Find closest asset by distance
    let closest = assets[0]
    let mindist = Infinity
    
    for (const asset of assets) {
      const dist = Math.sqrt(
        Math.pow(asset.xco - node.x, 2) + 
        Math.pow(asset.yco - node.y, 2)
      )
      
      if (dist < mindist) {
        closest = asset
        mindist = dist
      }
    }
    
    console.log('Closest asset:', closest, 'distance:', mindist)
    
    return closest?.level || '@'
  }
  
  /**
   * Get the nearest asset to a path node
   * @param node - Path node with coordinates
   * @returns Nearest asset or undefined
   */
  const getNearestAsset = (node: PathNode): Asset | undefined => {
    const assets = mainAssets.value.filter((asset: Asset) => 
      !isNaN(parseInt(asset.map as string)) && 
      parseInt(asset.map as string) === node.map - 1
    )
    
    if (assets.length === 0) return undefined
    
    let closest = assets[0]
    let mindist = Infinity
    
    for (const asset of assets) {
      const dist = Math.sqrt(
        Math.pow(asset.xco - node.x, 2) + 
        Math.pow(asset.yco - node.y, 2)
      )
      
      if (dist < mindist) {
        closest = asset
        mindist = dist
      }
    }
    
    return closest
  }
  
  /**
   * Get assets for a specific map level
   * @param mapIndex - Map level index
   * @returns Array of assets on that level
   */
  const getAssetsForMap = (mapIndex: number): Asset[] => {
    return mainAssets.value.filter((asset: Asset) => 
      parseInt(asset.map as string) === mapIndex
    )
  }
  
  /**
   * Calculate distance between two points
   * @param x1, y1 - First point coordinates
   * @param x2, y2 - Second point coordinates
   * @returns Distance
   */
  const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }
  
  return {
    mainAssets,
    getMapName,
    getNearestAsset,
    getAssetsForMap,
    calculateDistance
  }
}
