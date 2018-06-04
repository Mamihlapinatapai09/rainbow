<template>
	<div class="team-page-content">
		<header-component></header-component>
		<div class="team-page-box">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/team-list' }">志愿团队</el-breadcrumb-item>
			  <el-breadcrumb-item>{{teamItem.name}}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="name">{{teamItem.name}}</div>
			<div class="leader">团队领导：{{teamItem.leaderName}}</div>
			<div class="time">成立时间：{{teamItem.addtime}}</div>
			<div class="pic">
				<img :src="teamItem.pic" height="250" alt="">
			</div>
			<div class="desc" v-html="teamItem.note"></div>
			<div class="join" v-if="userStatus">
				<el-button @click="joinDialogVisible = true">加入团队</el-button>
			</div>
		</div>
		<footer-component></footer-component>

		<!-- 参与团队弹窗 -->
		<el-dialog title="加入团队"
			:visible.sync="joinDialogVisible">
			<div>
				<p>是否加入此团队？</p>
				<p>选择加入参与团队后，请等待后台管理员的审批，审批结果在我的活动中查看。</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxJoin">确 定</el-button>
			    <el-button class="cancel" @click="joinDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
import {DateFormater} from 'assets/js/commonFunc.js'
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default{
	created(){
		const t = this;
		t.teamId = t.$route.query.teamId;
		t.ajaxGetItem();
	},
	data(){
		return {
			teamId:'',
			teamItem:'',
			joinDialogVisible:false
		}
	},
	methods:{
		ajaxGetItem(){
			const t = this;
			t.$http({
				method:'post',
				url:'/team/ajax-get-team',
				data:{
					id:t.teamId
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.teamItem = result.data;
				t.teamItem['pic'] = 'http://'+t.teamItem['pic'];
				//时间格式转换
				t.teamItem['addtime'] = DateFormater(new Date(t.teamItem['addtime']),'yyyy-MM-dd');
			})
		},
		ajaxJoin(){
			const t = this
			t.$http({
				method:'post',
				url:'/apply/ajax-apply-join-team',
				data:{
					teamId:t.teamId,
					volunteerId:t.userMes.id
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						type:'error',
						message:'参与失败，请重新参与！'
					})
				}
				t.$message({
					type:'success',
					message:'参与成功！'
				})
				t.joinDialogVisible = false;
			})
		}
	},
	computed:{
		...mapGetters({
			'userMes': 'getUser',
			'userStatus':'getUserStatus'
		})
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.team-page-content{
	min-height:100%;
	display: flex;
	flex-direction:column;
	.team-page-box{
		flex:1;
		margin:20px auto 0 auto;
		width:1100px;
		text-align: center;
		.name{
			margin-bottom: 30px;
			font-size: 22px;
			line-height: 2;
			color:$textMainHeaderColor;
		}
		.author{
			font-size:16px;
			color:#555;
		}
		.pic{
			margin-top:15px;
		}
		.desc{
			margin-top:30px;
		}
		.join{
			margin-top:40px;
			.el-button{
				background:$frontMainColor;
				border-color:$frontMainColor;
			}
		}
	}
}	
</style>