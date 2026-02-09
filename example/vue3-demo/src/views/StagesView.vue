<template>
  <div class="stages-demo">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>🚀 Composables Testing - useNavStages</h2>
          </v-card-title>
          <v-card-text>
            <v-alert type="info" class="mb-4">
              Testing the <strong>useNavStages</strong> composable for stage navigation management
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Current Stage State</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title>Current Stage</v-list-item-title>
                <v-list-item-subtitle>
                  Stage {{ currentStage + 1 }} of {{ totalStages }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="success">mdi-check-all</v-icon>
                </template>
                <v-list-item-title>Completed Stages</v-list-item-title>
                <v-list-item-subtitle>
                  {{ completedStages.length }} stages completed
                  {{ completedStages.length > 0 ? `(${completedStages.join(', ')})` : '' }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="info">mdi-chart-line</v-icon>
                </template>
                <v-list-item-title>Progress</v-list-item-title>
                <v-list-item-subtitle>
                  {{ progress }}% complete
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon :color="canProgress ? 'success' : 'error'">
                    {{ canProgress ? 'mdi-check-circle' : 'mdi-close-circle' }}
                  </v-icon>
                </template>
                <v-list-item-title>Can Progress</v-list-item-title>
                <v-list-item-subtitle>{{ canProgress ? 'Yes ✅' : 'No ❌' }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon :color="isComplete ? 'success' : 'warning'">
                    {{ isComplete ? 'mdi-trophy' : 'mdi-progress-clock' }}
                  </v-icon>
                </template>
                <v-list-item-title>Workflow Complete</v-list-item-title>
                <v-list-item-subtitle>{{ isComplete ? 'Yes 🎉' : 'In Progress ⏳' }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-progress-linear
              :model-value="progress"
              color="primary"
              height="10"
              class="mt-3"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Stage Controls</v-card-title>
          <v-card-text>
            <p class="mb-3">Test stage navigation:</p>
            
            <v-btn
              color="primary"
              block
              class="mb-2"
              :disabled="!canProgress"
              @click="handleNextStage"
            >
              <v-icon left>mdi-arrow-right</v-icon>
              Next Stage
            </v-btn>

            <v-btn
              color="secondary"
              block
              class="mb-2"
              :disabled="currentStage === 0"
              @click="handlePreviousStage"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Previous Stage
            </v-btn>

            <v-btn
              color="success"
              block
              class="mb-2"
              :disabled="isStageCompleted(currentStage)"
              @click="handleCompleteStage"
            >
              <v-icon left>mdi-check</v-icon>
              Complete Current Stage
            </v-btn>

            <v-btn
              color="warning"
              block
              class="mb-2"
              @click="handleResetStages"
            >
              <v-icon left>mdi-refresh</v-icon>
              Reset All Stages
            </v-btn>

            <v-divider class="my-4"></v-divider>

            <h4 class="mb-2">Direct Navigation:</h4>
            <v-btn-toggle v-model="currentStage" mandatory color="primary" class="d-flex flex-column">
              <v-btn value="0" size="small" :disabled="!canGoToStage(0)">
                Stage 1
              </v-btn>
              <v-btn value="1" size="small" :disabled="!canGoToStage(1)">
                Stage 2
              </v-btn>
              <v-btn value="2" size="small" :disabled="!canGoToStage(2)">
                Stage 3
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>useNavStages Composable Details</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <h4>Exported State:</h4>
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-variable">
                    <v-list-item-title><code>currentStage</code></v-list-item-title>
                    <v-list-item-subtitle>Current stage index (ref)</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-variable">
                    <v-list-item-title><code>completedStages</code></v-list-item-title>
                    <v-list-item-subtitle>Array of completed stage IDs</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-variable">
                    <v-list-item-title><code>progress</code></v-list-item-title>
                    <v-list-item-subtitle>Percentage complete (computed)</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="4">
                <h4>Exported Functions:</h4>
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-function">
                    <v-list-item-title><code>goToStage()</code></v-list-item-title>
                    <v-list-item-subtitle>Navigate to specific stage</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-function">
                    <v-list-item-title><code>nextStage()</code></v-list-item-title>
                    <v-list-item-subtitle>Move to next stage</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-function">
                    <v-list-item-title><code>previousStage()</code></v-list-item-title>
                    <v-list-item-subtitle>Move to previous stage</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-function">
                    <v-list-item-title><code>completeStage()</code></v-list-item-title>
                    <v-list-item-subtitle>Mark stage as complete</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="4">
                <h4>Computed Props:</h4>
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-calculator">
                    <v-list-item-title><code>canProgress</code></v-list-item-title>
                    <v-list-item-subtitle>Can move to next stage</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-calculator">
                    <v-list-item-title><code>isComplete</code></v-list-item-title>
                    <v-list-item-subtitle>All stages completed</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-calculator">
                    <v-list-item-title><code>canGoToStage()</code></v-list-item-title>
                    <v-list-item-subtitle>Check if stage is accessible</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h4>Integration:</h4>
            <ul>
              <li>✅ Vuex 4 store integration</li>
              <li>✅ Vue Router 4 synchronization</li>
              <li>✅ TypeScript typed interfaces</li>
              <li>✅ Reactive state management</li>
              <li>✅ Stage completion tracking</li>
              <li>✅ Progress calculation</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNavStages } from '@plantquest/model-vue'

// Composable
const {
  currentStage,
  completedStages,
  stages,
  progress,
  canProgress,
  isComplete,
  goToStage,
  nextStage,
  previousStage,
  completeStage,
  isStageCompleted,
  canGoToStage,
  resetStages
} = useNavStages()

const totalStages = computed(() => stages.value.length)

const handleNextStage = () => {
  nextStage()
  console.log('✅ Moved to next stage:', currentStage.value)
}

const handlePreviousStage = () => {
  previousStage()
  console.log('⬅️ Moved to previous stage:', currentStage.value)
}

const handleCompleteStage = () => {
  completeStage(currentStage.value)
  console.log('✅ Completed stage:', currentStage.value)
}

const handleResetStages = () => {
  resetStages()
  console.log('🔄 Reset all stages')
}
</script>
