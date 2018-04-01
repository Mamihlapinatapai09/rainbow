import Vue from 'vue'
import Vuex from 'vuex'
import commonConfig from 'assets/js/commonConfig.js'
import VueRouter from 'vue-router'
import store from './store/index.js'

import Index from './components/index.vue'
import Login from './components/Login.vue'

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
			component:resolve => require(['./components/activity/AddList.vue'], resolve),
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
			path: '/team',
			component:Team
		},
		{
			path: '/team-list',
			component:resolve => require(['./components/team/List.vue'], resolve)
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
			path: '/volunteer',
			component:Volunteer,
		},

	]
})

new Vue({
	router:router,
	store:store
}).$mount('#admin')