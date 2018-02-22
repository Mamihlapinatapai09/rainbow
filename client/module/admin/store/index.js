import Vue from 'Vue';
import Vuex from 'vuex'

import * as list_actions from './actions.js';
import * as list_mutations from './mutations.js';
import * as list_getters from './getters.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		test:'this is a test'
	},
	getters:list_getters,
	actions:list_actions,
	mutations:list_mutations
})

export default store;