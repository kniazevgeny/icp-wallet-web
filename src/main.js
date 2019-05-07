// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import home from './components/home'
import wallet from './components/wallet'

var SubAp = require('./components/SubApp')
Vue.component('SubApp', SubAp)
//import './assets/fonts/Cocon_Regular.otf'
import '../src/css/fonts.css'
Vue.use(Vuetify, {
    theme: {
        primary: '#000000',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
})
Vue.use(VueRouter)
Vue.config.productionTip = false

var router = new VueRouter({
    routes: [
        {path: '/', component: home},
        {path: '/wallet', component: wallet}
    ]
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    components: {App},
    template: '<App/>',
    render: h => h(App),
    balance: '500',
    balanceShow: false,
    wallet: true,
    crypto_balance: '456',
    userLang: '',
    lang: '',

    salution: "Hello!",
    txtwallet: "My wallet",
    from: "from",
    to: "to",
    today: "Today",

    routerv: false
}).$mount('#app')
//import ru from './components/lang/ru'

