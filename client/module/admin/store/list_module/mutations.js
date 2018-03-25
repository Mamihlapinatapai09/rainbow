import Vue from 'vue';
import * as commonFunc from 'assets/js/commonFunc.js'

// 更新当前页数
export const updatePage = (state,param) => {
	state['page'] = param;
}


// 活动列表数据
export const updateActivitiesData = (state,param) => {
	state['page'] = param.page;

	//时间转换
	param.list.forEach(item => {
		item.startDate = commonFunc.DateFormater(new Date(item.startDate),'yyyy-MM-dd');
		item.endDate = commonFunc.DateFormater(new Date(item.startDate),'yyyy-MM-dd');
		item.addtime = commonFunc.DateFormater(new Date(item.startDate),'yyyy-MM-dd');
	})
	state['activitiesList'] = param.list;
}

// 当前编辑活动id
export const updateActivityId = (state,param) => {
	state['activityId'] = param;
}