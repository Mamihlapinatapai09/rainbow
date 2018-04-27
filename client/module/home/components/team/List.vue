<template>
	<div class="team-list-content">
		<header-component></header-component>
		<div class="team-list-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>志愿团队</el-breadcrumb-item>
			</el-breadcrumb>

			<ul class="team-list">
				<li class="list-item" 
					v-for="item in teamList"
					>
					<span>{{item.name}}</span>
					<span class="time">{{item.startDate}} ~ {{item.endDate}}</span>
					<span class="num">招募人数：{{item.maxNum}}</span>
					<span class="team">{{item.teamName}}</span>
				</li>
			</ul>
		</div>
		<footer-component></footer-component>
	</div>
</template>
<script>
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default{
	created(){
		const t = this;
		t.ajaxGetList();
	},
	data(){
		return {
			pageParam:{
				page:1,
				num:10,
				status:0
			},
			teamList:[]
		}
	},
	methods:{
		ajaxGetList(){
			const t = this;
			t.$http({
				method:'post',
				url:'/team/ajax-get-team-page-list',
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					// return t.$message({
					// 	message:res
					// })
				}
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
.team-list-content{
	min-height:100%;
	display:flex;
	flex-direction:column;
	.team-list-box {
		flex:1;
	}
}	
</style>