<template>
  <div>
    <slot v-if="user"></slot>

    <v-container v-else>
      <v-row>
        <v-col></v-col>
        <v-col>
          <v-card>
            <v-card-title>Sign In</v-card-title>

            <v-form
              ref="formRef"
              v-model="valid"
              lazy-validation
            >
              <v-card-text>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  variant="outlined"
                />

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  type="password"
                  variant="outlined"
                />
              </v-card-text>

              <v-card-text v-if="state !== 'empty'">
                {{ stateMessage[state] }}
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!valid"
                  @click="signin"
                >
                  Sign In
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'

/**
 * BasicAuth Props
 */
interface Props {
  /** User object - if provided, shows slot instead of sign-in form */
  user?: any
}

const props = defineProps<Props>()

const store = useStore()

// Form state
const formRef = ref()
const valid = ref(false)
const email = ref('')
const password = ref('')
const state = ref<'empty' | 'signin' | 'fail'>('empty')

// Validation rules
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required'
]

// State messages
const stateMessage: Record<string, string> = {
  signin: 'Signing in...',
  fail: 'Signin details are incorrect. Please try again.'
}

/**
 * Handle sign-in
 */
const signin = () => {
  state.value = 'signin'

  store.dispatch('signin_user', {
    email: email.value,
    password: password.value
  }).then(({ ok }: { ok: boolean }) => {
    if (!ok) {
      state.value = 'fail'
    } else {
      // Success - state will be handled by parent/router
      state.value = 'empty'
    }
  }).catch((error: Error) => {
    console.error('Sign-in error:', error)
    state.value = 'fail'
  })
}

/**
 * Reset form
 */
const reset = () => {
  email.value = ''
  password.value = ''
  state.value = 'empty'
  valid.value = false
  formRef.value?.reset()
}

// Expose methods
defineExpose({
  signin,
  reset
})
</script>

<style lang="scss" scoped>
/* BasicAuth styles */
</style>
