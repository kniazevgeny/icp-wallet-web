import Vue from 'vue'
import Router from 'vue-router'
import home from './components/home'
import portfolio from './components/portfolio'
import about from './components/about'
import order from './components/order'

Vue.use(Router)

export default new Router({
     routes : [
        { path: '/', component: home },
        { path: '/portfolio', component: portfolio},
        { path: '/about', component: about},
        { path: '/order', component: order}
    ]
})
