<template>
	<div class="back-container volunteer-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div class="back-content">
				<!-- tabs切换 -->
				<el-tabs v-model="activeTabName" @tab-click="handlerTab">
					<el-tab-pane label="已注册" name="0"></el-tab-pane>
					<el-tab-pane label="已注销" name="1"></el-tab-pane>
				</el-tabs>

				<!-- table列表 -->
				<div class="table-box">
					<el-table :data="volunteerList" @row-click="handlerActivity">
						<el-table-column prop="name" label="姓名"  :show-overflow-tooltip="true"></el-table-column>
						<el-table-column prop="mobile" label="手机号"></el-table-column>
						<el-table-column prop="email" label="邮箱"  :show-overflow-tooltip="true"></el-table-column>
						<el-table-column v-if="activeTabName === '0'" label="操作" align="center">
							<template slot-scope="scope">
								<span class="operate" @click.stop="handlerDelete(scope)">注销</span>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<!-- 分页 -->
				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="volunteerLen"
				    @current-change="handlerPage"
				    :current-page.sync="currentPage">
				</el-pagination>
			</div>
		</container-component>

		<!-- 注销弹窗 -->
		<el-dialog title="注销"
			:visible.sync="deleteDialogVisible">
			<div>志愿者注销将无法恢复，是否注销该志愿者？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxDelete">确 定</el-button>
			    <el-button class="cancel" @click="deleteDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>

		<!-- 志愿者活动弹窗 -->
		<el-dialog :title="activeVolunteer.name+'的活动'"
			:visible.sync="activityDialogVisible">
			<div>
				<el-table :data="activityList">
					<el-table-column prop="name" label="活动" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="teamName" label="团队" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column prop="startDate" label="开始时间"></el-table-column>
					<el-table-column prop="endDate" label="结束时间"></el-table-column>
				</el-table>

				<!-- 分页 -->
				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="activityLen"
				    @current-change="handlerActivityPage"
				    :current-page.sync="activityCurrentPage">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="activityDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFunc.js'
import ContainerComponent from '../layout/Container.vue';
export default{
	created(){
		const t = this;
		t.ajaxGetVolunteer();
	},
	data(){
		return{
			// -------  志愿者部分 --------
			activeSideBar:"volunteer",
			activeTabName:"0",
			currentPage:1,
			pageParam:{
				page:1,
				num:6,
				status:0  // 0 已删除 1已添加
			},
			volunteerLen:10,
			volunteerList:[
				{
					name:'志愿者一号',
					mobile:'15600820909',
					time:'2018-03-02'
				}
			],
			deleteDialogVisible:false,
			activeVolunteer:'',
			// --------- 活动列表 ----------
			activityLen:1, 
			activityCurrentPage:1,
			activityPageParam:{
				page:1,
				num:4,
				volunteerId:''
			},
			activityDialogVisible:false,
			activityList:[],
			teamId:''  //team id-name列表
		}
	},
	methods:{
		// ------ ajax请求 --------
		// 获取志愿者列表
		ajaxGetVolunteer(){
			const t = this;
			t.$http({
				method:'post',
				url:'/volunteer/ajax-get-all-volunteers',
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				let newLen = 6*result.data.maxPage;
				if(t.volunteerLen != newLen){
					t.volunteerLen = newLen;
				}
				t.volunteerList = result.data.list;
			})
		},
		// 注销志愿者
		ajaxDelete(){
			const t = this;
			
			t.$http({
				method:'post',
				url:'/volunteer/ajax-log-out-volunteer',
				data:{
					id:t.activeVolunteer.id
				}
			}).then(res => {
				const result = res.data;
				if(result.code === 201){
					t.$message({
						message:'志愿者有正在参与的活动或团队leader，不能删除！',
						type:'error'
					})
					t.deleteDialogVisible = false;
					return;
				}
				if(!result.status){
					return t.$message({
						message:'注销失败！',
						type:'error'
					})
				}

				t.ajaxGetVolunteer();
				t.deleteDialogVisible = false;
			})
		},
		// 获取志愿活动列表
		ajaxGetActive(){
			const t = this;
			t.activityPageParam['volunteerId'] = t.activeVolunteer['id'];
			t.$http({
				method:'post',
				url:'/volunteer/ajax-get-volunteer-activity',
				data:t.activityPageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				let newLen = 4*result.data.maxPage;
				if(t.activityLen != newLen){
					t.activityLen = newLen;
				}
				t.activityList = result.data.list;
				t.activityList.forEach((activity,index) => {
					t.teamId.forEach(team => {
						if(activity.teamId == team.id){
							t.$set(t.activityList[index],'teamName',team.name);
						}
					})
				});
				// 时间转换格式
				let timeArr=['startDate','endDate'];
				t.activityList.forEach(item => {
					timeArr.forEach(timeItem => {
						item[timeItem] = DateFormater(new Date(item[timeItem]),'yyyy-MM-dd');
					})
				})
			})
		},
		ajaxGetTeamId(){
			const t = this;
			t.$http({
				method:'post',
				url:'/team/ajax-get-team-id-name-list'
			}).then(res => {
				const result = res.data;
				if(!result.status){return};
				t.teamId = result.data;
				// 获取活动
				t.ajaxGetActive();
			})
		},
		// ------ 其他操作 --------
		// 换页
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetVolunteer();
		},
		// tab切换
		handlerTab(){
			const t = this;
			t.currentPage = 1;
			t.pageParam['status'] = Number(t.activeTabName);
			t.pageParam['page'] = 1;
			t.ajaxGetVolunteer();
		},
		// 注销志愿者
		handlerDelete(scope){
			const t = this;
			t.activeVolunteer = scope.row;
			t.deleteDialogVisible = true;
		},
		// 志愿活动
		handlerActivity(row, event, column){
			const t = this;
			t.activeVolunteer = row;
			t.activityDialogVisible = true;
			t.ajaxGetTeamId();
		},
		// 志愿活动换页
		handlerActivityPage(page){
			const t = this;
			t.activityPageParam['page'] = page;
			t.ajaxGetActive();
		}
	},
	components:{
		'container-component':ContainerComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
</style>