import Vue from 'vue';
import Vuex from 'vuex';

import * as list_actions from './actions.js';
import * as list_mutations from './mutations.js';
import * as list_getters from './getters.js';

Vue.use(Vuex);


const store = new Vuex.Store({
	state:{
		test:'this is home str'
	},
	getters:list_getters,
	mutations:list_mutations,
	actions:list_actions
}) 

export default store;