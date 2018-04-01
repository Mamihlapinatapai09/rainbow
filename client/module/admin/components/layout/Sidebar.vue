<template>
	<div class="sidebar-container">
		<ul class="sidebar-list">
			<li 
				v-for="item in sidebarList"
				class="sidebar-item" 
				:class="{'active':item.path===active}"
				@click="handleModule(item.path)"
			>{{item.name}}</li>
		</ul>
	</div>
</template>
<script>
export default{
	created(){
		const t = this;
		t.active = t.activeLi;
	},
	props:{
		'activeLi':{
			type:String,
			default: () => {
			    return 'activity'
			}
		}
	},
	data(){
		return {
			active:'activity',
			sidebarList:[
				{name:'活动管理',path:'activity'},
				{name:'志愿者管理',path:'volunteer'},
				{name:'志愿者团队管理',path:'team'},
				{name:'审批',path:'approve'},
				{name:'公告',path:'notice'},
			]
		}
	},
	methods:{
		handleModule(path){
			const t = this;
			t.active = path;
			t.$router.push(`/${path}`);
		}
	}
}	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.sidebar-container{
	height:100%;
	width: 120px;
	.sidebar-list{
		margin-top:25px;
		.sidebar-item{
			box-sizing:border-box;
			margin:0 10px 7px;
			height:36px;
			line-height:36px;
			text-align:center;
			color:#fff;
			opacity: 0.6;
			cursor: pointer;
			&:hover{
				opacity:1;
				border-bottom:1px solid #fff;
			}
			&.active{
				opacity:1;
				border-bottom:1px solid #fff;
			}
		}
	}
}
</style>