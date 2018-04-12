<template>
	<div class="back-container approve-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div class="back-content approve-content">
				<!-- tabs切换 -->
				<el-tabs v-model="activeTabName" @tab-click="handlerTab">
					<el-tab-pane label="活动审批" name="0"></el-tab-pane>
					<el-tab-pane label="志愿者审批" name="1"></el-tab-pane>
				</el-tabs>

				<!-- table列表 -->
				<div class="table-box">
					<el-table :data="approveList">
						<el-table-column prop="volName" label="姓名"></el-table-column>
						<el-table-column prop="mobile" label="手机号"></el-table-column>
						<el-table-column prop="activityName" label="审批内容"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<span class="operate" @click.stop="handlerOperate(scope,1)">通过</span>
								<span class="operate" @click.stop="handlerOperate(scope,2)">驳回</span>
							</template>
						</el-table-column>
					</el-table>
				</div>

				<!-- 分页 -->
				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="approveLen"
				    @current-change="handlerPage"
				    :current-page.sync="currentPage">
				</el-pagination>
			</div>
		</container-component>

		<!-- 通过&驳回弹窗 -->
		<el-dialog	:title="activeStatus === 1 ? '通过审批' : '驳回审批'"
			:visible.sync="operateDialogVisible">
			<div>
				<p v-if="activeStatus === 1">是否要通过此审批？</p>
				<p v-else>是否要驳回此审批？</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxUpdateStatus">确定</el-button>
				<el-button @click="operateDialogVisible = false">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import ContainerComponent from '../layout/Container.vue';
export default{
	created(){
		const t = this;
		t.ajaxGetApprove();
	},
	data(){
		return{
			activeSideBar:"approve",
			activeTabName:"0",
			activeRow:'',
			activeStatus:0,
			approveLen:10,
			currentPage:1,
			pageParam:{
				page:1,
				num:6,
				status:0  // (0 申请中 1 通过  2 拒绝)
			},
			approveList:[
				{
					"id":0, // 审批id
					"volName":"张三", // 志愿者姓名
					"mobile":"13166966115", // 志愿者手机号
					"activityId":"123",  //  申请活动id
					"activityName":"蓝天志愿者活动", // 申请活动名称
					"status":1    // 0 未审批 1 通过 2 驳回
				}
			],
			operateDialogVisible:false
		}
	},
	methods:{
		// ------- ajax请求 -------
		ajaxGetApprove(){
			const t = this;
			let url = t.activeTabName === '0' ? '/apply/ajax-get-acticity-apply' :'/apply/ajax-get-team-apply'
			t.$http({
				method:'post',
				url:url,
				body:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status) {
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.approveLen = result.data.maxPage * result.data.num;
				t.approveList = result.data.list;
			})
		},
		ajaxUpdateStatus(){
			const t = this;
			let url = t.activeTabName === '0'? '/apply/ajax-operate-team-apply' :'/apply/ajax-operate-acticity-apply'
			t.$http({
				method:'post',
				url:url,
				body:{
					id:t.activeRow.activityId,
					status:t.activeStatus
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				
				t.operateDialogVisible = false;
				t.ajaxGetApprove();
			})
		},
		// ------- 其他操作 -------
		// 切换tab
		handlerTab(){
			const t = this;
			t.currentPage = 1;
			t.pageParam['page'] = 1;
			t.ajaxGetApprove();
		},
		// 换页
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetApprove();
		},
		// 通过&驳回
		handlerOperate(scope,status){
			const t  = this;
			t.activeRow = scope.row;
			t.activeStatus = status;
			t.operateDialogVisible = true;
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