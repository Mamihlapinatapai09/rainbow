<template>
	<div class="activity-page-content">
		<header-component></header-component>
		<div class="activity-page-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/activity-list' }">志愿活动</el-breadcrumb-item>
			  <el-breadcrumb-item>{{activityItem.name}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="title">{{activityItem.name}}</div>
			<div class="other">
				<span>承办团队：{{activityItem.team}}</span>
				<span>招募人数：{{activityItem.maxNum}}人</span>
			</div>
			<div class="time">
				<span>开始时间：{{activityItem.startDate}}</span>
				<span>结束时间：{{activityItem.endDate}}</span>
			</div>
			<div class="desc" v-html="activityItem.note"></div>
			<div class="join">
				<el-button @click="joinDialogVisible = true">参与活动</el-button>
			</div>
		</div>
		<footer-component></footer-component>


		<!-- 参与活动弹窗 -->
		<el-dialog title="参与活动"
			:visible.sync="joinDialogVisible">
			<div>
				<p>是否参与此活动？</p>
				<p>选择参与活动后，请等待后台管理员的审批，审批结果在我的活动中查看。</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxJoin">确 定</el-button>
			    <el-button class="cancel" @click="joinDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default{
	created(){
		const t = this;
		t.activityId = t.$route.query.activityId;
		t.ajaxGetItem();
	},
	data(){
		return {
			activityId:'',
			activityItem:{},
			joinDialogVisible:false
		}
	},
	methods:{
		// --------- ajax请求 ---------
		// 获取单个活动信息
		ajaxGetItem(){
			const t = this;
			t.$http({
				method:'post',
				url:'/activity/ajax-get-activity',
				data:{
					id:t.activityId
				}
			}).then(res => {
				const result = res.data;
				if(!result.data){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.activityItem = result.data;
			})
		},
		// 参与活动
		ajaxJoin(){
			const t = this;
			// t.$http({
			// 	method:'post',
			// 	url:'/apply/ajax-apply-join-activity',
			// 	data:{
			// 		activityId:t.activityId,
			// 		volunteerId:3
			// 	}
			// }).then(res => {
			// })
			t.$http({
				method:'post',
				url:'/apply/ajax-apply-join-team',
				data:{
					teamId:3,
					volunteerId:3
				}
			}).then(res => {
				// const t = this;
				// if(!result.status){
				// 	return t.$message({
				// 		message:result.message,
				// 		type:'error'
				// 	})
				// }
				// t.$message({
				// 	message:result.message,
				// 	type:'success'
				// })
			})
		},
		//--------- 页面操作 ----------
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent
	}
}	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.activity-page-content{
	min-height:100%;
	display: flex;
	flex-direction:column;
	.activity-page-box{
		flex:1;
		margin:20px auto 0 auto;
		width:1100px;
		text-align: center;
		.title{
			margin-bottom: 30px;
			font-size: 22px;
			line-height: 2;
			color:$textMainHeaderColor;
		}
		.other{
			font-size:16px;
			color:#555;
			span{
				margin-right: 10px;
			}
		}
		.time{
			margin-top:5px;
			font-size:12px;
			color:#c6c6c6;
			span{
				margin-right: 10px;
			}
		}
		.desc{
			margin-top:30px;
		}
		.join{
			margin-top:40px;
			.el-button{
				background:$frontMainColor;
				border-color:$frontMainColor;
			}
		}
	}
	.el-dialog .el-dialog__footer .dialog-footer button{
		background:$frontMainColor;
		border-color:$frontMainColor;
		&:hover{
			background:$frontMainColor;
			border-color:$frontMainColor;
			opacity: 0.8;
		}
	}
}	
</style>