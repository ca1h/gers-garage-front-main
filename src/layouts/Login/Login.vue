<template>
  <v-app>
    <v-main>
      <v-container
          fluid class="fill-height"
          :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')', backgroundRepeat: 'repeat' }"
      >
        <v-row justify="center">
          <v-col cols="4">
            <v-card>
              <v-app-bar
                  dense
              >
                LOGIN
              </v-app-bar>
              <v-card-text>
                <v-form @submit.prevent="handleSubmit($event)" id="form">
                  <Textfield
                      v-model="user.email"
                      label="Email"
                      type="email"
                  />
                  <Textfield
                      v-model="user.password"
                      class="mt-4"
                      label="Password"
                      type="password"
                  />
                </v-form>
              </v-card-text>

              <v-divider/>

              <v-card-actions class="pa-4">
                <v-row>
                  <v-col cols="12">
                    <v-btn
                        block
                        type="submit"
                        form="form"
                    >
                      Sign In
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn block @click="$router.push('signup')">
                      Sign Up
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Textfield from "@/components/TextField/TextField";

require('@/assets/background.png')
export default {
  name: 'Login',
  components: {Textfield},
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // Auth
        await this.$auth.login({
          data: {...this.user},
          rememberMe: true,
          redirect: '/'
        })
      } catch (e) {
        this.$alertify.error("Login failed")
      }
    }

  }
};
</script>
