<template>
	<div class="header-container">
		<div class="header-title">共青团志愿者管理后台系统
			<span class="exit" @click="handlerExit">退出</span>
		</div>
	</div>
</template>
<script>
export default{
	methods:{
		handlerExit(){
			const t = this;
			sessionStorage.setItem('admin_message','');
			window.location.href = '/admin';
		}
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.header-container{
	width:100%;
	.header-title{
		padding:0 50px;
		box-sizing:border-box;
		height:50px;
		line-height:50px;
		color:#fff;
		font-size:18px;
		.exit{
			padding-right: 30px;
			float: right;
			font-size:14px;
			cursor: pointer;
		}
	}
}
</style>