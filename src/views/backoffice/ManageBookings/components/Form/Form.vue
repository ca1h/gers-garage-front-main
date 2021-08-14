<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="space-between">
          <h2>Status</h2>
          <v-col cols="6">
            <v-select
                v-model="form.status"
                :items="bookingStatusList"
                class="mt-4"
                dense
                label="Status"
                outlined
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
                @click="saveBookingStatus"
                class="mt-4 mr-4"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="space-between">
          <h2>Staff</h2>
          <v-col cols="6">
            <v-select
                v-model="form.employeeId"
                :items="staff"
                class="mt-4"
                dense
                item-text="name"
                item-value="id"
                label="Staff"
                outlined
            />
          </v-col>
          <v-col cols="auto">
            <v-btn
                @click="saveStaff"
                class="mt-4 mr-4"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-divider/>
      </v-col>

      <h2>Supplies</h2>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="8">
            <v-card v-if="form && form.supplies && form.supplies.length" class="mb-4">
              <v-card-title>
                <h3>List of supplies in this booking</h3>
              </v-card-title>
              <v-card-text class="text-center">
                <p
                    v-for="(supply, i) in form.supplies"
                    :key="i"
                >
                  {{ supply.name }} - € {{ supply.price.toFixed(2) }}
                </p>
              </v-card-text>
            </v-card>
            <v-row>
              <v-col>
                <v-autocomplete
                    v-model="supply"
                    :items="supplies"
                    label="Add supply"
                    dense
                    outlined
                    item-text="name"
                    item-value="id"
                />
              </v-col>
              <v-col>
                <v-btn
                    @click="addSupply"
                    block
                >
                  Add
                </v-btn>
              </v-col>
            </v-row>
            <v-card v-if="suppliesToAdd && suppliesToAdd.length !== 0" class="pa-4">
              <v-card-title>
                <h3>Supplies to be added to this booking</h3>
              </v-card-title>
              <v-row
                  justify="space-between"
                  v-for="(supply, i) in suppliesToAdd"
                  :key="i">
                <v-col cols="auto">
                  <p>
                    {{ supply.name }} - € {{ supply.price.toFixed(2) }}
                  </p>
                </v-col>
                <v-col cols="auto">

                  <v-btn
                      icon
                      @click="removeToAdd(i)"
                  >
                    <v-icon>
                      mdi-trash-can
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
            <v-btn
                @click="saveSupplies"
                block
                :disabled="suppliesToAdd.length === 0"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <h2>Comments</h2>
      <v-col cols="12">
        <v-row justify="center">
          <v-col cols="8">
            <v-card v-if="form && form.comments && form.comments.length" class="mb-4">
              <v-card-title>
                <h3>List of comments in this booking</h3>
              </v-card-title>
              <v-card-text class="text-center">
                <p
                    v-for="(comment, i) in form.comments"
                    :key="i"
                >
                  {{ comment }}
                </p>
              </v-card-text>
            </v-card>
            <v-row>
              <v-col cols="12">
                <v-textarea
                    v-model="comment"
                    auto-grow
                    height="75"
                    label="Add any comment if you want to"
                    outlined
                />
              </v-col>
              <v-col>
                <v-btn
                    @click="addComment"
                    block
                >
                  Add Comment
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import enums from "@/mixins/enums";

export default {
  name: 'Form',
  mixins: [enums],
  data: () => ({
    bookingStatusList: [],
    suppliesToAdd: [],
    supply: null,
    comment: ''
  }),
  props: ['form', 'supplies', 'staff'],
  created() {
    Object.keys(this.bookingStatus).forEach(key => {
      this.bookingStatusList.push({
        value: key,
        text: this.bookingStatus[key]
      })
    })
  },
  methods: {
    async addSupply() {
      const found = this.supplies.find(item => item.id === this.supply)
      if (found) {
        this.suppliesToAdd.push(found);
      }
    },
    removeToAdd(pos) {
      this.suppliesToAdd.splice(pos, 1)
    },
    async saveSupplies() {
      try {
        const ids = this.suppliesToAdd.map(item => item.id);
        await this.$axios.patch(`/booking/${this.form.id}/add-supplies`, {ids})
        this.$alertify.success('Supplies added successfully')
        this.form.supplies.push(...this.suppliesToAdd)
        this.suppliesToAdd = []
        this.$emit("fetchData")
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async saveBookingStatus() {
      try {
        await this.$axios.patch(`/booking/${this.form.id}/booking-status`, {bookingStatus: this.form.status})
        this.$alertify.success('Status updated successfully')
        this.$emit("fetchData")
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async addComment() {
      try {
        await this.$axios.patch(`/booking/${this.form.id}/add-comment`, {comment: this.comment})
        this.$alertify.success('Comment added successfully')
        this.form.comments.push(this.comment)
        this.comment = ''
        this.$emit("fetchData")
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async saveStaff() {
      try {
        await this.$axios.patch(`/booking/${this.form.id}/link-employee?employeeId=${this.form.employeeId}`)
        this.$alertify.success('Employee linked successfully')
        this.$emit("fetchData")
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    }
  }
};


</script>
