import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Auth config
import auth from '@websanova/vue-auth/dist/v2/vue-auth.esm.js';
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js';
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';

import VueAlertify from 'vue-alertify';

import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
    componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

Vue.use(VueAlertify);

Vue.config.productionTip = false

import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = process.env.API
Vue.router = router

Vue.use(auth, {
    plugins: {
        http: Vue.axios, // Axios
        // http: Vue.http, // Vue Resource
        router: Vue.router,
    },
    drivers: {
        auth: driverAuthBearer,
        http: driverHttpAxios,
        router: driverRouterVueRouter
    },
    options: {
        rolesKey: 'type',
        // notFoundRedirect: {path: '/404'},
        loginData: {
            url: 'login',
            method: 'POST',
            redirect: '/',
            fetchUser: false,
            staySignedIn: true
        },
        refreshData: false,
        fetchData: {
            url: 'user/auth'
        }
    },
});


new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
