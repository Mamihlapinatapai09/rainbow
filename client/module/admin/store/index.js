import Vue from 'vue'
import Vuex from 'vuex'
import list_module from './list_module/index'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		list_module
	}
})

export default store;