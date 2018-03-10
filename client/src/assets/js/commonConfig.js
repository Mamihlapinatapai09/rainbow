import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css' 
import 'assets/scss/base.scss'
import 'assets/scss/el.scss'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(Vuex)