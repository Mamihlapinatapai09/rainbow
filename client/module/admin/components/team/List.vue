<template>
	<div class="list-box">
		<full-screen :title="!teamId ? '添加团队' : '编辑团队'">
			<div slot="content">
				<el-form :model="teamTemplate" :rules="teamRules" label-position="left" label-width="120px" ref="teamList">
					<el-form-item label="团队名称" prop="name">
						<el-input v-model="teamTemplate.name" placeholder="请输入团队名称"></el-input>
					</el-form-item>
					<el-form-item label="团队leader" prop="leaderId">
						<el-select v-model="teamTemplate.leaderId">
							<el-option v-for="item in volunteersList"
								:label="item.name"
								:key="item.id"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item label="团队照片" prop="image">
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->
					<el-form-item label="团队介绍" prop="note">
						<div id="editor"></div>
					</el-form-item>
				</el-form>
			</div>

			<div slot="footer">
				<el-button @click="handlerUpdateList">确认</el-button>
				<el-button class="cancel" @click="$router.push('/team')">取消</el-button>
			</div>
		</full-screen>
	</div>
</template>
<script>
import wangEditor from 'wangeditor'
import FullScreen from '../layout/FullScreen.vue';

export default{
	created(){
		const t = this;
		t.teamId = t.$route.query.teamId;

		if(t.teamId !== undefined){
			t.ajaxGetTeam();
		}

		t.ajaxGetVolunteers();

	},
	mounted(){
		const t = this;
		t.createEditor();
	},
	data(){
		return {
			teamId:'',
			teamTemplate:{
				teamId:'',
				leaderId:'',
				name:'',
				pic:'',
				note:''
			},
			volunteersList:[],
			editor:''
		}
	},
	methods:{
		//---------   ajax请求 ----------
		//获取志愿者团队
		ajaxGetTeam(){
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

				t.teamTemplate = result.data;
			})
		},
		// 获取志愿者列表
		ajaxGetVolunteers(){
			const t = this;
			t.$http({
				method:'post',
				url:'/volunteer/ajax-get-all-volunteer-ids'
			}).then(res => {
				const result = res.data;
				if(result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.volunteersList = result.data;
			})
		},
		// 添加/编辑操作
		ajaxUpdateTeam(url){
			const t = this;
			t.$http({
				method:'post',
				url:url,
				data:t.teamTemplate
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.$router.push('/team');
			})
		},
		//---------  页面操作 -----------
		//初始化富文本编辑器
		createEditor(){
			const t = this;
			t.editor = new wangEditor('#editor');
			t.editor.customConfig.uploadImgShowBase64 = true; //图片base64编码
			t.editor.create();
		},
		handlerUpdateList(){
			const t = this;
			t.$refs['teamList'].validate(valid => {
				if(valid){
					t.teamTemplate['note'] = t.editor.txt.html();

					let url= !t.teamId ? '/team/ajax-add-team' : '/team/ajax-update-team';

					t.ajaxUpdateTeam(url);
				}else{
					return false;
				}
			})
		}
	},
	computed:{
		teamRules(){
			return {
				name:[
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
				],
				leaderId:[
					{ required: true, message: '请选择团队leader', trigger: 'change' },
				]
			}
		}
	},
	components:{
		'full-screen':FullScreen
	}
}	
</script>
<style lang="scss">
	
</style>