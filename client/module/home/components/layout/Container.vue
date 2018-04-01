<template>
	<div class="container-box">
		<div class="con-activity"><slot name="activity"></slot></div>
		<div class="con-person"><slot name="person"></slot></div>
		<div class="con-new"><slot name="new"></slot></div>
		<div class="con-team"><slot name="team"></slot></div>
	</div>
</template>
<script>
	
</script>
<style lang="scss">
.container-box{
	position:relative;
	margin: 20px auto 0 auto;
	width:1100px;
	height:1100px;
	overflow: hidden;
	.con-activity{
		float: left;
	}
	.con-person{
		float:right;
	}
	.con-new{
		float:right;
	}
	.con-team{
		float:left;
	}
}	
</style>