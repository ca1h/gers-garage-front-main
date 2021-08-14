<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-app-bar
              class="mb-4"
              dense
          >
            NEW BOOKING
          </v-app-bar>
          <v-card-text>
            <v-form
                ref="form"
                id="form"
                @submit.prevent="handleSubmit">
              <v-select
                  v-model="form.bookingType"
                  :items="bookingTypes"
                  dense
                  label="Select the booking type"
                  outlined
                  :rules="[rules.required]"
              />

              <v-row no-gutters justify="center">
                <v-date-picker
                    v-model="date"
                    block
                />
              </v-row>

              <v-textarea
                  v-model="form.comment"
                  auto-grow
                  height="75"
                  label="Add any comment if you want to"
                  outlined
              >

              </v-textarea>
            </v-form>
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-btn
                block
                type="submit"
                form="form"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Rules from '@/mixins/rules.js'
import moment from 'moment'

export default {
  name: 'Newbooking',
  mixins: [Rules],
  data: () => ({
    bookingTypes: [
      {
        value: 'ANNUAL_SERVICE',
        text: "Annual Service"
      },
      {
        value: 'MAJOR_SERVICE',
        text: "Major service"
      },
      {
        value: 'REPAIR_FAULT',
        text: "Repair/Fault"
      },
      {
        value: 'MAJOR_REPAIR',
        text: "Major repair"
      },
    ],
    form: {
      car: null,
      bookingType: null,
      date: null,
    }
  }),
  computed: {
    date: {
      get() {
        return this.form.date
      },
      set(v) {
        const date = moment(v);
        if (date.weekday() === 0) {
          this.$alertify.error("We don't work at sundays");
        } else {
          this.form.date = v;
        }
      }
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = this.validateForm();
      if (isValid) {
        try {
          await this.$axios.post('/booking', this.form)
          this.$alertify.alert("Success", "Your booking was successfully created!");
        } catch (e) {
          this.$alertify.alert(e.response.data.title, e.response.data.message)
          this.$alertify.error("Your booking was not created")
        }
      } else {
        this.$alertify.error("Invalid form")
      }
    },
    validateForm() {
      return this.$refs.form.validate() && !!this.form.date;
    }
  },
};
</script>
