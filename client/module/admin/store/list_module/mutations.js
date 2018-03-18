import Vue from 'vue';

// 更新当前页数
export const updatePage = (state,param) => {
	state['page'] = param;
}


// 活动列表数据
export const updateActivitiesData = (state,param) => {
	state['page'] = param.page;
	state['activitiesList'] = param.list;
}

// 当前编辑活动id
export const updateActivityId = (state,param) => {
	state['activityId'] = param;
}