<template>
	<div class="activity-list-content">
		<header-component></header-component>
		<div class="activity-list-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>志愿活动</el-breadcrumb-item>
			</el-breadcrumb>

			<ul class="activity-list">
				<li class="list-item" 
					v-for="item in activityList"
					@click="$router.push('/activity-list-item?activityId='+item.id)">
					<span>{{item.name}}</span>
					<span class="time">{{item.startDate}} ~ {{item.endDate}}</span>
					<span class="num">招募人数：{{item.maxNum}}</span>
					<span class="team">{{item.teamName}}</span>
				</li>
			</ul>
			<!-- 分页 -->
			<el-pagination
			    layout="prev, pager, next"
			    :page-size="6"
			    :total="listLen"
			    @current-change="handlerPage"
			    :current-page.sync="currentPage">
			</el-pagination>
		</div>
		<footer-component></footer-component>
	</div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFunc.js'
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default {
	created(){
		const t = this;
		t.ajaxGetList();
	},
	data(){
		return {
			currentPage:1,
			listLen:10,
			pageParam:{
				page:1,
				num:10,
				status:0
			},
			activityList:[]
		}
	},
	methods:{
		// -------- ajax请求 ----------
		ajaxGetList(){
			const t = this;
			t.$http({
				method:'post',
				url:'/activity/ajax-get-activity-list-by-type',
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.listLen = result.data.maxPage * result.data.num;
				t.activityList = result.data.list;
				// 日期转换
				let timeArr = ['startDate','endDate'];
				t.activityList.forEach(item => {
					timeArr.forEach(timeItem => {
						item[timeItem] = DateFormater(new Date(item[timeItem]),'yyyy-MM-dd');
					})
				})
			})
		},
		// -------- 其他操作 -----------
		// 换页
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetList();
		}
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent
	}
}	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.activity-list-content{
	min-height:100%;
	display:flex;
	flex-direction:column;
	.activity-list-box{
		flex:1;
		position: relative;
		margin:0 auto 80px auto;
		width:1100px;
		min-height: 390px;
		.activity-list{
			.list-item{
				padding: 0 20px;
				border-bottom:1px solid #eee;
				height: 45px;
				line-height: 45px;
				font-size: 14px;
				cursor: pointer;
				&:hover{
					background: #f7f7f7;
					color:$frontMainColor;
				}
				.team{
					float:right;
					margin-right:180px;
				}
				.num{
					float: right;
					margin-right: 180px;
				}
				.time{
					float: right;
				}
			}
		}
		.el-pagination{
			position:absolute;
			bottom: -50px;
			right:0;
			text-align: right;
			margin-top: 15px;
		}
	}
	.el-breadcrumb{
		border-bottom:1px solid #eee;
	}
}	
</style>