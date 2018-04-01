<template>
	<div class="team-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div class="team-content">
				<el-button class="add-btn" @click="handlerAdd">+团队</el-button>
	
				<!-- tabs切换 -->
				<el-tabs v-model="activeTabName" @click="handlerTab">
					<el-tab-pane label="已添加" name="1"></el-tab-pane>
					<el-tab-pane label="已删除" name="0"></el-tab-pane>
				</el-tabs>

				<!-- table列表 -->
				<div class="table-box">
					<el-table :data="teamList">
						<el-table-column prop="name" label="团队名称"></el-table-column>
						<el-table-column prop="leader" label="团队leader"></el-table-column>
						<el-table-column prop="addtime" label="成立时间"></el-table-column>
						<el-table-column v-if="activeTabName === '1'" label="操作" align="center">
							<template slot-scope="scope">
								<span class="operate" @click="handlerEdit(scope)">编辑</span>
								<span class="operate" @click="handlerDelete(scope)">删除</span>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<!-- 分页 -->
				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="teamLen"
				    @current-change="handlerPage"
				    :current-page="currentPage">
				</el-pagination>
			</div>
		</container-component>

		<el-dialog title="删除"
			:visible.sync="deleteDialogVisible">
			<div>团队删除将无法恢复，是否删除该志愿者团队？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxDelete">确 定</el-button>
			    <el-button class="cancel" @click="deleteDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import ContainerComponent from '../layout/Container.vue';
export default{
	created(){
		const t = this;
		t.ajaxGetTeam();
	},
	data(){
		return{
			activeTabName:"1",
			activeSideBar:"team",
			deleteDialogVisible:false,
			teamLen:10,
			currentPage:1,
			pageParam:{
				page:1,
				num:6,
				type:1  // 0 已删除 1已添加
			},
			activeTeam:{},
			teamList:[
				{
					"id":0,
					"name":"蓝天志愿者团队", //团队名称
					"leader":"张三", //团队leader
					"addtime":"1522476502772", //团队成立时间
					"images":"",  //团队照片
					"status":1    // 0 已删除 1已添加
				}
			]
		}
	},
	methods:{
		//----------  ajax请求 -----------
		// 获取团队列表
		ajaxGetTeam(){
			const t = this;

			t.$http({
				method:'post',
				url:'/team/ajax-get-all-team',
				body:t.pageParam
			}).then(res => {
				const result = res.body;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				//数据保存
				t.teamLen=result.data.num*result.data.maxPage;
				t.teamList=result.data.teams;
			})
		},
		// 删除志愿者团队
		ajaxDelete(){
			const t = this;
			t.activeTeam['status']=0;
			t.$http({
				method:'post',
				url:'/team/ajax-update-team',
				body:t.activeTeam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})

					t.ajaxGetTeam();
					t.deleteDialogVisible = false;
				}
			})
		},
		//----------  页面操作 ------------
		// 换页
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetTeam();
		},
		// 切换tab
		handlerTab(){
			const t = this;
			t.currentPage = 1;
			t.pageParam['type'] = Number(t.activeTabName);
			t.pageParam['page'] = 1;
			t.ajaxGetTeam();
		},
		//删除当前志愿活动
		handlerDelete(scope){
			const t = this;
			t.activeTeam = scope.row;
			t.deleteDialogVisible = true;
		},
		handlerEdit(scope){
			const t = this;
			let teamId = scope.row.id;
			t.$router.push(`/team-list?teamId=${teamId}`);
		},
		// 添加团队
		handlerAdd(){
			const t = this;
			t.$router.push('/team-list?teamId=');	
		}
	},
	components:{
		'container-component':ContainerComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.team-container{
	height:100%;
	.team-content{
		padding:20px;
		position:relative;
		height:82%;
		.add-btn{
			position:absolute;
			right: 20px;
			top:13px;
			z-index: 1004;
			&.el-button {
				padding:10px 16px;
			}
		}

		.table-box{
			height:83%;
			.operate{
				padding:10px;
				cursor: pointer;
				&:hover{
					color:$btnActive;
				}
			}
		}

		.el-pagination{
			text-align: right;
			margin-top: 15px;
		}
	}
}

</style>