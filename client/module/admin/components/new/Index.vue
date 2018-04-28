<template>
	<div class="back-container team-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div class="back-content">
				<el-button class="add-btn" @click="$router.push('/add-new')">+新闻</el-button>
				<!-- tabs切换 -->
				<el-tabs v-model="activeTabName" @tab-click="handlerTab">
					<el-tab-pane label="已发布" name="0"></el-tab-pane>
					<el-tab-pane label="已删除" name="1"></el-tab-pane>
				</el-tabs>
				<!-- table列表 -->
				<div class="table-box">
					<el-table :data="newList">
						<el-table-column prop="title" label="标题">
							<template slot-scope="scope">
								
								<span class="cancel-top" v-if="scope.row.top === 1">
									<span class="top">[置顶]</span>&nbsp;{{scope.row.title}}
								</span>
								<span v-else>{{scope.row.title}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="author" label="作者"></el-table-column>
						<el-table-column prop="addtime" label="发表时间"></el-table-column>
						<el-table-column label="置顶" align="center" v-if="activeTabName === '0'">
							<template slot-scope="scope">
								<span class="operate" v-if="scope.row.top === 0" @click="ajaxUpdateNew(scope,1)">置顶</span>
								<span class="operate" v-if="scope.row.top === 1" @click="ajaxUpdateNew(scope,0)">取消置顶</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<span class="operate" v-if="activeTabName === '1'" @click="ajaxRemoveNew(scope)">恢复</span>
								<template v-else>
									<span class="operate" @click="handlerEdit(scope)">编辑</span>
									<span class="operate" @click="handlerDelete(scope)">删除</span>
								</template>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- 分页 -->
				<el-pagination
				    layout="prev, pager, next"
				    :page-size="6"
				    :total="pageLen"
				    @current-change="handlerPage"
				    :current-page.sync="currentPage">
				</el-pagination>
			</div>
		</container-component>

		<!-- 删除弹窗 -->
		<el-dialog title="删除"
			:visible.sync="deleteDialogVisible">
			<div>是否删除新闻？删除的新闻可在删除库中恢复。</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="ajaxDelete">确 定</el-button>
			    <el-button class="cancel" @click="deleteDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFunc.js'
import ContainerComponent from '../layout/Container.vue';
export default{
	created(){
		const t = this;
		t.ajaxGetNew();
	},
	data(){
		return{
			activeSideBar:"new",
			activeTabName:"0",
			newList:[],
			pageLen:6,
			currentPage:1,
			pageParam:{
				page:1,
				num:6,
				status:0  // 0 正常 1删除
			},
			activeRow:'',
			deleteDialogVisible:false
		}
	},
	methods:{
		//------ ajax请求 -------
		// 获取新闻列表
		ajaxGetNew(){
			const t = this;
			t.$http({
				method:'post',
				url:'/news/ajax-get-news-list',
				data:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				let newPageLen = 6*result.data.maxPage;
				if(t.pageLen != newPageLen){
					t.pageLen = newPageLen;
				}
				t.newList = result.data.list;

				//时间格式转换
				let timeArr = ['addtime'];
				t.newList.forEach(item => {
					timeArr.forEach(timeItem => {
						item[timeItem] = DateFormater(new Date(item[timeItem]),'yyyy-MM-dd');
					})
				})
			})
		},
		// 顶置/取消顶置新闻
		ajaxUpdateNew(scope,status){
			const t = this;
			t.activeRow = scope.row;
			let url = status === 0 ? '/news/ajax-cancel-top-news' : '/news/ajax-top-news'
			t.$http({
				method:'post',
				url:url,
				data:{
					id:t.activeRow.id
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				// 更新列表
				t.ajaxGetNew();
			})
		},
		// 恢复新闻
		ajaxRemoveNew(scope){
			const t = this;
			t.activeRow = scope.row;
			t.$http({
				method:'post',
				url:'/news/ajax-recover-news',
				data:{
					id:t.activeRow.id
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.ajaxGetNew();
			})
		},
		// 编辑新闻
		handlerEdit(scope){
			const t = this;
			t.activeRow = scope.row;
			t.$router.push(`/add-new?newId=${t.activeRow.id}`);

		},
		// 删除新闻
		ajaxDelete(){
			const t = this;
			t.$http({
				method:'post',
				url:'/news/ajax-delete-news',
				data:{
					id:t.activeRow.id
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}
				t.deleteDialogVisible = false;
				t.ajaxGetNew();
			})
		},
		//------ 页面操作 -------
		// 切换tab
		handlerTab(){
			const t = this;
			t.currentPage = 1;
			t.pageParam['status'] = Number(t.activeTabName);
			t.pageParam['page'] = 1;
			t.ajaxGetNew();
		},
		// 换页
		handlerPage(page){
			const t = this;
			t.pageParam['page'] = page;
			t.ajaxGetNew();
		},
		// 删除新闻
		handlerDelete(scope){
			const t = this;
			t.activeRow = scope.row;
			t.deleteDialogVisible = true;
		}
	},
	components:{
		'container-component':ContainerComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.team-container{
	.top{
		color:#f56c6c;
	}
	.cancel-top{
		color:$textViceColor;
	}
}
</style>