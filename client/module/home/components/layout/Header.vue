<template>
	<div class="header-container">
		<div class="header-box">
			<div class="operation" >
				<span v-if="!userStatus" @click="handlerLogin">登陆</span>
				<div class="user" v-else>
					<span>欢迎您！{{userMes.name}}</span>
					<span @click="handlerExit">退出</span>
				</div>
				<span @click="handlerRegister">注册</span>
			</div>

			<img class="header-bg" src="../../../../src/assets/img/bg.jpg" alt="">
		</div>

		<!-- 登陆弹窗 -->
		<el-dialog title="登陆"
			:visible.sync="loginDialogVisible">
			<el-form ref="loginForm" :model="loginList" :rules="loginRules" label-position="right" label-width="80px">
				<el-form-item label="手机号：" prop="mobile">
					<el-input v-model="loginList.mobile" placeholder="请输入正确的手机号"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="pwd">
					<el-input type="password" v-model="loginList.pwd" placeholder="请输入密码"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxLogin">登陆</el-button>
			    <el-button class="cancel" @click="handlerCancelLogin">取消</el-button>
			</span>
		</el-dialog>

		<!-- 注册弹窗 -->
		<div class="reg-form">
			<el-dialog title="注册"
				:visible.sync="regDialogVisible">
				<el-form ref="regForm" :model="regList" :rules="regRules" label-position="right" label-width="95px">
					<el-form-item label="姓名：" prop="name">
						<el-input v-model="regList.name" placeholder="用户名不超过8位字符"></el-input>
					</el-form-item>
					<el-form-item label="性别：" prop="sex">
						<el-radio v-model="regList.sex" :label="0">男</el-radio>
						<el-radio v-model="regList.sex" :label="1">女</el-radio>
					</el-form-item>
					<el-form-item label="手机号：" prop="mobile">
						<el-input v-model="regList.mobile" placeholder="请输入正确的手机号"></el-input>
					</el-form-item>
					<el-form-item label="邮箱：" prop="email">
						<el-input v-model="regList.email" placeholder="请输入正确的邮箱"></el-input>
					</el-form-item>
					<el-form-item label="身份证号：" prop="idcode">
						<el-input v-model="regList.idcode" placeholder="请输入正确的身份证号"></el-input>
					</el-form-item>
					<el-form-item label="密码：" prop="pwd">
						<el-input type="password" v-model="regList.pwd" placeholder="密码长度6~8位"></el-input>
					</el-form-item>
					<el-form-item label="密码确认：" prop="checkPwd">
						<el-input type="password" v-model="regList.checkPwd" placeholder="请再次输入密码"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="ajaxReg">注册</el-button>
				    <el-button class="cancel" @click="handlerCancelReg">取 消</el-button>
				</span>
			</el-dialog>
		</div>
		
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
import Verify from 'assets/js/Verify.js';
export default {
	created(){
		const t = this;
		t.$store.commit('updateUser');
		if(!!sessionStorage.getItem('user_message')){
			t.userStatus = true;
		}
	},
	data(){
		return {
			ajaxLoginStatus:true,
			loginDialogVisible:false,
			loginList:{
				mobile:'',
				pwd:''
			},
			regDialogVisible:false,
			regList:{
				name:'',
				sex:0,
				mobile:'',
				email:'',
				idcode:'',
				pwd:'',
				checkPwd:''
			},
			userStatus:false,
		}
	},
	methods:{
		// --------  ajax操作 ----------
		// 登陆
		ajaxLogin(){
			const t = this;
			t.$refs['loginForm'].validate(valid => {
				if(valid){
					t.$store.dispatch('ajaxGetUser',t.loginList).then(res => {
						if(res.status){
							t.loginDialogVisible = false;
							if(!!sessionStorage.getItem('user_message')){
								t.userStatus = true;
							}
						}
					})
				}else{
					return false;
				}
			})
		},
		// 注册
		ajaxReg(){
			const t = this;
			t.$refs['regForm'].validate(valid => {
				if(valid){
					t.$http({
						method:'post',
						url:'/volunteer/ajax-add-volunteer',
						data:t.regList
					}).then(res => {
						const result = res.data;
						if(!result.status){
							return t.$message({
								message:result.message,
								type:'error'
							})
						}
						// 用户信息session存储
						t.regDialogVisible = false;
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
		// 取消注册
		handlerCancelReg(){
			const t = this;
			t.regDialogVisible = false;
			t.$refs['regForm'].resetFields();
		},
		// 用户退出
		handlerExit(){
			const t = this;
			sessionStorage.setItem('user_message','');
			t.userStatus = false;
		},
		validatePassword(rule, value, callback){
			const t = this;
			if(!t.ajaxLoginStatus){
				return callback(new Error('用户名或密码错误，请重新输入'));
			}
			callback();
		},
		validateCheckPwd(rule, value, callback){
			const t = this;
			if (value !== '' && value !== this.regList.checkPwd) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
		}
	},
	computed:{
		...mapGetters({
			'userMes': 'getUser'
		}),
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
		},
		regRules(){
			const t = this;
			return {
				name:[
					{required:true,message:'不能为空',trigger:'blur'},
					{min:1,max:8,message:'长度在1~8位',trigger:'blur'}
				],
				mobile:[
					{required:true,message:'不能为空',trigger: 'blur'},
					{validator:Verify.validateMobile,trigger: 'blur'}
				],
				email:[
					{validator:Verify.validateEmail,trigger: 'blur'}
				],
				idcode:[
					{validator:Verify.validateIdCode,trigger: 'blur'}
				],
				pwd:[
					{required:true,message:'不能为空',trigger:'blur'},
					{min:6,max:8,message:'长度在1~8位',trigger:'blur'}
				],
				checkPwd:[
					{required:true,message:'不能为空',trigger:'blur'},
					{validator:t.validateCheckPwd,trigger: 'blur'}
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
			.user{
				display:inline;
			}
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
	.reg-form .el-dialog{
		margin-top:2vh !important;
	}	
}
</style>