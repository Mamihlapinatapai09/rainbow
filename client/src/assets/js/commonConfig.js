import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-chalk/index.css' 
import 'assets/scss/base.scss'
import 'assets/icon/icon.css'
import axios from 'axios'
import qs from 'qs';

Vue.$http = axios;
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(Vuex)

export default (store,router,callBack) => {
    // axios request 拦截器
    axios.interceptors.request.use((config) => {
        console.log(config)
        // 开发阶段拦截请求 改变content type 并且发序列化参数 配合后端使用
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        if (!config.data) {
            config.data = {};
        }
        //这里的qs只对config.data的直属key做处理，对于深层次嵌套的数据需要传config.data={data:JSON.stringify(objData)}
        config.data = qs.stringify(config.data)
        return config;
    });
}