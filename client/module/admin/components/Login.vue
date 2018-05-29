<template>
	<div class="login-container">
		<div class="login-box">
			<div class="login-header">共青团志愿管理后台</div>
			<div class="login-body">
				<el-form ref="loginForm" :model="postData" label-position="left" label-width="80px" :rules="loginRules">
					<el-form-item label="用户名" prop="mobile">
						<el-input v-model="postData.mobile" placeholder="请输入管理员手机号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pwd">
						<el-input type="password" v-model="postData.pwd" placeholder="请输入管理员密码"></el-input>
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
import Verify from 'assets/js/Verify.js';

export default{
	data(){
		return {
			postData:{
				mobile:'',
				pwd:''
			}
		}
	},
	methods:{
		handleLogin(){
			const t = this;
			t.$refs['loginForm'].validate(valid => {
				if(valid){
					t.$http({
						method:'post',
						url:'/admin/ajax-login-admin',
						data:t.postData
					}).then(res => {
						const result = res.data;
						if(!result.status){
							t.$message({
								type:'error',
								message:'登陆失败，请重新登录！'
							})
						}
						// 用户信息session存储
						sessionStorage.setItem('admin_message',JSON.stringify(result.data));
						t.$router.push('/activity');
					})
				}
			})
			
		}
	},
	computed:{
		loginRules(){
			const t = this;
			return {
				mobile:[
					{required:true,message:'不能为空',trigger: 'blur'},
					{validator:Verify.validateMobile,trigger: 'blur'}
				],
				pwd:[
					{required:true,message:'不能为空',trigger: 'blur'},
					{min:6,max:8,message:'长度在6~8位',trigger: 'blur'},
					{validator:t.validatePassword,trigger: 'blur'},
				]
			}
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