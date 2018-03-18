import Vue from 'vue';

// 获取活动列表数据
export const getActivitiesData = ({commit,state},param) => {
	return new Promise(reslove => {
		Vue.prototype.$http({
			method:'post',
			url:'/activity/ajax-get-activity-list',
			body:{
				'page':state.page,
				'num':state.num,
				'type':parseInt(param)
			}
		}).then(res => {
			const result = res.body;
			if(!result.status){
				return false;
			}
			commit('updateActivitiesData',result.data);
			reslove(result);
		})
	})
}