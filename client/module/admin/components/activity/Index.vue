<template>
	<div class="activity-container">
		<div class="activity-content">
			<el-button class="add-btn" @click="handleAdd">+活动</el-button>
			<el-tabs v-model="activeTabName" @tab-click="changeTab">
			    <el-tab-pane label="进行中" name="0">
			    	<main-table :dataTabs="activitiesTabs" 
			    		:dataList="activitiesList"
			    		@handleEdit="handlerEdit"
			    		@handleDelete="handlerDelete"
			    		@handleRow="handlerRow"></main-table>
			    </el-tab-pane>
			    <el-tab-pane label="已结束" name="1">
			    	<main-table :dataTabs="activitiesTabs" 
			    		:dataList="activitiesList"
			    		@handleEdit="handlerEdit"
			    		@handleDelete="handlerDelete"
			    		@handleRow="handlerRow"></main-table>
			    </el-tab-pane>
			    <el-tab-pane label="已删除" name="2">
			    	<main-table :dataTabs="activitiesTabs" 
			    		:dataList="activitiesList"
			    		:isOpearte = "false"
			    		@handleEdit="handlerEdit"
			    		@handleRow="handlerRow"></main-table>
			    </el-tab-pane>
			</el-tabs>
		</div>

		<el-pagination
		    layout="prev, pager, next"
		    :page-size="6"
		    :total="maxPage"
		    @current-change="changePage"
		    :current-page="currentPage">
		</el-pagination>

		<el-dialog title="删除"
			:visible.sync="DeleteDialogVisible">
			<div>是否删除该活动？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxDelete">确 定</el-button>
			    <el-button class="cancel" @click="DeleteDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>

		<el-dialog title="志愿者名单"
			:visible.sync="VolunteerDialogVisible">

			<div class="content">
				<el-table :data="volunteerList" height="220" border style="width: 100%">
				    <el-table-column prop="name" label="姓名"></el-table-column>
				    <el-table-column prop="mobile" label="手机号"></el-table-column>
				</el-table>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button @click="VolunteerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
import MainTable from '../layout/MainTable.vue'

export default{
	created(){
		const t = this;
		// 获取活动列表
		t.$store.dispatch('getActivitiesData');
	},
	data(){
		return {
			activeTabName:'0',
			activitiesTabs:[
				{prop:'name',label:'名称'},
				{prop:'addtime',label:'发起时间'},
				{prop:'startDate',label:'开始时间'},
				{prop:'endDate',label:'结束时间'},
				{prop:'teamName',label:'团队'},
				{prop:'maxNum',label:'剩余人数'},
			],
			DeleteDialogVisible:false,
			deleteRow:'',
			VolunteerDialogVisible:false,
			volunteerList:[
				{'name':'wang','mobile':'13166966115'}
			]

		}
	},
	methods:{
		// 换页
		changePage(pageActive){
			const t = this;
			t.$store.commit('updatePage',pageActive);
			t.$store.dispatch('getActivitiesData',t.activeTabName);
		},
		// 切换类型库
		changeTab(name){
			const t = this;
			t.$store.commit('updatePage',1);
			t.$store.dispatch('getActivitiesData',t.activeTabName);
		},
		// 添加活动
		handleAdd(){
			const t = this;
			t.$store.commit('updateActivityId','');
			t.$router.push(`/add-activity`);
		},
		// 编辑活动
		handlerEdit(row){
			const t = this;
			t.$store.commit('updateActivityId',row.id);
			t.$router.push(`/add-activity`);
		},
		// 删除活动
		handlerDelete(row){
			const t = this;
			t.deleteRow = row;
			t.DeleteDialogVisible=true;
		},
		// 查看当前活动下的志愿者名单
		handlerRow(row){
			const t = this;

			t.$http({
				method:'post',
				url:'/activity/get-activity-volunteers'
			}).then(res => {
				const result = res.body;
				if(!result.status){
					return t.$message({
								message:res.message,
								type:'error'
							})
				}else{
					//志愿者列表数据
					t.volunteerList = result.data;
					t.VolunteerDialogVisible = true;
				}
			})
			
		},
		// 确认删除
		ajaxDelete(){
			const t = this;
			let postData = JSON.parse(JSON.stringify(t.deleteRow));

			postData.startDate = new Date(postData.startDate).getTime();
			postData.endDate = new Date(postData.endDate).getTime();
			postData.addtime = new Date(postData.addtime).getTime();
			postData.status = 2;

			t.$http({
				method:'post',
				url:'/activity/ajax-edit-activity',
				body:postData
			}).then(res => {
				const result = res.body;
				if(!result.status){
					t.$message({
						message:result.message,
						type:'error'
					})
				}else{
					//重新获取数据
					t.$store.dispatch('getActivitiesData');
				}
			})
		}
		
	},
	computed:{
		...mapGetters({
			'maxPage':'getMaxPage',
			'currentPage':'getPage',
			'activitiesList':'getActivitiesList',
			'activityId':'getActivityId'
		})
	},
	components:{
		'main-table':MainTable
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.activity-container{
	padding:20px;
	height:100%;
	.activity-content{
		position:relative;
		height:82%;
		.add-btn{
			position:absolute;
			right: 1px;
			top:-7px;
			z-index: 1004;
			&.el-button {
				padding:10px 16px;
			}
		}
	}

	.el-table {
		th.is-leaf{
			color:$textMainHeaderColor;
			font-weight: normal !important;
		}
		.operate {
			padding:6px 8px;
		}
	}

	.el-pagination{
		text-align: right;
		margin-top: 15px;
	}
}

</style>