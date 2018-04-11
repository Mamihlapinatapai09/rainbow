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
				<li>1</li>
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
		t.activeTabName = t.$route.query.type.toString();
	},
	data(){
		return {
			activeTabName:"0"
		}
	},
	methods:{
		handlerTab(){
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
.person-list-content{
	min-height:100%;
	display:flex;
	flex-direction:column;
	.person-list-box{
		flex:1;
		margin: 0 auto;
		width:1100px;
	}
}	
</style>