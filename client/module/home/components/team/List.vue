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
					<div class="team-pic"></div>
					<p class="team-name">{{item.name}}</p>
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
			listLen:0,
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
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.listLen = result.data.maxPage * result.data.num;
				t.teamList = result.data.list;
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
		margin:0 auto 80px auto;
		width:1100px;
		min-height: 390px;
		.team-list{
			margin:0 50px;
			display:flex;
			justify-content:center;
			.list-item{
				.team-pic{
					margin:0 10px;
					width:200px;
					height:200px;
					border:1px solid $lineBorderColor;
				}
			}
		}
		
	}
}	
</style>