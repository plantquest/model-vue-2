<template>
  <div>
    <slot v-if="user"></slot>
    <v-container v-else>
      <v-row>
        <v-col></v-col>
        <v-col>
          <v-card xstyle="max-width:40vw">
            <v-card-title>Sign In</v-card-title>
            <v-form
              ref="form"
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
                  ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                  type="password"
                  outlined
                  ></v-text-field>
              </v-card-text>
              
              <v-card-text v-if="'empty'!=state">
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

<style lang="scss"></style>

<script>
export default {
  props: {
    user: Object
  },
    
  data () {
    return {
      state: 'empty',
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      stateMessage: {
        signin: 'Signing in...',
        fail: 'Signin details are incorrect. Please try again.',
      }
    }
  },

  created () {
  },

  computed: {
  },
  
  methods: {
    signin() {
      this.state = 'signin'
      this.$store.dispatch('signin_user', {
        email: this.email,
        password: this.password,
      }).then(({ok})=>{
        if(!ok) {
          this.state = 'fail'
        }
      })
    }
  }
}
</script>
