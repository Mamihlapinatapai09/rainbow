import Vue from 'Vue';

import * as list_actions from './actions.js';
import * as list_mutations from './mutations.js';
import * as list_getters from './getters.js';


export default {
	state: {
		page:1,
		num:6,
		maxPage:5,
		activitiesList:[
			{
				"id":0,
				"name":"活动名称1",
				"teamId":1,
				"teamName":"团队1",
				"startDate":"1990-12-13",
				"endDate":"1990-12-13",
				"maxNum":2,
				"type":1,
				"status":0,
				"addtime":"1990-12-13"
			},
			{
				"id":1,
				"name":"活动名称1",
				"teamId":1,
				"startDate":"1990-12-13",
				"endDate":"1990-12-13",
				"maxNum":2,
				"type":1,
				"status":0,
				"addtime":"1990-12-13"
			},
		],
		activityId:-1,  //当前编辑活动id
		activityForm:{  // 添加/删除发送数据
			activityId:"", 
			name:"",
			startDate:"", 
			endDate:"", 
			note:"",
			teamId:"",
			maxNum:"",
			status:0    //正常开始 0  结束 1  删除 2
		}
	},
	getters:list_getters,
	actions:list_actions,
	mutations:list_mutations,
}
