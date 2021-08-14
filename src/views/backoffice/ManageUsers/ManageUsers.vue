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
            @save="save"
            @update="update"
            @delete="deleteItem"
        >
          <template v-slot:form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <Textfield
                      v-model="editedItem.email"
                      :disabled="editedIndex !== -1"
                      label="Email"
                      type="email"
                  />

                </v-col>
                <v-col cols="12">
                  <Textfield
                      v-model="editedItem.name"
                      :disabled="editedIndex !== -1"
                      class="mt-4"
                      label="Name"
                      type="name"
                  />
                </v-col>
                <v-col cols="12">
                  <Textfield
                      v-model="editedItem.password"
                      class="mt-4"
                      label="Password"
                      type="password"
                  />
                </v-col>
                <v-col cols="12">
                  <v-select
                      v-model="editedItem.role"
                      :items="roles"
                      class="mt-4"
                      dense
                      label="Role"
                      outlined
                      item-text="name"
                      item-value="id"
                  />
                </v-col>
              </v-row>
            </v-container>
          </template>
        </crud-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CrudTable from "@/components/CrudTable/CrudTable";
import Textfield from "@/components/TextField/TextField";

export default {
  name: 'Manageusers',
  components: {CrudTable, Textfield},
  data: () => ({
    items: [],
    roles: [],
    key: 0,
    headers: [
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Role',
        value: 'role.name',
      },
      {
        text: 'Name',
        value: 'name',
      }
    ],
    defaultItem: {
      email: '',
      password: '',
      name: ''
    },
    editedItem: {
      email: '',
      password: '',
      name: ''
    },
    editedIndex: -1,
  }),
  async created() {
    try {
      this.items = (await this.$axios.get('/user')).data.map(user => ({
        ...user,
        name: user.employeeName || user.customerName
      }));
      this.roles = (await this.$axios.get('/role')).data;
    } catch (e) {
      this.$alertify.error(e.response.data.message)
    }
  },
  methods: {
    async deleteItem(id) {
      try {
        await this.$axios.delete(`user/${id}`)
        this.$alertify.success('Item removed')
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async save(item) {
      try {
        await this.$axios.post(`user`, item)
        this.$alertify.success('Item saved')
        this.items.push(item);
        location.reload();
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    },
    async update(item) {
      try {
        item.roleId = item.role ? item.role.id : null;
        await this.$axios.put(`user/${item.id}`, item)
        this.$alertify.success('Item saved')
        location.reload();
      } catch (e) {
        this.$alertify.error(e.response.data.message)
      }
    }
  }
};
</script>
