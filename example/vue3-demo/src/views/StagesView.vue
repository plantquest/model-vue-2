<template>
  <div class="stages-demo">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>BasicNavStages - Stage Navigation Demo</h2>
          </v-card-title>
          <v-card-text>
            <p class="mb-4">This component manages multi-stage workflows with route synchronization</p>
            
            <v-alert type="info" class="mb-4">
              <strong>Features:</strong> Stage progression, route sync, completion tracking, 64% complexity reduction
            </v-alert>

            <BasicNavStages
              :stages="stages"
              :allow-skip="allowSkip"
            >
              <template #stage-content-0="{ stage }">
                <div class="pa-4">
                  <h3>{{ stage.label }} Content</h3>
                  <p>This is the content for stage 1. Click "Next" to progress.</p>
                  <v-btn color="primary" @click="completeCurrentStage">
                    Complete Stage
                  </v-btn>
                </div>
              </template>

              <template #stage-content-1="{ stage }">
                <div class="pa-4">
                  <h3>{{ stage.label }} Content</h3>
                  <p>This is the content for stage 2.</p>
                  <v-btn color="primary" @click="completeCurrentStage">
                    Complete Stage
                  </v-btn>
                </div>
              </template>

              <template #stage-content-2="{ stage }">
                <div class="pa-4">
                  <h3>{{ stage.label }} Content</h3>
                  <p>This is the final stage. You've completed the workflow!</p>
                  <v-btn color="success" @click="completeWorkflow">
                    Finish
                  </v-btn>
                </div>
              </template>
            </BasicNavStages>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col>
                <v-switch
                  v-model="allowSkip"
                  label="Allow Skip Stages"
                  color="primary"
                ></v-switch>
              </v-col>
              <v-col>
                <p><strong>Current Stage:</strong> {{ currentStage + 1 }}</p>
                <p><strong>Progress:</strong> {{ progress }}%</p>
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
import { useRouter } from 'vue-router'
import { BasicNavStages } from '@plantquest/model-vue'
import { useNavStages } from '@plantquest/model-vue'

const router = useRouter()
const { currentStage, completedStages, completeStage, progress } = useNavStages()

const allowSkip = ref(false)

const stages = ref([
  { id: 0, label: 'Stage 1: Setup', description: 'Initial setup', icon: 'mdi-numeric-1', route: 'stage-1' },
  { id: 1, label: 'Stage 2: Configuration', description: 'Configure settings', icon: 'mdi-numeric-2', route: 'stage-2' },
  { id: 2, label: 'Stage 3: Complete', description: 'Finalize', icon: 'mdi-numeric-3', route: 'stage-3' }
])

const completeCurrentStage = () => {
  completeStage(currentStage.value)
}

const completeWorkflow = () => {
  completeStage(currentStage.value)
  alert('Workflow completed! All stages done.')
}
</script>
