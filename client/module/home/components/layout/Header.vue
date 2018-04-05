<template>
	<div class="header-container">
		<div class="header-box">
			<div class="operation">
				<span @click="handlerLogin">登陆</span>
				<span @click="handlerRegister">注册</span>
			</div>
			<img class="header-bg" src="../../../../src/assets/img/bg.jpg" alt="">
		</div>

		<!-- 登陆弹窗 -->
		<el-dialog title="登陆"
			:visible.sync="loginDialogVisible">
			<el-form ref="loginForm" :model="loginList" :rules="loginRules" label-position="left" label-width="80px">
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="loginList.mobile" placeholder="请输入正确的手机号"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="loginList.password" placeholder="请输入密码"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxLogin">确 定</el-button>
			    <el-button class="cancel" @click="handlerCancelLogin">取 消</el-button>
			</span>
		</el-dialog>

		<!-- 注册弹窗 -->
	</div>
</template>
<script>
import Verify from 'assets/js/Verify.js';
export default {
	data(){
		return {
			ajaxLoginStatus:true,
			loginDialogVisible:false,
			loginList:{
				mobile:'',
				password:''
			},
			regDialogVisible:false,
		}
	},
	methods:{
		// --------  ajax操作 ----------
		ajaxLogin(){
			const t = this;
			
			t.$refs['loginForm'].validate(valid => {
				if(valid){
					t.$http({
						method:'post',
						url:'/volunteer/ajax-sign-volunteer',
						body:t.loginList
					}).then(res => {
						const result = result.data;
						t.ajaxLoginStatus  = result.status;
						if(!result.status){
							return t.$refs['loginForm'].validateField('password');
						}
						// 用户信息session存储
					})
				}else{
					return false;
				}
			})

		},
		// --------  其他操作 ----------
		handlerLogin(){
			const t = this;
			t.loginDialogVisible = true;
		},
		// 取消登陆
		handlerCancelLogin(){
			const t = this;
			t.loginDialogVisible = false;
			t.$refs['loginForm'].resetFields();
		},
		handlerRegister(){
			const t = this
			t.regDialogVisible = true;
		},
		validatePassword(rule, value, callback){
			const t = this;
			if(!t.ajaxLoginStatus){
				return callback(new Error('用户名或密码错误，请重新输入'));
			}
			callback();
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
				password:[
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
				cursor: pointer;
			}
		}
		.header-bg{
			position:relative;
			z-index: 1;
			margin-top:-34px;
			width:100%;
		}
	}	
}
</style>