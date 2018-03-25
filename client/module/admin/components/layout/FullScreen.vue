<template>
	<div class="screen-box">
		<div class="screen-header">
			{{title}}<i class="icon icon-close" @click="goBack"></i>
		</div>
		<div class="screen-content"><slot name="content"></slot></div>
		<div class="screen-footer"><slot name="footer"></slot></div>
	</div>
</template>
<script>
export default{
	props:{
		title:{
			type:String,
			default:()=>{
				return '';
			}
		}
	},
	methods:{
		goBack(){
			const t = this;
			t.$router.back();
		}
	}
}
</script>
<style lang="scss">
.screen-box{
	height:100%;
	width:100%;
	.screen-header{
		position:relative;
		width:100%;
		height:75px;
		border-bottom:1px solid #eee;
		text-align:center;
		line-height:72px;
		color: #555;
		font-size:22px;
		.icon-close{
			position:absolute;
			top: 0;
			right:10px;
			width:75px;
			height:75px;
			line-height:75px;
			font-size:30px;
			cursor:pointer;
		}
	}

	.screen-content{
		position:relative;
		margin: 0 auto 65px auto;
		padding:20px;
		width:80%;
	}

	.screen-footer{
		position:fixed;
		bottom:0;
		left:0;
		z-index:9999;
		height:60px;
		width:100%;
		background:#fff;
		text-align:center;
		line-height:60px;
		box-shadow:0 -5px 18px rgba(44,45,48,0.06);
		z-index:105;
	}
}	
</style>