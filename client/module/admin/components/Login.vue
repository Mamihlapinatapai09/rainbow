<template>
	<div class="login-container">
		<div class="login-box">
			<div class="login-header">共青团志愿管理后台</div>
			<div class="login-body">
				<el-form label-position="left" label-width="80px">
					<el-form-item label="用户名">
						<el-input placeholder="请输入管理员用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input placeholder="请输入管理员密码"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="login-footer">
				<el-button @click="handleLogin">登陆</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import vue from 'vue';

export default{
	data(){
		return {
			mes:'admin component'
		}
	},
	methods:{
		handleLogin(){
			const t = this;
			t.$router.push('/activity');
		}
	}
}
</script>
<style lang="scss">
@import '../../../src/assets/scss/baseParams.scss';
	.login-container{
		display: flex;
		align-items:center;
		justify-content:center;
		height: 100%;
		background:linear-gradient(to bottom,$MainColor,$ViceColor,$LeastColor) no-repeat;
		.login-box{
			width: 447px;
			height:300px;
			background:#fff;
			border-radius: 15px;
			color:$textMainHeaderColor;
			.login-header{
				box-sizing:border-box;
				margin:0 30px;
				height:50px;
				line-height: 50px;
				text-align: center;
				font-size: 18px;
				border-bottom:1px solid $lineBorderColor;
			}
			.login-body{
				box-sizing:border-box;
				padding:36px 55px 17px;
			}
			.login-footer{
				box-sizing:border-box;
				padding:0 55px;
				text-align:center;
				.el-button{
					width:100%;
					border-radius:7px;
				}
			}
		}
	}
</style>