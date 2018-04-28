<template>
	<div class="list-box">
		<full-screen :title="!newId ? '添加新闻' : '编辑新闻'">
			<div slot="content">
				<el-form :model="newTemplate" :rules="newRules" label-position="left" label-width="120px" ref="newList">
					<el-form-item label="标题" prop="title">
						<el-input v-model="newTemplate.title" placeholder="请输入新闻标题"></el-input>
					</el-form-item>
					<el-form-item label="作者" prop="author">
						<el-input v-model="newTemplate.author" placeholder="请输入新闻作者"></el-input>
					</el-form-item>

					<el-form-item label="内容" prop="content">
						<div id="editor">
							<div v-html="newTemplate.content"></div>
						</div>
					</el-form-item>
				</el-form>
			</div>

			<div slot="footer">
				<el-button @click="handlerUpdateList">确认</el-button>
				<el-button class="cancel" @click="$router.push('/new')">取消</el-button>
			</div>
		</full-screen>
	</div></template>
<script>
import wangEditor from 'wangeditor'
import FullScreen from '../layout/FullScreen.vue';
export default {
	mounted(){
		const t = this;
		t.newId = t.$route.query.newId;

		if(t.newId !== undefined){
			t.ajaxGetNew();
		}

		t.createEditor();
	},
	data(){
		return {
			newId:'',
			newTemplate:{
				title:'',
				author:'',
				content:''
			},
			editor:''
		}
	},
	methods:{
		// ----- ajax请求 -------
		ajaxGetNew(){
			const t = this;
			t.$http({
				method:'post',
				url:'/news/ajax-news-detail',
				data:{
					id:t.newId
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return;
				}
				t.newTemplate = result.data;
			})
		},
		ajaxUpdateNew(url){
			const t = this;
			t.$http({
				method:'post',
				url:url,
				data:t.newTemplate
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.$router.push('/new');
			})
		},
		// ----- 页面操作 -------
		//初始化富文本编辑器
		createEditor(){
			const t = this;
			t.editor = new wangEditor('#editor');
			t.editor.customConfig.uploadImgShowBase64 = true; //图片base64编码
			t.editor.create();
		},
		handlerUpdateList(){
			const t = this;
			t.$refs['newList'].validate(valid => {
				if(valid){
					t.newTemplate['content'] = t.editor.txt.html();

					let url= !t.newId ? '/news/ajax-add-news' : '/news/ajax-update-news';

					t.ajaxUpdateNew(url);
				}else{
					return false;
				}
			})
		}
	},
	computed:{
		newRules(){
			const t = this;
			return {
				title:[
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
				],
				author:[
					{ required: true, message: '不能为空', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
				]
			}
		}
	},
	components:{
		'full-screen':FullScreen
	}
}
</script>
<style>
	
</style>