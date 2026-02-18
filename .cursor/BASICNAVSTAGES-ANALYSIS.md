# BasicNavStages Component Analysis & Migration Strategy

**Component**: BasicNavStages.vue  
**Size**: 392 lines  
**Complexity**: HIGH  
**Status**: Vue 2 Options API → Vue 3 Composition API  
**Priority**: CRITICAL (de-risking complex components)

---

## Current Structure Analysis

### Template Structure (Lines 1-37)
```
v-expansion-panels (Vuetify 2 syntax)
  └── v-expansion-panel
      ├── Header with icons and title
      └── Content with stage list
          └── div.stage (v-for routeMsg)
              ├── STAGE number
              └── Message text
```

### Script Structure (Lines 39-342)

**Data Properties** (15 properties):
```javascript
stages, showNav, isExpanded, iconSrc, publicPath,
pathData, parsedPathData, pathArray, mapValues,
routeMassages, routeMsg, selectedStage, activeStage,
levelNames
```

**Computed** (2 with mapState):
```javascript
pathData (from Vuex state)
activeStage (from Vuex state)
```

**Watchers** (3 complex watchers):
```javascript
1. $store.state.currentStage - Updates activeStage
2. $store.state.trigger.select.value - Handles selection
3. $store.state.pathData - Parses path data, updates stages
```

**Methods** (9 methods):
```javascript
1. getselectedStage() - Returns selected stage
2. selectStage(index) - Handles stage selection, emits events
3. parseLine(line) - Parses single path line
4. parseLines(data) - Parses multiple lines
5. filterConnectors(steps) - Filters connector nodes
6. getRouteSteps(routeData) - Generates stage messages
7. getMapName(node) - Finds nearest asset name
8. processStages() - Processes stage messages
9. toggleIcon() - Toggles expansion icon
10. clearState() - Resets state
11. toggleshowNav() - Toggles visibility
```

**Lifecycle**:
- mounted() - Sets up event listeners
- beforeDestroy() - Cleans up event listeners

---

## Feature Breakdown

### Core Features

1. **Multi-Stage Navigation**
   - Displays stages when route has multiple levels
   - Expansion panel UI
   - Stage selection with visual feedback

2. **Path Data Processing**
   - Watches Vuex pathData
   - Parses path array into stages
   - Generates human-readable messages

3. **Stage Routing**
   - Handles stage selection
   - Updates Vuex store (setCurrentStage)
   - Emits stageSelected event
   - Triggers map updates

4. **Map Integration**
   - Finds nearest assets by coordinates
   - Determines floor/level names
   - Links stages to map indices

5. **UI State Management**
   - Expansion/collapse
   - Icon toggling (nav_in.svg / nav_out.svg)
   - Active stage highlighting

---

## Complexity Analysis

### High Complexity Areas

**1. Path Data Watching** (Lines 104-150)
- Deep watcher on `$store.state.pathData`
- Complex parsing logic
- Async operation
- Error handling
- Multiple transformations

**2. Route Step Generation** (Lines 217-262)
- Loops through steps
- Handles Connector nodes specially
- Generates contextual messages
- Maps indices

**3. Store Integration** (Multiple locations)
- Reads: pathData, activeStage, currentStage, trigger.select, main_asset
- Writes: setCurrentStage (commit & dispatch), set_path_data
- Multiple watchers

**4. Asset Distance Calculation** (Lines 264-281)
- Finds nearest asset to coordinates
- Math calculations
- Array filtering

---

## Splitting Strategy

### Proposed Structure

```
BasicNavStages.vue (Main orchestrator)
├── NavStagePanel.vue (Expansion panel UI)
├── NavStageItem.vue (Individual stage item)
└── composables/
    ├── useNavStages.ts (Stage state & selection)
    ├── usePathParser.ts (Path data parsing logic)
    └── useMapAssets.ts (Asset/map integration)
```

### Sub-component Breakdown

#### 1. NavStagePanel.vue
**Purpose**: Expansion panel wrapper  
**Size**: ~50 lines  
**Responsibilities**:
- Expansion panel UI
- Header with icons and title
- Expansion state management
- Icon toggling

**Props**:
```typescript
interface NavStagePanelProps {
  isExpanded: boolean
  iconSrc: string
  publicPath: string
}
```

#### 2. NavStageItem.vue
**Purpose**: Individual stage display  
**Size**: ~30 lines  
**Responsibilities**:
- Display stage number and message
- Handle click events
- Active state styling

**Props**:
```typescript
interface NavStageItemProps {
  stage: {
    map: number
    msg: string
  }
  index: number
  isActive: boolean
}
```

#### 3. useNavStages composable
**Purpose**: Stage state management  
**Responsibilities**:
- Stage selection logic
- Active stage tracking
- Vuex integration (currentStage)
- Event emission coordination

**Returns**:
```typescript
{
  activeStage: Ref<number>
  routeMsg: Ref<StageMessage[]>
  selectStage: (index: number) => void
  getCurrentStage: () => number
}
```

#### 4. usePathParser composable
**Purpose**: Path data processing  
**Responsibilities**:
- Parse path data from store
- Generate route steps
- Filter connectors
- Create stage messages

**Returns**:
```typescript
{
  parsedStages: ComputedRef<StageMessage[]>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
}
```

#### 5. useMapAssets composable
**Purpose**: Map and asset integration  
**Responsibilities**:
- Find nearest assets
- Get map names
- Distance calculations

**Returns**:
```typescript
{
  getMapName: (node: PathNode) => string
  getNearestAsset: (node: PathNode) => Asset | undefined
}
```

---

## Migration Plan

### Phase 1: Create Composables (Day 1)

**Step 1: useNavStages.ts**
```typescript
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export function useNavStages() {
  const store = useStore()
  
  const activeStage = ref(0)
  const selectedStage = ref(0)
  const routeMsg = ref<StageMessage[]>([])
  
  // Watch store for current stage changes
  watch(
    () => store.state.currentStage,
    (newVal) => {
      activeStage.value = newVal - 1
      store.dispatch('setCurrentStage', newVal)
    }
  )
  
  const selectStage = (index: number) => {
    selectedStage.value = index
    activeStage.value = index
    store.commit('setCurrentStage', index + 1)
    store.dispatch('setCurrentStage', index)
  }
  
  return {
    activeStage,
    selectedStage,
    routeMsg,
    selectStage
  }
}
```

**Step 2: usePathParser.ts**
```typescript
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

export function usePathParser() {
  const store = useStore()
  const routeMassages = ref<StageMessage[]>([])
  const isLoading = ref(false)
  
  // Parse single line
  const parseLine = (line: string) => {
    const lineData = line.split(',')
    return {
      id: lineData[0],
      type: lineData[1]
    }
  }
  
  // Parse multiple lines
  const parseLines = (data: any[]) => {
    if (!data) return []
    return data.map(lineData => {
      const data = lineData.detail.split(',')
      return {
        id: data[0],
        type: data[1],
        map: lineData.index,
        x: parseFloat(data[3]),
        y: parseFloat(data[4])
      }
    })
  }
  
  // Filter connectors
  const filterConnectors = (steps: PathStep[]) => {
    return steps.filter((step, i, arr) => {
      if (step.type !== 'Connector') return true
      const prev = arr[i - 1]
      const next = arr[i + 1]
      if ((prev?.type === 'Connector') || (next?.type === 'Connector')) {
        return true
      }
      return false
    })
  }
  
  // Generate route steps with messages
  const getRouteSteps = async (routeData: PathStep[], getMapName: (node: PathNode) => string) => {
    let steps = routeData
    let messages: StageMessage[] = []
    let offset = 0
    
    for (let i = 0; i < steps.length - offset; i++) {
      if (steps[i].type === 'Connector') {
        let msg = `Follow route to stairs and proceed to `
        let j = i
        while (j < steps.length - 1 && steps[j + 1].type === 'Connector') {
          j++
        }
        if (j < steps.length - offset) {
          msg += getMapName(steps[j])
          messages.push({ msg, map: steps[i].map - 1 })
        }
        i = j
      }
    }
    
    if (messages.length > 0) {
      messages.push({
        msg: 'Proceed to your destination.',
        map: steps[steps.length - 1].map - 1
      })
    }
    
    return messages
  }
  
  // Watch pathData from store
  watch(
    () => store.state.pathData,
    async (data) => {
      if (!data?.asset123) {
        routeMassages.value = []
        return
      }
      
      isLoading.value = true
      try {
        const pathData = data.asset123
        const pathArray = pathData[0]
        const parsedLines = parseLines(pathArray)
        const mapValues = parsedLines.map(line => line.map)
        
        // Get route steps (needs getMapName from useMapAssets)
        // routeMassages.value = await getRouteSteps(parsedLines, getMapName)
        
        await store.dispatch('set_path_data', { pathDetails: data.asset123 })
      } catch (error) {
        console.error('Error parsing pathData:', error)
        routeMassages.value = []
      } finally {
        isLoading.value = false
      }
    },
    { deep: true }
  )
  
  return {
    routeMassages,
    isLoading,
    parseLine,
    parseLines,
    filterConnectors,
    getRouteSteps
  }
}
```

**Step 3: useMapAssets.ts**
```typescript
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useMapAssets() {
  const store = useStore()
  
  const mainAssets = computed(() => store.state.main_asset || [])
  
  const getMapName = (node: PathNode): string => {
    const assets = mainAssets.value.filter((asset: any) => 
      !isNaN(parseInt(asset.map)) && parseInt(asset.map) === node.map - 1
    )
    
    if (assets.length === 0) return '@'
    
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
  
  const getNearestAsset = (node: PathNode) => {
    const assets = mainAssets.value.filter((asset: any) => 
      !isNaN(parseInt(asset.map)) && parseInt(asset.map) === node.map - 1
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
  
  return {
    mainAssets,
    getMapName,
    getNearestAsset
  }
}
```

### Phase 2: Create Sub-components (Day 1 continued)

#### NavStagePanel.vue
```vue
<template>
  <v-expansion-panel 
    :model-value="modelValue"
    style="background-color:#DCEEEF"
  >
    <v-expansion-panel-title 
      style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"
    >
      <template #actions>
        <img 
          :src="`${publicPath}${iconSrc}`" 
          :alt="modelValue ? 'Collapse Icon' : 'Expand Icon'"
          style="margin-left: 45px;" 
        />
      </template>
      <img 
        :src="`${publicPath}Layers.svg`" 
        alt="Layers" 
        class="Layers" 
        style="margin-left: -16px; width: 30px;" 
      />
      <h4 style="width: 300px;font-size: 14px;padding-left: 2px;">
        THIS ROUTE CONTAINS MULTIPLE LEVELS
      </h4>
    </v-expansion-panel-title>
    
    <v-expansion-panel-text style="padding-bottom: 10px;">
      <slot></slot>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  publicPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  publicPath: '/'
})

const iconSrc = computed(() => 
  props.modelValue ? 'nav_in.svg' : 'nav_out.svg'
)
</script>
```

#### NavStageItem.vue
```vue
<template>
  <div 
    class="stage" 
    :class="{ 'activated': isActive }"
    style="background-color:white;"
    @click="handleClick"
  >
    <h3 style="font-size: 13px;">STAGE {{ index + 1 }}</h3>
    <p>{{ stage.msg }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  stage: {
    map: number
    msg: string
  }
  index: number
  isActive: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  select: [map: number, index: number]
}>()

const handleClick = () => {
  emit('select', props.stage.map, props.index)
}
</script>

<style lang="scss" scoped>
.stage {
  width: 95%;
  height: 85px;
  margin: 0px 4px 0px 7px;
  cursor: pointer;
  
  h3 {
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    top: 4px;
    left: 13px;
    font-size: 13px;
  }
  
  p {
    position: relative;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
    font-size: 15px;
    width: 94%;
    top: 3px;
    left: 13px;
  }
  
  &.activated {
    background-color: #C0E28B !important;
  }
}
</style>
```

### Phase 3: Main Component (Day 2)

#### BasicNavStages.vue (Refactored)
```vue
<template>
  <div 
    v-if="routeMsg.length > 1" 
    class="basic-nav-stages"
    style="position: absolute;z-index:99; height:300px;left:7px;top: 250px;max-width: calc(100% - 11px);"
  >
    <v-expansion-panels v-model="isExpanded" class="mb-12">
      <NavStagePanel 
        :model-value="isExpanded === 0"
        :public-path="publicPath"
      >
        <NavStageItem
          v-for="(stage, index) in routeMsg"
          :key="index"
          :stage="stage"
          :index="index"
          :is-active="activeStage === index"
          @select="handleStageSelect"
        />
      </NavStagePanel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useNavStages } from '@/composables/useNavStages'
import { usePathParser } from '@/composables/usePathParser'
import { useMapAssets } from '@/composables/useMapAssets'
import NavStagePanel from './NavStagePanel.vue'
import NavStageItem from './NavStageItem.vue'

const store = useStore()
const isExpanded = ref(0)
const showNav = ref(true)
const publicPath = ref(process.env.BASE_URL || '/')

// Use composables
const { activeStage, selectStage } = useNavStages()
const { routeMassages, isLoading } = usePathParser()
const { getMapName } = useMapAssets()

// Alias for template
const routeMsg = routeMassages

// Handle stage selection
const handleStageSelect = (map: number, index: number) => {
  selectStage(index)
  emit('stageSelected', map)
}

// Event emission
const emit = defineEmits<{
  stageSelected: [map: number]
}>()

// Toggle navigation visibility
const toggleshowNav = () => {
  showNav.value = !showNav.value
}

// Lifecycle
onMounted(() => {
  // Vue 3: Use global event bus or provide/inject
  // For now, we'll skip $root.$on pattern
  console.log('BasicNavStages mounted')
})

onBeforeUnmount(() => {
  // Cleanup if needed
})
</script>

<style lang="scss">
.basic-nav-stages {
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
```

---

## Migration Checklist

### Day 1: Analysis & Composables
- [x] Analyze existing component structure
- [x] Identify features and dependencies
- [ ] Create useNavStages composable
- [ ] Create usePathParser composable
- [ ] Create useMapAssets composable
- [ ] Write composable tests

### Day 2: Sub-components
- [ ] Create NavStagePanel.vue
- [ ] Create NavStageItem.vue
- [ ] Write sub-component tests
- [ ] Refactor main BasicNavStages.vue
- [ ] Integration test

### Day 3: Testing & Polish
- [ ] Comprehensive test suite
- [ ] >80% coverage verification
- [ ] Visual regression tests
- [ ] Documentation
- [ ] Export from index.js

---

## Challenges & Solutions

### Challenge 1: $root.$on event bus (Vue 2 pattern)
**Current**:
```javascript
this.$root.$on('clear-nav-stages', this.toggleshowNav)
```

**Solution**: Use provide/inject or props
```typescript
// In parent:
provide('clearNavStages', clearNavStagesHandler)

// In BasicNavStages:
const clearNavStages = inject('clearNavStages')
```

### Challenge 2: Deep watchers with async
**Current**: Deep watcher on $store.state.pathData with async handler

**Solution**: Use watch with deep: true
```typescript
watch(
  () => store.state.pathData,
  async (data) => {
    // async logic
  },
  { deep: true }
)
```

### Challenge 3: mapState
**Current**: `...mapState({ pathData: state => state.pathData })`

**Solution**: Use computed with store
```typescript
const pathData = computed(() => store.state.pathData)
```

---

## Testing Strategy

### Unit Tests

**Composables**:
- useNavStages: Stage selection, active tracking
- usePathParser: Line parsing, route generation
- useMapAssets: Distance calculations, asset finding

**Sub-components**:
- NavStagePanel: Expansion UI, icon toggling
- NavStageItem: Rendering, click handling, active state

**Main Component**:
- Integration of all parts
- Store integration
- Event emission

### Integration Tests

- Full stage navigation flow
- Path data processing
- Map updates
- Stage selection persistence

---

## Acceptance Criteria

- [ ] Component split into 2 sub-components + 3 composables
- [ ] All logic converted to Composition API
- [ ] TypeScript throughout
- [ ] >80% test coverage
- [ ] No functionality regressions
- [ ] Visual appearance maintained
- [ ] Store integration working
- [ ] Event emissions working

---

## Next Steps

**Ready to proceed with**:
1. Create the 3 composables
2. Create the 2 sub-components
3. Refactor main component
4. Write comprehensive tests

**Estimated Time**: 1-2 days

---

**Status**: Analysis complete, ready for implementation  
**Complexity**: HIGH (but manageable with splitting)  
**Risk**: MEDIUM (well-planned splitting strategy)  
**Next**: Begin composable creation
