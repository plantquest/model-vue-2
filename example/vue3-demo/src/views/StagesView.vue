<template>
  <div class="stages-demo">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>🗺️ BasicNavStages - Building Navigation Component</h2>
          </v-card-title>
          <v-card-text>
            <v-alert type="info" class="mb-4">
              <strong>BasicNavStages</strong> is for multi-level building navigation in PlantQuest.
              It parses route data and displays step-by-step navigation through floors (e.g., "Take stairs to Level 2").
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Test Navigation Routes</v-card-title>
          <v-card-text>
            <p class="mb-3">Select a mock building navigation scenario:</p>
            
            <v-btn
              color="primary"
              block
              class="mb-2"
              @click="loadSimpleRoute"
            >
              🏢 Simple: Level 1 → Level 2
            </v-btn>

            <v-btn
              color="primary"
              block
              class="mb-2"
              @click="loadComplexRoute"
            >
              🏢🏢🏢 Complex: Level 1 → Level 2 → Level 3
            </v-btn>

            <v-btn
              color="secondary"
              block
              class="mb-2"
              @click="loadMultiStairRoute"
            >
              🪜🪜 Multi-Stair: Multiple Connectors
            </v-btn>

            <v-btn
              color="warning"
              block
              @click="clearRoute"
            >
              ❌ Clear Route
            </v-btn>

            <v-divider class="my-4"></v-divider>

            <div>
              <strong>Current Route:</strong><br>
              <span class="text-subtitle-2">{{ currentRouteDescription }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card min-height="300">
          <v-card-title>Navigation Display</v-card-title>
          <v-card-text>
            <div v-if="hasRoute">
              <p class="mb-3"><strong>BasicNavStages Component Output:</strong></p>
              
              <!-- Mock map container showing where component overlays -->
              <div class="mock-map-container" style="position: relative; height: 400px; background: #f5f5f5; border: 2px dashed #ccc; border-radius: 4px;">
                <div style="padding: 20px; text-align: center;">
                  <v-icon size="40" color="grey">mdi-map</v-icon>
                  <p class="text-caption mt-2">Mock Map View</p>
                  <p class="text-caption">(BasicNavStages overlays here)</p>
                </div>
                
                <!-- The actual BasicNavStages component -->
                <div style="position: relative; margin-top: 20px;">
                  <BasicNavStages @stage-selected="handleStageSelected" />
                </div>
              </div>

              <v-divider class="my-4"></v-divider>

              <div>
                <strong>Last Stage Selected:</strong> {{ lastSelectedStage || 'None' }}
              </div>
            </div>
            <div v-else>
              <v-alert type="info" icon="mdi-information">
                Select a route above to see BasicNavStages component in action
              </v-alert>
              <p class="mt-3 text-caption">
                The component will parse the route data and display navigation stages like:
                <br>• "Follow route to stairs and proceed to Level 2"
                <br>• "Proceed to your destination"
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Technical Details -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card color="info" variant="tonal">
          <v-card-title>How BasicNavStages Works</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h4>Data Structure (pathData):</h4>
                <pre class="text-caption bg-grey-lighten-4 pa-2 rounded mt-2" style="overflow-x: auto;">{{pathDataExample}}</pre>
                
                <ul class="mt-3">
                  <li><code>index</code> - Map/floor level number</li>
                  <li><code>detail</code> - Format: <code>id,type,,x,y</code></li>
                  <li><code>type</code> - "Standard" (node) or "Connector" (stairs/elevator)</li>
                </ul>
              </v-col>

              <v-col cols="12" md="6">
                <h4>Component Features:</h4>
                <ul>
                  <li>✅ Parses complex route data</li>
                  <li>✅ Detects floor changes (Connectors)</li>
                  <li>✅ Generates navigation messages</li>
                  <li>✅ Expandable stage panels</li>
                  <li>✅ Stage selection with map sync</li>
                  <li>✅ Integrates with Vuex store</li>
                  <li>✅ Route synchronization</li>
                </ul>

                <h4 class="mt-4">Files:</h4>
                <v-chip class="ma-1" size="small">BasicNavStages.vue (6.7KB)</v-chip>
                <v-chip class="ma-1" size="small">NavStagesExpansion.vue</v-chip>
                <v-chip class="ma-1" size="small">NavStageItem.vue</v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { BasicNavStages } from '@plantquest/model-vue'

const store = useStore()

// State
const currentRouteDescription = ref('No route loaded')
const lastSelectedStage = ref(null)

const hasRoute = computed(() => store.state.pathData !== null)

// Mock pathData examples for demo
const pathDataExample = `{
  asset123: [[
    { index: 1, detail: "node1,Standard,1,100,200" },
    { index: 1, detail: "stairs1,Connector,1,150,250" },
    { index: 2, detail: "stairs2,Connector,2,150,250" },
    { index: 2, detail: "dest,Standard,2,200,300" }
  ]]
}`

// Load simple route: Level 1 to Level 2
const loadSimpleRoute = () => {
  const simpleRoute = {
    asset123: [[
      { index: 1, detail: "room_101,Standard,1,50,100" },
      { index: 1, detail: "corridor,Standard,1,100,100" },
      { index: 1, detail: "stair_bottom,Connector,1,150,100" },
      { index: 2, detail: "stair_top,Connector,2,150,150" },
      { index: 2, detail: "room_201,Standard,2,200,150" }
    ]]
  }
  
  store.state.pathData = simpleRoute
  currentRouteDescription.value = 'Room 101 (L1) → Stairs → Room 201 (L2)'
  console.log('✅ Loaded simple route')
}

// Load complex route: Level 1 to Level 3
const loadComplexRoute = () => {
  const complexRoute = {
    asset123: [[
      { index: 1, detail: "entrance,Standard,1,50,100" },
      { index: 1, detail: "lobby,Standard,1,100,100" },
      { index: 1, detail: "stair_l1,Connector,1,150,100" },
      { index: 2, detail: "stair_l2a,Connector,2,150,150" },
      { index: 2, detail: "hallway,Standard,2,175,150" },
      { index: 2, detail: "stair_l2b,Connector,2,200,150" },
      { index: 3, detail: "stair_l3,Connector,3,200,200" },
      { index: 3, detail: "office_301,Standard,3,250,200" }
    ]]
  }
  
  store.state.pathData = complexRoute
  currentRouteDescription.value = 'Entrance (L1) → Lobby → Stairs to L2 → Hallway → Stairs to L3 → Office 301'
  console.log('✅ Loaded complex route')
}

// Load route with multiple consecutive connectors
const loadMultiStairRoute = () => {
  const multiStairRoute = {
    asset123: [[
      { index: 1, detail: "room_a,Standard,1,50,100" },
      { index: 1, detail: "connector_1,Connector,1,100,100" },
      { index: 1, detail: "connector_2,Connector,1,120,100" },
      { index: 2, detail: "connector_3,Connector,2,120,150" },
      { index: 2, detail: "connector_4,Connector,2,140,150" },
      { index: 2, detail: "room_b,Standard,2,200,150" }
    ]]
  }
  
  store.state.pathData = multiStairRoute
  currentRouteDescription.value = 'Room A (L1) → Multiple Connectors → Room B (L2)'
  console.log('✅ Loaded multi-stair route')
}

// Clear current route
const clearRoute = () => {
  store.state.pathData = null
  currentRouteDescription.value = 'No route loaded'
  lastSelectedStage.value = null
  console.log('❌ Route cleared')
}

// Handle stage selection from BasicNavStages
const handleStageSelected = (mapValue) => {
  lastSelectedStage.value = `Map/Level ${mapValue}`
  console.log('📍 Stage selected:', mapValue)
}
</script>

<style scoped>
.mock-map-container {
  overflow: visible;
}

pre {
  font-size: 11px;
  line-height: 1.4;
}
</style>
