<template>
  <v-container fluid class="fill-height">
    <v-row justify="center">
      <v-col cols="10">
        <crud-table
            :items="items"
            :headers="headers"
            :default-item="defaultItem"
            :edited-item-prop.sync="editedItem"
            :edited-index-prop.sync="editedIndex"
            :lock-create="true"
            @save="save"
            @update="update"
            @delete="deleteItem"
        >
          <template v-slot:form>
            <Form
                :form.sync="editedItem"
                :supplies="supplies"
                :staff="staff"
                @fetchData="fetchData"
            />
          </template>
        </crud-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CrudTable from "@/components/CrudTable/CrudTable";
import moment from "moment";
import enums from "@/mixins/enums";
import Form from "@/views/backoffice/ManageBookings/components/Form/Form";

export default {
  name: 'Manageusers',
  components: {Form, CrudTable},
  mixins: [enums],
  data: () => ({
    items: [],
    supplies: [],
    staff: [],
    key: 0,
    headers: [
      {value: 'type', text: 'Type'},
      {value: 'date', text: 'Date'},
      {value: 'bookingStatus', text: 'Status'},
      {value: 'comments.length', text: 'Comments'},
      {value: 'supplies.length', text: 'Supplies'},
      {value: 'customer.name', text: 'Customer'},
      {value: 'customer.vehicle.type', text: 'Car type'},
      {value: 'employeeName', text: 'Employee'},
      {value: 'total', text: 'Total'},
    ],
    defaultItem: {
      status: '',
      employeeId: null
    },
    editedItem: {
      status: '',
      employeeId: null
    },
    editedIndex: -1,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.items = (await this.$axios.get('/booking')).data;
        this.supplies = (await this.$axios.get('/supply')).data;
        this.staff = (await this.$axios.get('/employee')).data;

        this.items.forEach(item => {
          item.date = moment(item.date).format('DD/MM/yyyy')
          item.bookingStatus = this.bookingStatus[item.status]
        })
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async deleteItem(id) {
      try {
        await this.$axios.delete(`booking/${id}`)
        await this.fetchData();
        this.$alertify.success('Item removed')
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async save(item) {
      try {
        await this.$axios.post(`booking`, item)
        this.$alertify.success('Item saved')
        this.items.push(item);
        await this.fetchData();
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async update(item) {
      try {
        await this.$axios.put(`user/${item.id}`, item)
        this.$alertify.success('Item saved')
        await this.fetchData();
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    }
  }
};
</script>
