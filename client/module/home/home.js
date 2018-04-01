import Vue from 'vue'
import commonConfig from 'assets/js/commonConfig.js'
import VueRouter from 'vue-router'
import store from './store/index.js'
import $ from 'jquery'
import Index from './components/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base:'/home',
	routes:[
		{
			path:'/index',
			alias:'/',
			component:Index
		}
	]
})

new Vue({
	router:router,
	store:store
}).$mount('#home');