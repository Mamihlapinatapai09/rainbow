<template>
	<div class="header-container">
		<div class="header-box">
			<div class="header-title">
				<p class="title">共青团志愿者系统</p>
				<div class="operation">
					<el-button class="btn login">登陆</el-button>
					<el-button class="btn reg">注册</el-button>
				</div>
			</div>
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
		border-bottom:5px solid $MainColor;
		.header-title{
			margin:0 auto;
			max-width: 1100px;
			height:85px;
			.title{
				float: left;;
				height:85px;
				line-height:85px;
				font-size:27px;
			}
			.operation{
				position: relative;
				top:35px;
				padding-right:30px;
				float:right;
				.btn{
					width:60px;
					height:30px;
					line-height:30px;
					&.login{
						border:1px solid $btnBg;
						color:$btnBg;
						background:#fff;
						&:hover{
							color:#fff;
							background:$btnBg;
							box-shadow:0 5px 8px 0 rgba(0,199,179,0.3);
						}
					}
					&.reg:hover{
						box-shadow:0 5px 8px 0 rgba(0,199,179,0.3);
					}
				}
			}
		}
	}
	
}
</style>