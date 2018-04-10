<template>
	<div class="activity-page-content">
		<header-component></header-component>
		<div class="activity-page-box">
			<div class="title">{{activityData.name}}</div>
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
		t.activityId = t.$route.query.activityId;
	},
	data(){
		return {
			activityId:'',
			activityData:{
				"id":0,
				"name":"爱心敬老院活动", // 活动名称
				"startTime":"", // 开始时间
				"endTime":"", // 结束时间
				"description":"" ,   // 描述
				"team":"" ,   // 团队id
				"num":0 ,   // 人数
				"status":0 ,   // 0 进行中  1已结束  2 已删除
			}
		}
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent
	}
}	
</script>
<style lang="scss">
.activity-page-content{
	min-height:100%;
	display: flex;
	flex-direction:column;
	.activity-page-box{
		flex:1;
		margin:0 auto;
		width:1100px;
	}
}	
</style>