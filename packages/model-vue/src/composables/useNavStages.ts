/**
 * useNavStages Composable
 * 
 * Manages navigation stage state and route data parsing for BasicNavStages component.
 * Handles multi-level route progression with connector filtering and stage message generation.
 */

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import type { Stage, RouteMessage, ParsedLine, ParsedNode } from '@/types/components'

export function useNavStages() {
  const store = useStore()

  // ============================================================================
  // State
  // ============================================================================

  const stages = ref<Stage[]>([])
  const activeStage = ref(0)
  const routeMassages = ref<RouteMessage[]>([])
  const pathArray = ref<any>(null)
  const mapValues = ref<number[]>([])

  // ============================================================================
  // Computed
  // ============================================================================

  const hasStages = computed(() => routeMassages.value.length > 1)
  
  const currentStageData = computed(() => 
    stages.value[activeStage.value] || null
  )

  // ============================================================================
  // Methods
  // ============================================================================

  /**
   * Parse path data and generate navigation stages
   * @param pathData - Raw path data from store (asset123)
   */
  const parsePathData = (pathData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!pathData || !Array.isArray(pathData) || pathData.length === 0) {
        console.warn('Invalid or empty pathData')
        routeMassages.value = []
        stages.value = []
        resolve()
        return
      }

      try {
        pathArray.value = pathData[0]
        const parsedLines = parseLines(pathArray.value)
        
        // Map the parsedLines array to get map values
        mapValues.value = parsedLines.map(line => line.map)

        // Generate route steps and messages
        getRouteSteps(parsedLines)
          .then(messages => {
            routeMassages.value = messages
            stages.value = messages.map((msg, index) => ({
              id: `stage-${index}`,
              map: msg.map,
              msg: msg.msg,
              type: 'stage'
            }))
            resolve()
          })
          .catch(error => {
            console.error('Error generating route steps:', error)
            reject(error)
          })
      } catch (error) {
        console.error('Error parsing pathData:', error)
        routeMassages.value = []
        stages.value = []
        reject(error)
      }
    })
  }

  /**
   * Parse individual line from path data
   * @param line - Raw line string (format: [id,type,,x,y])
   */
  const parseLine = (line: string): { id: string; type: string } => {
    const lineData = line.split(',')
    const id = lineData[0]
    const type = lineData[1]
    return { id, type }
  }

  /**
   * Parse multiple lines of path data
   * @param data - Array of line data objects
   */
  const parseLines = (data: any[]): ParsedLine[] => {
    if (!data || !Array.isArray(data)) {
      return []
    }

    return data.map(lineData => {
      const dataArr = lineData.detail.split(',')
      return {
        id: dataArr[0],
        type: dataArr[1],
        map: lineData.index,
        x: parseFloat(dataArr[3]),
        y: parseFloat(dataArr[4])
      }
    })
  }

  /**
   * Filter out unique connectors (keep only sequences of connectors)
   * @param steps - Array of parsed line steps
   */
  const filterConnectors = (steps: ParsedLine[]): ParsedLine[] => {
    return steps.filter((step, i, arr) => {
      if (step.type !== 'Connector') return true
      
      const prev = arr[i - 1]
      const next = arr[i + 1]
      
      // Keep if previous or next is also a Connector
      if ((prev && prev.type === 'Connector') || (next && next.type === 'Connector')) {
        return true
      }
      
      // Remove if unique Connector
      return false
    })
  }

  /**
   * Generate route steps and messages from parsed data
   * @param routeData - Array of parsed lines
   */
  const getRouteSteps = (routeData: ParsedLine[]): Promise<RouteMessage[]> => {
    return new Promise((resolve) => {
      let steps = routeData
      const messages: RouteMessage[] = []
      
      // Offset set to zero
      const offset = 0
      
      for (let i = 0; i < steps.length - offset; i++) {
        if (steps[i].type === 'Connector') {
          // First node type connector (i)
          let msg = 'Follow route to stairs and proceed to '
          let j = i
          
          // Find sequence of connectors
          while (j < steps.length - 1 && steps[j + 1].type === 'Connector') {
            j++
          }
          
          // First node type Standard (j)
          const innerOffset = 0
          
          if (j < steps.length - innerOffset) {
            msg += getMapName(steps[j])
            messages.push({
              msg,
              map: steps[i].map - 1
            })
          }
          
          i = j
        }
      }
      
      // Add final destination message
      if (messages.length > 0) {
        messages.push({
          msg: 'Proceed to your destination.',
          map: steps[steps.length - 1].map - 1
        })
      }
      
      resolve(messages)
    })
  }

  /**
   * Get map/level name for a given node by finding nearest asset
   * @param node - Parsed node with coordinates
   */
  const getMapName = (node: ParsedLine): string => {
    const mainAssets = store.state.main_asset
    
    if (!mainAssets || !Array.isArray(mainAssets)) {
      return '@'
    }

    // Filter assets for the current map
    const assets = mainAssets.filter(
      (asset: any) => 
        !isNaN(parseInt(asset.map)) && 
        parseInt(asset.map) === node.map - 1
    )

    if (assets.length === 0) {
      return '@'
    }

    // Find closest asset
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

    return closest?.level || '@'
  }

  /**
   * Select a navigation stage
   * @param index - Stage index (0-based) or map value
   */
  const selectStage = (index: number): void => {
    console.log(`🔄 useNavStages.selectStage: Setting activeStage from ${activeStage.value} to ${index}`)
    activeStage.value = index
    
    // Update store
    store.commit('setCurrentStage', index + 1)
    console.log(`✅ useNavStages.selectStage: activeStage is now ${activeStage.value}`)
  }

  /**
   * Get the currently selected stage
   */
  const getSelectedStage = (): number => {
    return activeStage.value
  }

  /**
   * Clear all stage state
   */
  const clearStages = (): void => {
    stages.value = []
    routeMassages.value = []
    activeStage.value = 0
    pathArray.value = null
    mapValues.value = []
  }

  // ============================================================================
  // Return Public API
  // ============================================================================

  return {
    // State
    stages,
    activeStage,
    routeMassages,
    mapValues,
    
    // Computed
    hasStages,
    currentStageData,
    
    // Methods
    parsePathData,
    parseLine,
    parseLines,
    filterConnectors,
    getRouteSteps,
    getMapName,
    selectStage,
    getSelectedStage,
    clearStages
  }
}
