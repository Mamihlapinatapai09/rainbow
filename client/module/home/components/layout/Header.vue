<template>
	<div class="header-container">
		<div class="header-box">
			<div class="operation">
				<span>登陆</span>
				<span>注册</span>
			</div>
			<img class="header-bg" src="../../../../src/assets/img/bg.jpg" alt="">
		</div>
	</div>
</template>
<script>
	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.header-container{
	width:100%;
	.header-box{
		box-shadow:0 3px 6px 0 rgba(40,51,67,0.06);
		.operation{
			padding-right: 100px;
			position:relative;
			z-index: 2;
			line-height:34px;
			background:#707070;
			color:#fff;
			text-align:right;
			span{
				display:inline-block;
				margin-right:10px;
			}
		}
		.header-bg{
			position:relative;
			z-index: 1;
			margin-top:-34px;
		}
	}	
}
</style>