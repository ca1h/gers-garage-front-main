import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
    {
        path: "*",
        name: "PageNotFound",
        meta: {
            layout: () => import("@/layouts/PageNotFound/PageNotFound.vue"),
            auth: false
        }
    },
    {
        path: "/404",
        name: "404",
        component:  () => import("@/layouts/PageNotFound/PageNotFound.vue"),
        meta: {
            layout: () => import("@/layouts/Base/Base.vue"),
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            layout: () => import("@/layouts/Login/Login.vue"),
            auth: false
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        meta: {
            layout: () => import("@/layouts/SignUp/SignUp.vue"),
            auth: false
        },

    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/customer/NewBooking/NewBooking.vue")
    },
    {
        path: "/follow-booking",
        name: "FollowBooking",
        component: () => import("@/views/customer/FollowBooking/FollowBooking.vue")
    },
    {
        path: "/my-account",
        name: "MyAccount",
        component: () => import("@/views/customer/MyAccount/MyAccount.vue")
    },
    {
        path: "/users",
        name: "Users",
        component: () => import("@/views/backoffice/ManageUsers/ManageUsers.vue")
    },
    {
        path: "/bookings",
        name: "Manage Bookings",
        component: () => import("@/views/backoffice/ManageBookings/ManageBookings.vue")
    },
    {
        path: "/logout",
        name: "Logout",
        component: () => import("@/Logout.vue")
    }
]

routes = routes.map(route => {
    if (!route.meta) {
        route.meta = {}
    }
    if (!route.meta.layout) {
        route.meta.layout = () => import("@/layouts/Base/Base.vue")
    }
    if(route.meta.auth === undefined) {
        route.meta.auth = true
    }
    return route
})

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
