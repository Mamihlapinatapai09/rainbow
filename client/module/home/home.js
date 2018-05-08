import Vue from 'vue'
import commonConfig from 'assets/js/commonConfig.js'
import VueRouter from 'vue-router'
import store from './store/index.js'
import $ from 'jquery'
import 'assets/scss/frontStyle.scss'

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
		},
		{
			path:'/activity-list',
			component:resolve => require(['./components/activity/List.vue'], resolve)
		},
		{
			path:'/activity-list-item',
			component:resolve => require(['./components/activity/ListItem.vue'], resolve)
		},
		{
			path:'/new-list',
			component:resolve => require(['./components/new/List.vue'], resolve)
		},
		{
			path:'/new-list-item',
			component:resolve => require(['./components/new/ListItem.vue'], resolve)
		},
		{
			path:'/person-list',
			component:resolve => require(['./components/person/List.vue'], resolve)
		},
		{
			path:'/team-list',
			component:resolve => require(['./components/team/List.vue'], resolve)
		}
	]
})

commonConfig(store,router)

new Vue({
	router:router,
	store:store
}).$mount('#home');