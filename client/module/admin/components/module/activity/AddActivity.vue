<template>
	<div class="add-form-box">
		<full-screen title="新增活动">
			<div slot="content">
				<el-form :model="activityForm" :rules="activityRules" label-position="left" label-width="100px">
					<el-form-item label="活动名称" prop="name">
						<el-input v-model="activityForm.name" placeholder="不能超过20个字符"></el-input>
					</el-form-item>
					<el-form-item label="活动开始时间">
						<el-date-picker
					      v-model="activityForm.startDate"
					      :picker-options="pickerOptions1"
					      type="date"
					      placeholder="开始时间">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="活动结束时间">
						<el-date-picker
					      v-model="activityForm.endDate"
					      :picker-options="pickerOptions1"
					      type="date"
					      :disabled="timeEndDisabled"
					      placeholder="结束时间">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="活动承办团队">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="招募人数">
						<el-input v-model="activityForm.maxNum"></el-input>
					</el-form-item>
					<el-form-item label="活动状态">
						<el-switch :disabled="activityId === 0" v-model="activityForm.status" text-on="" text-off=""></el-switch>
					</el-form-item>
				</el-form>
				<p @click="look">查看结果</p>
			</div>
			
			<p slot="footer">123</p>
		</full-screen>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import FullScreen from '../../layout/FullScreen.vue'

export default{
	created(){
		const t = this;
		if(!(t.activityId === '')){
			t.activitiesList.forEach(item => {
				if(item.id === t.activityId){
					let obj = JSON.parse(JSON.stringify(item));
					obj.activityId = t.activityId;
					t.activityForm = obj;
				}
			})
		}
	},
	data(){
		return {
			activityForm:{  // 添加/删除发送数据
				activityId:"", 
				name:"",
				startDate:"", 
				endDate:"", 
				note:"",
				teamId:"",
				maxNum:"",
				status:true    //正常开始 0  结束 1  删除 2
			},
			pickerOptions1:{
				disabledDate(time) {
		            return time.getTime() < Date.now();
		        },
			}
		}
	},
	methods:{
		look(){
			const t = this;
			console.log(t.activityForm.startTime.getTime());
		}
	},
	computed:{
		...mapGetters({
			'activitiesList':'getActivitiesList',
			'activityId':'getActivityId'
		}),
		timeEndDisabled(){
			const t = this;
			if(!!t.activityForm.startTime){
				return false;
			}
			return true;
		},
		activityRules(){
			return {
				name:[
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
				]
			}
		}
	},
	components:{
		'full-screen':FullScreen
	}
}
</script>
<style lang="scss">
.add-form-box{
	width:100%;
	height: 100%;
}
</style>