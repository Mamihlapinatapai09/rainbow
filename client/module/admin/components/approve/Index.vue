<template>
	<div class="approve-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div class="approve-content">
				<!-- tabs切换 -->
				<el-tabs v-model="activeTabName" @click="handlerTab">
					<el-tab-pane label="活动审批" name="0"></el-tab-pane>
					<el-tab-pane label="志愿者审批" name="1"></el-tab-pane>
				</el-tabs>

				<!-- table列表 -->
				<div class="table-box">
					<el-table :data="approveList">
						<el-table-column prop="name" label="姓名"></el-table-column>
						<el-table-column prop="leader" label="手机号"></el-table-column>
						<el-table-column prop="addtime" label="审批内容"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<span class="operate" @click="handlerOperate.stop(scope,1)">通过</span>
								<span class="operate" @click="handlerOperate.stop(scope,2)">驳回</span>
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
				    :current-page="currentPage">
				</el-pagination>
			</div>
		</container-component>
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
			approveLen:10,
			currentPage:1,
			pageParam:{
				page:1,
				num:6,
				type:1  // 0：活动审批 ，1：志愿者团队审批
			},
			approveList:[]
		}
	},
	methods:{
		// ------- ajax请求 -------
		ajaxGetApprove(){

		},
		// ------- 其他操作 -------
		// 切换tab
		handlerTab(){
			const t = this;
		},
		// 换页
		handlerPage(){
			const t = this;
		}
	},
	components:{
		'container-component':ContainerComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.approve-container{
	height:100%;
	.approve-content{
		padding:20px;
		position:relative;
		height:82%;

		.table-box{
			height:83%;
			cursor: pointer;
			.operate{
				padding:10px;
				&:hover{
					color:$btnActive;
				}
			}
		}
	}

	.el-pagination{
		text-align: right;
		margin-top: 15px;
	}
}
</style>