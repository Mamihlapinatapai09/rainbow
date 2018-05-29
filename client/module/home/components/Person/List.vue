<template>
	<div class="person-list-content">
		<header-component></header-component>
		<div class="person-list-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>我的</el-breadcrumb-item>
			</el-breadcrumb>

			<!-- tabs切换 -->
			<el-tabs v-model="activeTabName" @tab-click="handlerTab">
				<el-tab-pane label="我的活动" name="0"></el-tab-pane>
				<el-tab-pane label="我的团队" name="1"></el-tab-pane>
			</el-tabs>

			<!-- 列表 -->
			<ul>
				<li class="tab-li" v-for="item in tabList">
					<span v-if="activeTabName == 0">{{item.activityName}}</span>
					<span v-else>{{item.teamName}}</span>
					<span class="status" :class="'status'+item.status">{{item.status === 0 ? '申请中' : item.status === 1 ? '拒绝' : '通过'}}</span>
				</li>
			</ul>

			<!-- 分页 -->
			<!-- 分页 -->
			<el-pagination
				v-if="loading"
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
import {mapGetters} from 'vuex';
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default{
	created(){
		const t = this;
		t.activeTabName = t.$route.query.type.toString();
		t.$store.commit('updateUser');
		t.ajaxGetTeam();
	},
	data(){
		return {
			activeTabName:"0",
			pageParam:{
				page:1,
				num:10,
				id:''
			},
			tabList:[],
			listLen:2,
			currentPage:1,
			loading:false
		}
	},
	methods:{
		handlerTab(){
			const t = this;
			t.pageParam['page'] = 1;
			t.ajaxGetTeam();
		},
		ajaxGetTeam(){
			const t = this;
			let url = t.activeTabName == 0 ? '/apply/ajax-get-my-activity-apply' : '/team/ajax-get-my-team';

			t.pageParam['id'] = t.userMes.id;
			t.loading = false;
			t.$http({
				method:'post',
				url:url,
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status) return;
				let newLen = 10*result.data.maxPage;
				if(t.listLen != newLen){
					t.listLen = newLen;
				}
				t.tabList = result.data.list;
				t.loading = true;
			})
		},
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetTeam();
		}
	},
	computed:{
		...mapGetters({
			'userMes': 'getUser'
		})
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent
	}
}	
</script>
<style lang="scss">
.person-list-content{
	min-height:100%;
	display:flex;
	flex-direction:column;
	.person-list-box{
		flex:1;
		margin: 0 auto;
		width:1100px;
		.tab-li{
			padding:0 20% 0 10px;
			line-height:40px;
			cursor:pointer;
			&:hover{
				background:#f7f7f7;
			}
			.status{
				float: right;
				&.status0{
					color:#ff861d;
				}
				&.status1{
					color:#c4c4c4;
				}
				&.status2{
					color:#2fd3a1;
				}
			}
		}
		.el-pagination{
			margin-top:10px;
			float:right;
		}
	}
}	
</style>