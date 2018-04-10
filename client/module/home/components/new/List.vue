<template>
	<div class="new-list-content">
		<header-component></header-component>
		<div class="new-list-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>新闻快报</el-breadcrumb-item>
			</el-breadcrumb>

			<ul class="new-list">
				<li class="list-item">1</li>
				<li class="list-item">2</li>
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
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'

export default {
	data(){
		return {
			listLen:10,
			currentPage:1
		}
	},
	methods:{
		handlerPage(){
			const t = this;
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
.new-list-content{
	.new-list-box{
		position: relative;
		margin:0 auto 80px auto;
		width:1100px;
		min-height: 390px;
		.new-list{
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