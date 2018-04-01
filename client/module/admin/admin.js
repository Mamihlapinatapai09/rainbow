import Vue from 'vue'
import Vuex from 'vuex'
import commonConfig from 'assets/js/commonConfig.js'
import VueRouter from 'vue-router'
import store from './store/index.js'

import Index from './components/index.vue'
import Login from './components/Login.vue'
import AddActivity from './components/activity/AddList.vue'

import Team from './components/team/Index.vue'
import Approve from './components/approve/Index.vue'
import Notice from './components/notice/Index.vue'
import Volunteer from './components/volunteer/Index.vue'

Vue.config.productionTip = false

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
			component:Approve,
		},
		{
			path: '/notice',
			component:Notice,
		},
		{
			path: '/team',
			component:Team
		},
		{
			path: '/volunteer',
			component:Volunteer,
		},

	]
})

new Vue({
	router:router,
	store:store
}).$mount('#admin')