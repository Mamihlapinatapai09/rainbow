<template>
	<div class="container-box">
		<div class="con-activity"><slot name="activity"></slot></div>
		<div class="con-person"><slot name="person"></slot></div>
		<div class="banner"><a target="_blank" href="http://qncx.cyol.com/"><img src="../../../../src/assets/img/banner01.jpg" alt=""></a></div>
		<div class="con-recommend"><slot name="recommend"></slot></div>
		<div class="con-new"><slot name="new"></slot></div>
		<div class="banner"><a target="_blank" href="http://sunshine.zgzyz.org.cn/account/login"><img src="../../../../src/assets/img/banner02.jpg" alt=""></a></div>
		<div class="con-team"><slot name="team"></slot></div>
	</div>
</template>
<script>
	
</script>
<style lang="scss">
.container-box{
	position:relative;
	margin: 50px auto 0 auto;
	width:1100px;
	overflow: hidden;
	.con-activity{
		float: left;
		overflow:hidden;
	}
	.con-person{
		float:right;
		margin-top:35px;
		margin-right: 50px;
		overflow: hidden;
	}
	.banner{
		float: left;
		margin:40px 0;
		clear:both;
		width:100%;
		text-align:center;
		img{
			width:100%;
		}
	}
	.con-recommend{
		margin-top:40px;
		float:left;
		clear: left;
	}
	.con-new{
		margin-top:30px;
		float:right;
	}
	.con-team{
		float:left;
	}
}	
</style>