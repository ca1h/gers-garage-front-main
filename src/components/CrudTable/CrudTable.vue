<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page="1000"
      class="elevation-1"
      hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-spacer></v-spacer>
        <Textfield
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
        ></Textfield>
        <v-spacer v-if="lockCreate !== true"></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="800"
        >
          <template v-if="lockCreate !== true" v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <slot name="form">

              </slot>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.total="{ item }">
      € {{ item.total.toFixed(2) }}
    </template>
  </v-data-table>
</template>

<script>
// Component based  from https://vuetifyjs.com/en/components/data-tables/#crud-actions
import Textfield from "@/components/TextField/TextField";

export default {
  components: {Textfield},
  data: () => ({
    name: "Crudtable",
    dialog: false,
    dialogDelete: false,
    search: ''
  }),
  props: ['headers', 'items', 'defaultItem', 'editedItemProp', 'editedIndexProp', 'lockCreate'],
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    editedItem: {
      get() {
        return this.editedItemProp;
      },
      set(v) {
        this.$emit('update:editedItemProp', v)
      }
    },
    editedIndex: {
      get() {
        return this.editedIndexProp;
      },
      set(v) {
        this.$emit('update:editedIndexProp', v)
      }
    },
  },

  watch: {
    dialog(val) {
     val || this.close()
    }
    ,
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    const found = this.headers.find(item => item.value === "actions")
    if (!found) {
      this.headers.push({text: 'Actions', value: 'actions', sortable: false})
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.$emit('delete', this.items[this.editedIndex].id)
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        this.$emit('update', this.editedItem)
      } else {
        this.$emit('save', this.editedItem)
      }
      this.close()
    },
  },
}
</script>
