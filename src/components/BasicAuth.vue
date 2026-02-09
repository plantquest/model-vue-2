<template>
  <div>
    <slot v-if="currentUser"></slot>
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
                  outlined
                  @blur="validateEmail"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  type="password"
                  outlined
                  @blur="validatePassword"
                ></v-text-field>
              </v-card-text>
              
              <v-card-text v-if="state !== 'empty'">
                {{ stateMessage[state] }}
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!valid || isLoading"
                  :loading="isLoading"
                  @click="handleSignin"
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
import { ref, computed, onMounted } from 'vue'
import { useAuth, type Credentials } from '@/composables/useAuth'
import { useRouter, useRoute } from 'vue-router'

// Props
interface Props {
  user?: object | null
  redirectPath?: string
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
  redirectPath: '/dashboard'
})

// Emits
const emit = defineEmits<{
  signinSuccess: []
  signinError: [error: Error]
}>()

// Composables
const { signin, currentUser } = useAuth()
const router = useRouter()
const route = useRoute()

// Template refs
const formRef = ref()

// Reactive state
const valid = ref(false)
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const state = ref<'empty' | 'signin' | 'fail'>('empty')

// Validation rules
const emailRules = [
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
]

// State messages
const stateMessage = {
  empty: '',
  signin: 'Signing in...',
  fail: 'Signin details are incorrect. Please try again.',
}

// Computed
const canSignin = computed(() => 
  email.value.length > 0 && 
  password.value.length > 0 &&
  valid.value &&
  !isLoading.value
)

// Methods
const validateEmail = (): boolean => {
  if (!email.value) {
    return false
  }
  if (!/.+@.+\..+/.test(email.value)) {
    return false
  }
  return true
}

const validatePassword = (): boolean => {
  if (!password.value) {
    return false
  }
  return true
}

const handleSignin = () => {
  if (!canSignin.value) {
    return
  }

  state.value = 'signin'
  isLoading.value = true

  const credentials: Credentials = {
    email: email.value,
    password: password.value,
  }

  signin(credentials)
    .then(({ ok }) => {
      if (!ok) {
        state.value = 'fail'
        emit('signinError', new Error('Invalid credentials'))
      } else {
        state.value = 'empty'
        emit('signinSuccess')
        // Redirect on success
        if (props.redirectPath) {
          router.push(props.redirectPath)
        }
      }
    })
    .catch((error) => {
      state.value = 'fail'
      emit('signinError', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}

// Lifecycle hooks
onMounted(() => {
  // If already authenticated, redirect
  if (currentUser.value) {
    if (props.redirectPath) {
      router.push(props.redirectPath)
    }
  }
})
</script>

<style lang="scss" scoped>
// Component-specific styles
</style>
