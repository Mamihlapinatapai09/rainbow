<template>
	<div class="person-content">
		<div class="person-header">
			<div class="avatar">未</div>
		</div>
		<div class="person-body">
			<span class="first" @click="$router.push('/person-list?type=0')">我的活动<br>（0）</span>
			<span @click="$router.push('/person-list?type=1')">我的团队<br>（0）</span>
		</div>
	</div>
</template>
<script>
	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.person-content{
	width:274px;
	height:180px;
	border:1px solid $frontViceColor;
	border-radius:10px;
	overflow:hidden;
	.person-header{
		position:relative;
		height:70px;
		background:$frontViceColor;
		.avatar{
			position:absolute;
			left:50%;
			bottom:-35px;
			margin-left:-35px;
			width:70px;
			height:70px;
			line-height:70px;
			text-align:center;
			background:#F5F7FA;
			border-radius:50%;
			color:$frontMainColor;
			font-size:24px;
			border-bottom:1px solid $frontViceColor;
		}
	}
	.person-body{
		display:flex;
		margin:45px 30px 0;
		span{
			display: inline-block;
			flex:1;
			padding:3px 0;
			text-align:center;
			font-size:15px;
			line-height:20px;
			cursor:pointer;
			&.first{
				border-right:1px solid $lineBorderColor;
			}
			&:hover{
				color:$frontMainColor;
			}
		}
	}
}
</style>