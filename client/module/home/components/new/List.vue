<template>
	<div class="new-list-content">
		<header-component></header-component>
		<div class="new-list-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>新闻快报</el-breadcrumb-item>
			</el-breadcrumb>

			<ul class="new-list">
				<li class="list-item" 
					v-for="item in newList"
					@click="$router.push('/new-list-item?newId='+item.id)">
					<span class="title">
						<span class="top" v-if="item.top === 1">[顶置]</span>
						<span>{{item.title}}</span>
					</span>
					<span class="time">{{item.addtime}}</span>
					<span class="author">{{item.author}}</span>
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
import {DateFormater} from 'assets/js/commonFunc.js'
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'

export default {
	created(){
		const t = this;
		t.ajaxGetNew();
	},
	data(){
		return {
			listLen:10,
			currentPage:1,
			pageParam:{
				page:1,
				num:10,
				status:0
			},
			newList:[]
		}
	},
	methods:{
		ajaxGetNew(){
			const t = this;
			t.$http({
				method:'post',
				url:'/news/ajax-get-news-list',
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status) return;

				t.newList = result.data.list;

				let newPageLen = 10*result.data.maxPage;
				if(t.listLen != newPageLen){
					t.listLen = newPageLen;
				}

				//时间格式转换
				let timeArr = ['addtime'];
				t.newList.forEach(item => {
					timeArr.forEach(timeItem => {
						item[timeItem] = DateFormater(new Date(item[timeItem]),'yyyy-MM-dd');
					})
				})
			})
		},
		handlerPage(page){
			const t = this;
			console.log(page);
			t.pageParam['page'] = page;
			t.ajaxGetNew();
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
				span{
					vertical-align:middle;
				}
				.top{
					color:#f56c6c;
				}
				.title{
					display:inline-block;
					width:60%;
					white-space:nowrap;
					text-overflow:ellipsis;
					overflow:hidden;
				}
				.time{
					float:right;
				}
				.author{
					margin-left:15px;
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