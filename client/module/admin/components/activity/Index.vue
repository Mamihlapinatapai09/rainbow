<template>
	<div class="back-container activity-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div class="back-content">
				<el-button class="add-btn" @click="$router.push('/add-activity')">+活动</el-button>
				<!-- tabs切换 -->
				<el-tabs v-model="activeTabName" @tab-click="handlerTab">
					<el-tab-pane label="进行中" name="0"></el-tab-pane>
					<el-tab-pane label="已结束" name="2"></el-tab-pane>
					<el-tab-pane label="已删除" name="1"></el-tab-pane>
				</el-tabs>

				<!-- table列表 -->
				<div class="table-box">
					<el-table :data="activityList" @row-click="handlerVolunteer">
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column prop="addtime" label="发起时间"></el-table-column>
						<el-table-column prop="startDate" label="开始时间"></el-table-column>
						<el-table-column prop="endDate" label="结束时间"></el-table-column>
						<el-table-column prop="teamName" label="团队"></el-table-column>
						<el-table-column prop="maxNum" label="剩余人数"></el-table-column>
						<el-table-column label="操作" align="center" v-if="activeTabName != 1">
							<template slot-scope="scope">
								<span class="operate" @click.stop="handlerOperate(scope,1)">编辑</span>
								<span class="operate" @click.stop="handlerOperate(scope,0)">删除</span>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<!-- 分页 -->
				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="maxPage"
				    @current-change="handlerPage"
				    :current-page.sync="currentPage">
				</el-pagination>
			</div>
		</container-component>
		
		<el-dialog title="删除"
			:visible.sync="deleteDialogVisible">
			<div>是否删除该活动？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxDelete">确 定</el-button>
			    <el-button class="cancel" @click="deleteDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>

		<el-dialog title="志愿者名单"
			:visible.sync="volDialogVisible">

			<div class="content">
				<el-table :data="volunteerList" border style="width: 100%">
				    <el-table-column prop="name" label="姓名"></el-table-column>
				    <el-table-column prop="mobile" label="手机号"></el-table-column>
				</el-table>

				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="volMaxPage"
				    @current-change="handlerVolPage"
				    :current-page.sync="volCurrentPage">
				</el-pagination>
			</div>
			
			<span slot="footer" class="dialog-footer">
				<el-button @click="volDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import ContainerComponent from '../layout/Container.vue';

export default{
	created(){
		const t = this;
		// 获取活动列表
		t.ajaxGetActivity();
	},
	data(){
		return {
			activeSideBar:'activity',
			activeTabName:'0',
			currentPage:1,
			maxPage:10,
			pageParam:{
				page:1,
				num:6,
				status:0  // 1删除 0进行 2结束
			},
			activityList:[
				{
					id:0,
					name:'爱心敬老院志愿活动',
					addtime:'2017-10-25',
					startDate:'2017-10-25',
					endDate:'2017-10-25',
					teamName:'蓝天志愿者',
					maxNum:12
				}
			],
			deleteDialogVisible:false,
			activeRow:'',
			volDialogVisible:false,
			volCurrentPage:1,
			volMaxPage:10,
			volPageParam:{
				page:1,
				num:6,
				id:''
			},
			volunteerList:[
				{'name':'wang','mobile':'13166966115'}
			]
		}
	},
	methods:{
		// ---------- ajax 请求 -----------
		// 获取活动列表
		ajaxGetActivity(){
			const t = this;
			t.$http({
				method:'post',
				url:'/activity/ajax-get-activity-list-by-type',
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return	t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.maxPage = result.data.num * result.data.maxPage;
				t.activityList = result.data.list;
			})
		},
		// 删除
		ajaxDelete(){
			const t = this;
			t.$http({
				method:'post',
				url:'/activity/ajax-edit-activity',
				data:{
					id:t.activeRow.id,
					status:1
				}
			}).then(res => {
				const result = res.data;
				
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.deleteDialogVisible = true;
				// 重新获取数据
				t.ajaxGetActivity();
				return t.$message({
					message:result.message,
					type:'success'
				})
			})
		},
		// 获取志愿者列表
		ajaxGetVolunteer(){
			const t = this;
			t.$http({
				method:'post',
				url:'/activity/ajax-get-activity-volunteers',
				data:t.volPageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.volMaxPage = result.data.maxPage * result.data.num;
				t.volunteerList = result.data.list;
				t.volDialogVisible = true;
			})
		},
		// ---------- 其他操作 -------------
		
		//切换tabs
		handlerTab(){
			const t = this;
			t.currentPage = 1;
			t.pageParam['page'] = 1;
			t.pageParam['status'] = Number(t.activeTabName);
			t.ajaxGetActivity();
		},
		// 换页
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetActivity();
		},
		// 删除/编辑操作
		handlerOperate(scope,type){
			const t = this;
			if(type == 0){
				t.deleteDialogVisible = true;
				t.activeRow  = scope.row;
			}else if(type == 1){
				t.$router.push('/add-activity?activityId='+scope.row.id);
			}
		},
		// 志愿者列表
		handlerVolunteer(row){
			const t = this;
			t.volPageParam['page'] = 1;
			t.volPageParam['id'] = row.id;
			t.ajaxGetVolunteer();
			t.volDialogVisible = true;
		},
		// 志愿者列表换页
		handlerVolPage(page){
			const t = this;
			t.volPageParam['page'] = page;
			t.ajaxGetVolunteer();
		},
	},
	components:{
		'container-component':ContainerComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
</style>