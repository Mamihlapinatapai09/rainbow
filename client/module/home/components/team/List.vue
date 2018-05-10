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
					@click="$router.push('/team-list-item?teamId='+item.id)"
					>
					<div class="team-pic"></div>
					<p class="team-name">{{item.name}}</p>
				</li>
			</ul>

			<!-- 分页 -->
			<el-pagination
			    layout="prev, pager, next"
			    :page-size="10"
			    :total="listLen"
			    @current-change="handlerPage"
			    :current-page.sync="currentPage">
			</el-pagination>
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
			teamList:[],
			currentPage:1
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
				let newPageLen = 10*result.data.maxPage;
				if(t.listLen != newPageLen){
					t.listLen = newPageLen;
				}
				t.teamList = result.data.list;
			})
		},
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
.team-list-content{
	min-height:100%;
	display:flex;
	flex-direction:column;
	.team-list-box {
		position:relative;
		flex:1;
		margin:0 auto 80px auto;
		width:1100px;
		min-height: 390px;
		.team-list{
			width:1200px;
			margin:0 auto;
			.list-item{
				display:inline-block;
				cursor:pointer;
				.team-pic{
					margin:0 10px;
					width:200px;
					height:200px;
					border:1px solid $lineBorderColor;
				}
				.team-name{
					padding-left: 20px;
					height:45px;
					line-height:45px;
				}
				&:hover{
					.team-pic{
						border:1px solid $frontBtnActive;
					}
					.team-name{
						color:$fontBtnBg;
					}
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
}	
</style>