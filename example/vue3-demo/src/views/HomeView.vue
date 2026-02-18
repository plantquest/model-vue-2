<template>
  <div class="home">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Welcome to Model-Vue 3 Demo</h1>
          </v-card-title>
          <v-card-text>
            <p class="text-h6">This demo showcases the Vue 3 migrated components from @plantquest/model-vue</p>
            
            <v-alert type="success" class="mt-4">
              <strong>✅ Week 1-2 Integration Complete!</strong>
              <br>All 9 components migrated to Vue 3 with Composition API and TypeScript
            </v-alert>

            <v-list class="mt-4">
              <v-list-subheader>Migrated Components</v-list-subheader>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicLed - Status indicators</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicFoot - Footer component</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicFieldPick - Field picker</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicAuth - Authentication form</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicAdmin - Admin panel</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicSide - Side navigation drawer</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicNavStages - Stage navigation</v-list-item-title>
              </v-list-item>
              
              <v-list-item prepend-icon="mdi-circle-small">
                <v-list-item-title>BasicHead - Header/toolbar with search</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider class="my-6"></v-divider>

            <h3>Quick Navigation</h3>
            <v-row class="mt-2">
              <v-col cols="12" sm="6" md="3">
                <v-btn color="primary" block to="/components">
                  View Components
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn color="primary" block to="/stages">
                  Test Stages
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn color="primary" block to="/auth">
                  Test Auth
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
// This is a Vue 3 component using Composition API
</script>
