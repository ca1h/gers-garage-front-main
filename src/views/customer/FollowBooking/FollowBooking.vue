<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-app-bar dense>
            Booking details
          </v-app-bar>
          <v-card-text>
            <v-row>
              <v-col cols="6">Type</v-col>
              <v-col cols="6" class="text-sm-right">{{ bookingType[booking.type] }}</v-col>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="6">Date</v-col>
              <v-col cols="6" class="text-sm-right">{{ booking.date | date }}</v-col>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="6">Status</v-col>
              <v-col cols="6" class="text-sm-right">{{ bookingStatus[booking.status] }}</v-col>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" v-if="booking.comments.length">
                <v-row>
                  <v-col cols="6">Comments</v-col>
                  <v-col cols="6" class="text-sm-right">
                    <p
                        v-for="(comment, i) in  booking.comments "
                        :key="i"
                    >
                      {{ comment }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" v-if="booking.supplies.length">
                <v-row>
                  <v-col cols="6">Supplies</v-col>
                  <v-col cols="6" class="text-sm-right">
                    <p
                        v-for="(supply, i) in  booking.supplies "
                        :key="i"
                    >
                      {{ supply.name }} - € {{ supply.price.toFixed(2) }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">Total</v-col>
              <v-col cols="6" class="text-sm-right">€ {{ booking.total.toFixed(2) }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import enums from "@/mixins/enums";
import moment from "moment";

export default {
  name: 'Followbooking',
  mixins: [enums],
  data: () => ({
    booking: {
      type: '',
      date: '',
      status: '',
      total: 0,
      comments: [],
      supplies: []
    }
  }),
  filters: {
    date(v) {
      return moment(v).format('DD/MM/yyyy')
    }
  },
  async created() {
    try {
      const response = await this.$axios.get('/booking/last-booking');
      if (!response.data) {
        this.$alertify.alert("Warning", "You don't have a booking", () => {
        })
        this.$router.push('/')

      } else {
        Object.assign(this.booking, response.data);
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        this.$alertify.alert("Warning", "You don't have a booking")
      } else {
        this.$alertify.alert(e.response.data.title, e.response.data.message);
      }
    }
  }
};
</script>
