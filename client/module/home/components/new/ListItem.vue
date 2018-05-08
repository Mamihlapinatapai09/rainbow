<template>
	<div class="new-page-content">
		<header-component></header-component>
		<div class="new-page-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/new-list' }">新闻快报</el-breadcrumb-item>
			  <el-breadcrumb-item>{{newItem.title}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="title">{{newItem.title}}</div>
			<div class="author">作者：{{newItem.author}}</div>
			<div class="time">发布时间：{{newItem.addtime}}</div>
			<div class="desc" v-html="newItem.content"></div>
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
		t.newId = t.$route.query.newId;
		t.ajaxGetItem();
	},
	data(){
		return {
			newId:'',
			newItem:''
		}
	},
	methods:{
		ajaxGetItem(){
			const t = this;
			t.$http({
				method:'post',
				url:'/news/ajax-news-detail',
				data:{
					id:t.newId
				}
			}).then(res => {
				const result = res.data;
				if(!result.status) return;

				t.newItem = result.data;

				//时间格式转换
				let timeArr = ['addtime'];
				t.newItem['addtime'] = DateFormater(new Date(t.newItem['addtime']),'yyyy-MM-dd');		
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
.new-page-content{
	min-height:100%;
	display: flex;
	flex-direction:column;
	.new-page-box{
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
		.author{
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
}
</style>