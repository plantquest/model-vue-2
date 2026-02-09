<template>
  <div class="auth-demo">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>🔐 Composables Testing - useAuth</h2>
          </v-card-title>
          <v-card-text>
            <v-alert type="info" class="mb-4">
              Testing the <strong>useAuth</strong> composable with Vuex 4 integration
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Authentication State</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon :color="isAuthenticated ? 'success' : 'error'">
                    {{ isAuthenticated ? 'mdi-check-circle' : 'mdi-close-circle' }}
                  </v-icon>
                </template>
                <v-list-item-title>Authenticated</v-list-item-title>
                <v-list-item-subtitle>{{ isAuthenticated ? 'Yes ✅' : 'No ❌' }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="primary">mdi-account</v-icon>
                </template>
                <v-list-item-title>Current User</v-list-item-title>
                <v-list-item-subtitle>
                  {{ currentUser?.name || 'Not logged in' }}
                  {{ currentUser?.email ? `(${currentUser.email})` : '' }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="info">mdi-key</v-icon>
                </template>
                <v-list-item-title>User ID</v-list-item-title>
                <v-list-item-subtitle>{{ currentUser?.id || 'N/A' }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Test Login/Logout</v-card-title>
          <v-card-text>
            <div v-if="!isAuthenticated">
              <p class="mb-4">Test the login functionality:</p>
              <v-text-field
                v-model="testEmail"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                density="compact"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                v-model="testPassword"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                density="compact"
                class="mb-3"
              ></v-text-field>
              <v-btn
                color="primary"
                block
                :loading="isLoggingIn"
                @click="handleTestLogin"
              >
                Test Login
              </v-btn>
              <p class="text-caption mt-2">Enter any email/password to test</p>
            </div>

            <div v-else>
              <v-alert type="success" class="mb-4">
                ✅ You are logged in!
              </v-alert>
              <p class="mb-3">Test the logout functionality:</p>
              <v-btn
                color="error"
                block
                @click="handleTestLogout"
              >
                Test Logout
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>useAuth Composable Details</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <h4>Exported Functions:</h4>
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-function">
                    <v-list-item-title><code>login(credentials)</code></v-list-item-title>
                    <v-list-item-subtitle>Dispatch auth/login action</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-function">
                    <v-list-item-title><code>logout()</code></v-list-item-title>
                    <v-list-item-subtitle>Dispatch auth/logout action</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <h4>Exported State:</h4>
                <v-list density="compact">
                  <v-list-item prepend-icon="mdi-variable">
                    <v-list-item-title><code>isAuthenticated</code></v-list-item-title>
                    <v-list-item-subtitle>Computed ref from Vuex</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-variable">
                    <v-list-item-title><code>currentUser</code></v-list-item-title>
                    <v-list-item-subtitle>Computed ref with user data</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h4>Integration:</h4>
            <ul>
              <li>✅ Vuex 4 store integration</li>
              <li>✅ Vue Router 4 navigation</li>
              <li>✅ TypeScript typed interfaces</li>
              <li>✅ Reactive state with computed refs</li>
              <li>✅ Promise-based async operations (Vue 2 compatible)</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useAuth } from '@plantquest/model-vue'

const store = useStore()

// Composable with store
const { isAuthenticated, currentUser, login, logout } = useAuth(store)

// Local state
const testEmail = ref('demo@plantquest.com')
const testPassword = ref('password123')
const isLoggingIn = ref(false)

const handleTestLogin = () => {
  isLoggingIn.value = true
  login({ email: testEmail.value, password: testPassword.value })
    .then(() => {
      console.log('✅ Login successful via useAuth composable')
      isLoggingIn.value = false
    })
    .catch((error) => {
      console.error('❌ Login error:', error)
      isLoggingIn.value = false
    })
}

const handleTestLogout = () => {
  logout()
    .then(() => {
      console.log('✅ Logout successful via useAuth composable')
    })
    .catch((error) => {
      console.error('❌ Logout error:', error)
    })
}
</script>
