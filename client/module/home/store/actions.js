import Vue from 'vue';
import {Message} from 'element-ui';
export const getTest = ({commit}) => {
	const str = 'change home';
	commit('updateTest',str);
}
export const ajaxGetUser = ({commit},postData) => {
	return new Promise(reslove => {
		Vue.prototype.$http({
			method:'post',
			url:'/volunteer/ajax-sign-volunteer',
			data:postData
		}).then(res => {
			const result = res.data;
			if(!result.status){
				return Message({
							type:'error',
							message:'登陆失败！'
						})
			}
			commit('updateUser',result.data);

			// 用户信息session存储
			sessionStorage.setItem('user_message',JSON.stringify(result.data));

			reslove(result);
		})
	})
	
}