
// 活动列表数据
export const getActivitiesList = function(state){
	return state.activitiesList;
}

// 获取最大页数
export const getMaxPage = function(state){
	return state.num * state.maxPage;
}

export const getPage = function(state){
	return state.page;
}

export const getActivityId = function(state){
	return state.activityId;
}

