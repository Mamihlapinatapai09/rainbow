import Vue from 'vue'
import commonConfig from 'assets/js/commonConfig.js'
import VueRouter from 'vue-router'
import store from './store/index.js'

import Index from './components/index.vue'
import Login from './components/Login.vue'

// Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base:'/admin',
	routes:[
		{
			path: '/index',
			alias: '/',
			component:Login
		},
		{
			path: '/home',
			component:Index
		}
	]
})

new Vue({
	router:router,
	store:store
}).$mount('#admin')