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
            <v-alert type="success" class="mb-4">
              <strong>✅ BasicSide is Active!</strong> The component is rendered on the LEFT side of your screen.
              It replaces the standard navigation drawer when you're on this page.
            </v-alert>
            
            <v-alert type="info" class="mb-4">
              <strong>How to Test:</strong>
              <ol class="mt-2">
                <li><strong>Search Mode</strong> (default):
                  <ul>
                    <li>Look at the LEFT side drawer (dark blue/black)</li>
                    <li>You'll see a search box at the top</li>
                    <li>Click "Load Sample Assets" below to populate search</li>
                    <li>Type in the search box (e.g., "ERT ROOM")</li>
                  </ul>
                </li>
                <li class="mt-2"><strong>Navigation Mode</strong> (start → destination):
                  <ul>
                    <li>Click the Layer 5 icon (📍) in the drawer</li>
                    <li>OR click "Switch to Navigation Mode" button below</li>
                    <li>Two search boxes will appear (Start and Destination)</li>
                    <li>Type locations like "ERT ROOM U01.22" and "P1L5M02"</li>
                  </ul>
                </li>
              </ol>
            </v-alert>
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
const isNavigationMode = computed(() => store.state.showSearch2 || false)

// Helper function to format asset tags (matching old component behavior)
const tagAlias = (asset) => {
  if (!asset || !asset.tag) {
    return null
  }
  if (asset.custom12 != null) {
    return `${asset.tag}(${asset.custom12})`
  }
  return asset.tag
}

// Sample assets for search
const sampleAssets = ref([
  { tag: 'FR833 W01.124', id: 1, custom12: '', level: 1 },
  { tag: '28C COLD STORAGE W01.42', id: 2, level: 1 },
  { tag: 'PQ-TEST-CH', id: 3, level: 1 },
  { tag: 'P2L7M01', id: 4, level: 7 },
  { tag: 'C001-26003-P026004-V-076', id: 5, custom12: 'SE020PJ0303ADEEH59', level: 2 },
  { tag: 'P02GDP01/P1A9GD8', id: 6, level: 2 },
  { tag: 'P1L5M02', id: 7, level: 5 },
  { tag: 'P1L7W11.P02-01E01-S-007', id: 8, custom12: 'SE020PK3007AHBDL1A', level: 7 },
  { tag: 'F115 A1', id: 9, level: 1 },
  { tag: 'ERT ROOM U01.22', id: 10, level: 1 },
  { tag: 'CONFERENCE ROOM A', id: 11, level: 2 },
  { tag: 'BREAKROOM 3A', id: 12, custom12: 'Employee Break Room', level: 3 },
  { tag: 'BOARDROOM', id: 13, custom12: 'Executive Boardroom Level 4', level: 4 },
  { tag: 'PRINTER ROOM 2B', id: 14, custom12: 'Copy Room Level 2', level: 2 },
  { tag: 'SERVER ROOM', id: 15, custom12: 'Data Center Level B1', level: -1 },
])

// Toggle navigation mode
const toggleNavigationMode = () => {
  store.state.showSearch2 = !store.state.showSearch2
  store.state.vxg.cmp.BasicSide.showSearch2 = store.state.showSearch2
  console.log('🗺️ Navigation mode:', store.state.showSearch2 ? 'ON' : 'OFF')
}

// Populate assets
const populateSampleAssets = () => {
  // Format assets with tag_alias before storing
  const formattedAssets = sampleAssets.value.map(asset => ({
    ...asset,
    displayTag: tagAlias(asset)  // Add formatted display tag
  }))
  store.state.vxg.ent.asset.list = formattedAssets
  console.log('📦 Loaded', sampleAssets.value.length, 'sample assets')
  console.log('Sample formatted tags:', formattedAssets.slice(0, 3).map(a => a.displayTag))
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
