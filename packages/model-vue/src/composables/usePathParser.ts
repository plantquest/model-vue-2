/**
 * usePathParser Composable
 * Parses path data and generates stage messages
 */

import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import type { PathNode, PathLineData, StageMessage } from '@/types/navigation'

/**
 * Composable for parsing path data into navigation stages
 */
export function usePathParser(getMapName: (node: PathNode) => string) {
  const store = useStore()
  
  // State
  const routeMassages = ref<StageMessage[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  
  /**
   * Parse a single line of path data
   */
  const parseLine = (line: string) => {
    const lineData = line.split(',')
    return {
      id: lineData[0],
      type: lineData[1]
    }
  }
  
  /**
   * Parse multiple lines of path data
   */
  const parseLines = (data: PathLineData[]): PathNode[] => {
    if (!data) return []
    
    return data.map(lineData => {
      const parts = lineData.detail.split(',')
      return {
        id: parts[0],
        type: parts[1],
        map: lineData.index,
        x: parseFloat(parts[3]),
        y: parseFloat(parts[4])
      }
    })
  }
  
  /**
   * Filter connector nodes
   * Keeps only connectors that are adjacent to other connectors
   */
  const filterConnectors = (steps: PathNode[]): PathNode[] => {
    return steps.filter((step, i, arr) => {
      if (step.type !== 'Connector') return true
      
      const prev = arr[i - 1]
      const next = arr[i + 1]
      
      // Keep if previous or next is also a Connector
      if ((prev?.type === 'Connector') || (next?.type === 'Connector')) {
        return true
      }
      
      // Remove if unique Connector
      return false
    })
  }
  
  /**
   * Generate route steps with human-readable messages
   */
  const getRouteSteps = async (routeData: PathNode[]): Promise<StageMessage[]> => {
    const steps = routeData
    const messages: StageMessage[] = []
    const offset = 0
    
    for (let i = 0; i < steps.length - offset; i++) {
      if (steps[i].type === 'Connector') {
        let msg = 'Follow route to stairs and proceed to '
        let j = i
        
        // Find consecutive connectors
        while (j < steps.length - 1 && steps[j + 1].type === 'Connector') {
          j++
        }
        
        // Add destination level name
        if (j < steps.length - offset) {
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
    
    console.log('Generated route steps:', messages)
    return messages
  }
  
  /**
   * Process stages (alternative message format)
   */
  const processStages = async (stages: StageMessage[]): Promise<StageMessage[]> => {
    console.log('Processing stages:', stages)
    const stagesMsg: StageMessage[] = []
    
    for (let i = 0; i < stages.length; i++) {
      if (i < stages.length - 1) {
        const nextStage = stages[i + 1].map
        stagesMsg.push({
          map: stages[i].map,
          msg: `Follow route to stairs and proceed to Map ${nextStage}`
        })
      } else {
        stagesMsg.push({
          map: stages[i].map,
          msg: 'Proceed to your destination'
        })
      }
    }
    
    console.log('Processed stage messages:', stagesMsg)
    return stagesMsg
  }
  
  /**
   * Parse path data from store and generate stages
   */
  const parsePath = async (pathData: any) => {
    if (!pathData || !pathData.asset123) {
      console.warn('PathData is undefined or missing asset123')
      routeMassages.value = []
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const parsedData = pathData.asset123
      
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        console.warn('Invalid or empty pathData')
        routeMassages.value = []
        return
      }
      
      const pathArray = parsedData[0]
      const parsedLines = parseLines(pathArray)
      const mapValues = parsedLines.map(line => line.map)
      
      console.log('Parsed path lines:', parsedLines)
      
      // Generate route steps
      const routeMsg = await getRouteSteps(parsedLines)
      routeMassages.value = routeMsg
      
      // Dispatch to store
      await store.dispatch('set_path_data', { pathDetails: pathData.asset123 })
      
    } catch (err) {
      console.error('Error parsing pathData:', err)
      error.value = err as Error
      routeMassages.value = []
    } finally {
      isLoading.value = false
    }
  }
  
  // Watch pathData from store
  watch(
    () => store.state.pathData,
    parsePath,
    { deep: true }
  )
  
  return {
    routeMassages,
    isLoading,
    error,
    parseLine,
    parseLines,
    filterConnectors,
    getRouteSteps,
    processStages,
    parsePath
  }
}
