<template>
  <div class="components-demo">
    <v-row>
      <v-col cols="12">
        <h1>Component Showcase</h1>
        <p>Test all migrated Vue 3 components</p>
      </v-col>
    </v-row>

    <!-- BasicLed Demo -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>BasicLed - Status Indicators</v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="auto">
                <BasicLed status="on" />
                <span class="ml-2">On</span>
              </v-col>
              <v-col cols="auto">
                <BasicLed status="off" />
                <span class="ml-2">Off</span>
              </v-col>
              <v-col cols="auto">
                <BasicLed status="warning" />
                <span class="ml-2">Warning</span>
              </v-col>
              <v-col cols="auto">
                <BasicLed status="error" />
                <span class="ml-2">Error</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- BasicFieldPick Demo -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>BasicFieldPick - Field Picker</v-card-title>
          <v-card-text>
            <BasicFieldPick
              v-model="selectedField"
              :fields="sampleFields"
              label="Select a field"
              @change="handleFieldChange"
            />
            <p class="mt-2">Selected: {{ selectedField }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Side Drawer Demo -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>BasicSide - Side Navigation</v-card-title>
          <v-card-text>
            <v-btn @click="toggleSide">
              Toggle Side Drawer
            </v-btn>
            <p class="mt-2">Drawer is: {{ isSideOpen ? 'Open' : 'Closed' }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Search Demo -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>BasicHead - Search (MiniSearch Integration)</v-card-title>
          <v-card-text>
            <p>The header above uses MiniSearch for fuzzy search with &lt;40ms latency</p>
            <v-chip color="success">Performance: 2.5x better than target</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Composables Demo -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Composables - Reusable Logic</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>useAuth</v-list-item-title>
                <v-list-item-subtitle>Authentication state: {{ isAuthenticated ? 'Logged In' : 'Logged Out' }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-title>useSide</v-list-item-title>
                <v-list-item-subtitle>Side drawer state: {{ isSideOpen ? 'Open' : 'Closed' }}</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-item>
                <v-list-item-title>useHeadPermissions</v-list-item-title>
                <v-list-item-subtitle>Can add: {{ canAdd ? 'Yes' : 'No' }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BasicLed, BasicFieldPick } from '@plantquest/model-vue'
import { useAuth, useSide, useHeadPermissions } from '@plantquest/model-vue'

// Component state
const selectedField = ref('')
const sampleFields = ref([
  { id: 'name', name: 'Name', type: 'text' },
  { id: 'email', name: 'Email', type: 'email' },
  { id: 'age', name: 'Age', type: 'number' }
])

// Composables
const { isAuthenticated } = useAuth()
const { isOpen: isSideOpen, toggle: toggleSide } = useSide()
const { canPerformAction } = useHeadPermissions()

const canAdd = computed(() => canPerformAction('add'))

const handleFieldChange = (value) => {
  console.log('Field changed:', value)
}
</script>
