<template>
  <div class="auth-demo">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2>BasicAuth - Authentication Demo</h2>
          </v-card-title>
          <v-card-text>
            <v-alert v-if="isAuthenticated" type="success" class="mb-4">
              <strong>✅ Logged in as:</strong> {{ currentUser?.name || 'Demo User' }}
            </v-alert>

            <BasicAuth
              v-if="!isAuthenticated"
              redirect-path="/"
              @login-success="handleLoginSuccess"
              @login-error="handleLoginError"
            />

            <div v-if="isAuthenticated">
              <p class="mb-4">You are currently logged in.</p>
              <v-btn color="error" @click="handleLogout">
                Logout
              </v-btn>
            </div>

            <v-divider class="my-4"></v-divider>

            <h3>Features Demonstrated</h3>
            <v-list density="compact">
              <v-list-item prepend-icon="mdi-check">
                <v-list-item-title>useAuth composable</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check">
                <v-list-item-title>Vuex 4 integration</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check">
                <v-list-item-title>Vue Router 4 integration</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check">
                <v-list-item-title>Form validation</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check">
                <v-list-item-title>Loading states</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { BasicAuth } from '@plantquest/model-vue'
import { useAuth } from '@plantquest/model-vue'

const { isAuthenticated, currentUser, logout } = useAuth()

const handleLoginSuccess = () => {
  console.log('Login successful!')
}

const handleLoginError = (error) => {
  console.error('Login error:', error)
}

const handleLogout = () => {
  logout()
    .then(() => {
      console.log('Logged out successfully')
    })
}
</script>
