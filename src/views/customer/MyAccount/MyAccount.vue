<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-app-bar dense>
            My account
          </v-app-bar>
          <v-card-text>
            <v-form @submit.prevent="updateAccount" id="accountForm">
              <v-row>
                <v-col>Account data</v-col>
                <v-divider vertical/>
                <v-col>
                  <v-row justify="end">
                    <v-col cols="12">
                      <Textfield
                          :value="form.email"
                          label="Email"
                          disabled
                      />
                    </v-col>
                    <v-col cols="12">
                      <Textfield
                          :value="form.customer.name"
                          label="Name"
                          disabled
                      />
                    </v-col>
                    <v-col cols="12">
                      <Textfield
                          v-model="form.customer.phoneNumber"
                          label="Phone number"
                      />
                    </v-col>
                    <v-col cols="12">
                      <Textfield
                          v-model="form.password"
                          label="Change password"
                          type="password"
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-btn
                          type="submit"
                          form="accountForm"
                      >
                        Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
            <v-form
                @submit.prevent="updateVehicle"
                id="vehicleForm"
                ref="vehicleForm"
            >
              <v-row>
                <v-col>Vehicle data</v-col>
                <v-divider vertical/>

                <v-col>
                  <v-row justify="end">
                    <v-col cols="12">
                      <v-select
                          v-model="form.customer.vehicle.engineType"
                          :items="engineTypes"
                          :rules="[rules.required]"
                          dense
                          hide-details="auto"
                          label="Engine Type"
                          outlined
                          validate-on-blur
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="form.customer.vehicle.make"
                          :items="vehicleMakes"
                          :rules="[rules.required]"
                          dense
                          hide-details="auto"
                          label="Vehicle make"
                          outlined
                          validate-on-blur
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-autocomplete
                          v-model="form.customer.vehicle.type"
                          :items="vehicleTypes"
                          :rules="[rules.required]"
                          dense
                          hide-details="auto"
                          label="Vehicle type"
                          outlined
                          validate-on-blur
                      />
                    </v-col>
                    <v-col cols="12">
                      <Textfield
                          v-model="form.customer.vehicle.licenceDetails"
                          :rules="[rules.required]"
                          label="Licence details"
                          validate-on-blur
                      />
                    </v-col>
                    <v-col cols="auto">
                      <v-btn
                          form="vehicleForm"
                          type="submit"
                      >
                        Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Textfield from "@/components/TextField/TextField";
import enums from "@/mixins/enums";
import rules from "@/mixins/rules";

export default {
  name: 'Myaccount',
  components: {Textfield},
  mixins: [enums, rules],
  data: () => ({
    engineTypes: [
      {value: 'DIESEL', text: 'Diesel'},
      {value: 'PETROL', text: 'Petrol'},
      {value: 'HYBRID', text: 'Hybrid'},
      {value: 'ELECTRIC', text: 'Electric'}
    ],
    vehicleTypes: ["Golf", "Fox", "Gol", "Lavida", "Santana", "Polo", "UP", "Jetta", "Taos", "Tyron", "Tiguan", "Sharan", "Viloran", "Ecosport", "Puma", "Focus", "Kuga", "Mondeo", "New Mustang", "S-Max", "Galaxy", "Fiesta", "Territory", "Avalon", "Corolla", "Crown", "Etios", "Mirai", "Prius", "Aygo", "Glanza", "C-HR", "Corolla Cross", "Highlander", "Land Cruiser", "Raize", "RAV4", "Rush", "Sequoia", "Urban Cruiser", "A4", "A6", "A3", "A 5", "Q7", "A1", "N", "Q2", "Q5", "Q7", "Q8", "R8", "SR6", "S3", "S6", "S7", "TT", "1-Series", "2002", "216", "2 Series", "3", "3 Series", "425", "430", "4 Series", "5-Series", "6-Series", "7-Series", "8-Series", "i3", "i3s", "i8", "I Series", "M135", "M 2", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "115", "123", "190", "200", "210", "220", "230", "240", "250", "280", "300", "350", "420", "450", "500", "600", "A-Class", "Actros", "AMG", "AMG GT", "Atego", "B-Class", "C350", "CA", "CB", "CBF", "CBR", "CBX", "CD", "CG", "City", "CM", "CMX", "CR", "CT", "CTX", "Cub", "CX", "850", "C1", "F650", "F800", "F900XR", "G310R", "G640", "GS", "K100", "K1100S", "E-Series", "Connect", "Custom", "Transit", "Innova", "Noah", "Voxy", "Esquire", "Roomy", "Transporter", "Crafter", "Caddy", "H1", "Bipper", "Nemo", "Primastar", "Master", "Proace", "Hiace", "Taurus", "Javelin", "Trafic", "70C18 Crusader"],
    vehicleMakes: ["Audi", "BMW", "Citroen", "Dennis", "Ford", "Honda", "Hyndai", "Iveco", "Mercede_Bens", "Nissan", "Peugeot", "Renault", "Toyota", "Volkswagen"],
    form: {
      email: '',
      password: '',
      customer: {
        phoneNumber: '',
        name: '',
        vehicle: {
          type: '',
          make: '',
          licenceDetails: '',
          engineType: '',
        }
      }
    }
  }),
  async created() {
    const response = await this.$axios.get('/user/logged');
    Object.assign(this.form, response.data)
  },
  methods: {
    async updateAccount() {
      try {
        await this.$axios.put('/user', {
          password: this.form.password,
          phoneNumber: this.form.customer.phoneNumber
        })
        this.$alertify.alert("Success", "Your data was updated")
        this.$alertify.success("Success")

      } catch (e) {
        this.$alertify.error(e.response.data.message);
      }
    },
    async updateVehicle() {
      try {
        if (this.$refs.vehicleForm.validate()) {
          await this.$axios.post('/vehicle', this.form.customer.vehicle)
          this.$alertify.alert("Success", "Your data was updated")
          this.$alertify.success("Success")
        }
      } catch (e) {
        this.$alertify.error(e.response.data.message);
      }
    }
  }
};
</script>
