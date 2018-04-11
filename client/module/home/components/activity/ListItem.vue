<template>
	<div class="activity-page-content">
		<header-component></header-component>
		<div class="activity-page-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/activity-list' }">志愿活动</el-breadcrumb-item>
			  <el-breadcrumb-item>{{activityData.name}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="title">{{activityData.name}}</div>
			<div class="other">
				<span>承办团队：{{activityData.team}}</span>
				<span>招募人数：{{activityData.num}}人</span>
			</div>
			<div class="time">
				<span>开始时间：{{activityData.startTime}}</span>
				<span>结束时间：{{activityData.endTime}}</span>
			</div>
			<div class="desc" v-html="activityData.description"></div>
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
	},
	data(){
		return {
			activityId:'',
			activityData:{
				"id":0,
				"name":"爱心敬老院活动", // 活动名称
				"startTime":"2017-12-10", // 开始时间
				"endTime":"2017-5-12", // 结束时间
				"description":`<div><p>这是活动的内容这是活动的内容这是活动的内容这是活动的内容这是活动的内容这是活动的内容</p><p>这是活动的内容这是活动的内容这是活动的内容这是活动的内容这是活动的内容这是活动的内容</p></div>` ,   // 描述
				"team":"小小向日葵团队" ,   // 团队id
				"num":0 ,   // 人数
				"status":0 ,   // 0 进行中  1已结束  2 已删除
			},
			joinDialogVisible:false
		}
	},
	methods:{
		// --------- ajax请求 ---------
		// 参与活动
		ajaxJoin(){
			const t = this;
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