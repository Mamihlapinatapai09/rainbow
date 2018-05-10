<template>
	<div class="team-page-content">
		<header-component></header-component>
		<div class="team-page-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/team-list' }">志愿团队</el-breadcrumb-item>
			  <el-breadcrumb-item>{{teamItem.name}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="name">{{teamItem.name}}</div>
			<div class="leader">团队领导：{{teamItem.leaderName}}</div>
			<div class="time">成立时间：{{teamItem.addtime}}</div>
			<div class="desc" v-html="teamItem.note"></div>
		</div>
		<footer-component></footer-component>
	</div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFunc.js'
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default{
	created(){
		const t = this;
		t.teamId = t.$route.query.teamId;
		t.ajaxGetItem();
	},
	data(){
		return {
			teamId:'',
			teamItem:''
		}
	},
	methods:{
		ajaxGetItem(){
			const t = this;
			t.$http({
				method:'post',
				url:'/team/ajax-get-team',
				data:{
					id:t.teamId
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.teamItem = result.data;
				//时间格式转换
				t.teamItem['addtime'] = DateFormater(new Date(t.teamItem['addtime']),'yyyy-MM-dd');
			})
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
.team-page-content{
	min-height:100%;
	display: flex;
	flex-direction:column;
	.team-page-box{
		flex:1;
		margin:20px auto 0 auto;
		width:1100px;
		text-align: center;
		.name{
			margin-bottom: 30px;
			font-size: 22px;
			line-height: 2;
			color:$textMainHeaderColor;
		}
		.author{
			font-size:16px;
			color:#555;
		}
		.desc{
			margin-top:30px;
		}
	}
}	
</style>