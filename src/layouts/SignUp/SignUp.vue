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
                Sign up
              </v-app-bar>
              <v-card-text>
                <v-form @submit.prevent="handleSubmit($event)" id="form">
                  <Textfield
                      v-model="form.email"
                      label="Email"
                      type="email"
                  />
                  <Textfield
                      v-model="form.name"
                      class="mt-4"
                      label="Name"
                  />
                  <Textfield
                      v-model="form.phoneNumber"
                      class="mt-4"
                      label="Phone number"
                  />
                  <Textfield
                      v-model="form.password"
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
                        form="form">
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
  data: () => ({
    form: {
      name: '',
      phoneNumber: '',
      user: {
        email: '',
        password: ''
      }
    }
  }),
  methods: {
    async handleSubmit() {
      try {
        await this.$axios.post("customer",this.form);
        this.$alertify.alert("Success", "Your account was created successfully!")
        await this.$router.push("/")
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    }
  }
};
</script>
