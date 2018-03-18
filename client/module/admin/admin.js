import Vue from 'vue'
import Vuex from 'vuex'
import commonConfig from 'assets/js/commonConfig.js'
import VueRouter from 'vue-router'
import store from './store/index.js'

import Index from './components/index.vue'
import Login from './components/Login.vue'
import AddActivity from './components/module/activity/AddActivity.vue'
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
			path:'/add-activity',
			component:AddActivity,
			beforeEnter(to,from,next){
				var activityId = store.getters.getActivityId;
                if( activityId != -1 ){
                    next()
                }else{
                    router.push({path: '/activity'})
                }
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