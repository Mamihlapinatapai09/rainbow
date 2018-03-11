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
			path: '/activity',
			component:Index,
			meta: {
				component:'activity'
			}
		},
		{
			path: '/approve',
			component:Index ,
			meta: {
				component:'approve'
			}
		},
		{
			path: '/notice',
			component:Index,
			meta: {
				component:'notice'
			}
		},
		{
			path: '/team',
			component:Index,
			meta: {
				component:'team'
			}
		},
		{
			path: '/volunteer',
			component:Index,
			meta: {
				component:'volunteer'
			}
		},

	]
})

new Vue({
	router:router,
	store:store
}).$mount('#admin')