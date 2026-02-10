<template>
  <div class="side-demo">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">
            🔍 BasicSide - Navigation & Search Component
          </v-card-title>
          <v-card-text>
            <v-alert type="info" class="mb-4">
              <strong>BasicSide</strong> is the side navigation drawer in PlantQuest with search and filtering.
              It has two modes: <strong>Search Mode</strong> and <strong>Navigation Mode</strong> (start → destination).
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Controls</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              block
              class="mb-2"
              @click="toggleNavigationMode"
            >
              {{ isNavigationMode ? '🔍 Switch to Search Mode' : '🗺️ Switch to Navigation Mode' }}
            </v-btn>

            <v-btn
              color="secondary"
              block
              class="mb-2"
              @click="populateSampleAssets"
            >
              📦 Load Sample Assets ({{ sampleAssets.length }} items)
            </v-btn>

            <v-btn
              color="warning"
              block
              @click="clearAll"
            >
              ❌ Clear All
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Component State</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>
                  <strong>Mode:</strong> {{ isNavigationMode ? 'Navigation (Start → Destination)' : 'Search' }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <strong>Search Value:</strong> {{ store.state.vxg.cmp.BasicSide.search || 'None' }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="isNavigationMode">
                <v-list-item-title>
                  <strong>Start Location:</strong> {{ store.state.vxg.cmp.BasicSide.search || 'Not selected' }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-if="isNavigationMode">
                <v-list-item-title>
                  <strong>Destination:</strong> {{ store.state.vxg.cmp.BasicSide.search2 || 'Not selected' }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <strong>Available Assets:</strong> {{ store.state.vxg.ent.asset.list.length }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card min-height="600">
          <v-card-title>BasicSide Component Preview</v-card-title>
          <v-card-text>
            <div class="side-preview-container">
              <p class="text-caption mb-2">
                <strong>Note:</strong> The component will appear here. Use the Layer 5 icon to toggle between modes.
              </p>
              
              <!-- BasicSide Component -->
              <BasicSide />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Features & Usage</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h4>🔍 Search Mode Features:</h4>
                <ul>
                  <li>Type to search for assets (rooms, equipment, etc.)</li>
                  <li>Autocomplete suggestions as you type</li>
                  <li>Filter button for advanced filtering</li>
                  <li>Select an asset to view on map</li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <h4>🗺️ Navigation Mode Features:</h4>
                <ul>
                  <li>Click the navigation icon to enter mode</li>
                  <li>Search for start location (top box)</li>
                  <li>Search for destination (bottom box)</li>
                  <li>Shows route with BasicNavStages</li>
                  <li>Click "Close Navigation Mode" to exit</li>
                </ul>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h4>Sample Assets:</h4>
            <p class="text-caption">Click "Load Sample Assets" to populate the search with rooms and equipment:</p>
            <v-chip-group column>
              <v-chip v-for="asset in sampleAssets.slice(0, 10)" :key="asset.id" size="small">
                {{ asset.tag }}
              </v-chip>
              <v-chip v-if="sampleAssets.length > 10" size="small">
                + {{ sampleAssets.length - 10 }} more...
              </v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { BasicSide } from '@plantquest/model-vue'

const store = useStore()

// State
const isNavigationMode = computed(() => store.state.vxg.cmp.BasicSide.showSearch2)

// Sample assets for search
const sampleAssets = ref([
  { tag: 'ERT ROOM U01.22', id: 1, custom12: 'Emergency Room Level 1', level: 1 },
  { tag: 'P1L5M02', id: 2, custom12: 'Office Level 5', level: 5 },
  { tag: 'CONFERENCE ROOM A', id: 3, custom12: 'Meeting Room Level 2', level: 2 },
  { tag: 'LAB 101', id: 4, custom12: 'Research Lab Level 1', level: 1 },
  { tag: 'STORAGE B3', id: 5, custom12: 'Storage Room Level 3', level: 3 },
  { tag: 'CAFETERIA', id: 6, custom12: 'Dining Area Level 1', level: 1 },
  { tag: 'IT ROOM 205', id: 7, custom12: 'IT Equipment Room', level: 2 },
  { tag: 'STAIR A', id: 8, custom12: 'Stairwell A', level: 1, type: 'Connector' },
  { tag: 'STAIR B', id: 9, custom12: 'Stairwell B', level: 2, type: 'Connector' },
  { tag: 'ELEVATOR 1', id: 10, custom12: 'Main Elevator', level: 1, type: 'Connector' },
  { tag: 'RECEPTION', id: 11, custom12: 'Main Reception Desk', level: 1 },
  { tag: 'BREAKROOM 3A', id: 12, custom12: 'Employee Break Room', level: 3 },
  { tag: 'BOARDROOM', id: 13, custom12: 'Executive Boardroom Level 4', level: 4 },
  { tag: 'PRINTER ROOM 2B', id: 14, custom12: 'Copy Room Level 2', level: 2 },
  { tag: 'SERVER ROOM', id: 15, custom12: 'Data Center Level B1', level: -1 },
])

// Toggle navigation mode
const toggleNavigationMode = () => {
  store.state.vxg.cmp.BasicSide.showSearch2 = !store.state.vxg.cmp.BasicSide.showSearch2
  console.log('🗺️ Navigation mode:', store.state.vxg.cmp.BasicSide.showSearch2 ? 'ON' : 'OFF')
}

// Populate assets
const populateSampleAssets = () => {
  store.state.vxg.ent.asset.list = [...sampleAssets.value]
  console.log('📦 Loaded', sampleAssets.value.length, 'sample assets')
}

// Clear all
const clearAll = () => {
  store.state.vxg.cmp.BasicSide.search = ''
  store.state.vxg.cmp.BasicSide.search2 = ''
  store.state.vxg.cmp.BasicSide.showSearch2 = false
  store.state.vxg.ent.asset.list = []
  console.log('❌ Cleared all')
}
</script>

<style scoped>
.side-demo {
  padding: 20px;
}

.side-preview-container {
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 10px;
  min-height: 500px;
  background-color: #f5f5f5;
}
</style>
