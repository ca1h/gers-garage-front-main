<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        app
    >

      <v-list>
        <v-list-item-group v-model="selectedItem">
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.url"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Base',
  data: () => ({
    drawer: null,
    items: [],
    preItems: [
      {
        text: 'New Booking',
        url: '/',
        roles: ['ROLE_CUSTOMER']
      },
      {
        text: 'Follow booking',
        url: '/follow-booking',
        roles: ['ROLE_CUSTOMER']
      },
      {
        text: 'My account',
        url: '/my-account',
        roles: ['ROLE_CUSTOMER']
      },
      {
        text: 'Manage users',
        url: '/users',
        roles: ['ROLE_ADMIN']
      },
      {
        text: 'Manage bookings',
        url: '/bookings',
        roles: ['ROLE_ADMIN']
      }
    ],
    selectedItem: '',
  }),
  async created() {
    const {roleName} = (await this.$auth.fetch()).data
    this.items = this.preItems.filter(item => item.roles.includes(roleName))
    this.items.push({
      text:'Logout',
      url: '/logout',
      roles: ["ROLE_CUSTOMER", "ROLE_ADMIN"]
    })
  }

};
</script>
