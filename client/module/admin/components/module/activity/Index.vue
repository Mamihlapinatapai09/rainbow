<template>
	<div class="activity-container">
		<div class="activity-content">
			<el-button class="add-btn" @click="handleAdd">+活动</el-button>
			<el-tabs v-model="activeTabName" @tab-click="changeTab">
			    <el-tab-pane label="进行中" name="0">
			    	<el-table :data="activitiesList" border style="width: 100%">
			    		<template v-for="item in activitiesTabs">
			    			<el-table-column :prop="item.prop" :label="item.label" ></el-table-column>
			    		</template>
			    		<el-table-column width="70" label="编辑" >
			    			<template slot-scope="scope">
		    			        <el-button
		    			          class="operate"
		    			          size="mini"
		    			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
		    			    </template>
			    		</el-table-column>
			    		<el-table-column width="70" label="删除" >
			    			<template slot-scope="scope">
		    			        <el-button
		    			          class="operate"
		    			          size="mini"
		    			          type="danger"
		    			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		    			    </template>
			    		</el-table-column>
			    	</el-table>
			    </el-tab-pane>
			    <el-tab-pane label="已结束" name="1">
			    	<!-- <el-table :data="tableData" border style="width: 100%">
			    		<template v-for="item in activityTabs">
			    			<el-table-column :prop="item.prop" :label="item.label" ></el-table-column>
			    		</template>
			    		<el-table-column width="60" label="编辑" ></el-table-column>
			    		<el-table-column width="60" label="删除" ></el-table-column>
			    	</el-table> -->
			    </el-tab-pane>
			    <el-tab-pane label="已删除" name="2">已删除</el-tab-pane>
			</el-tabs>
		</div>

		<el-pagination
		    layout="prev, pager, next"
		    :page-size="6"
		    :total="maxPage"
		    @current-change="changePage"
		    :current-page="currentPage">
		</el-pagination>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';

export default{
	created(){
		const t = this;
		// 获取活动列表
		// t.$store,dispatch('getActivitiesData')
	},
	data(){
		return {
			activeTabName:'0',
			activitiesTabs:[
				{prop:'name',label:'名称'},
				{prop:'addtime',label:'发起时间'},
				{prop:'startDate',label:'开始时间'},
				{prop:'endDate',label:'结束时间'},
				{prop:'teamName',label:'团队'},
				{prop:'maxNum',label:'剩余人数'},
				{prop:'status',label:'状态'},
			],
		}
	},
	methods:{
		changePage(pageActive){
			const t = this;
			t.$store.commit('updatePage',pageActive);
			t.$store.dispatch('getActivitiesData',t.activeTabName);
		},
		changeTab(name){
			const t = this;
			t.page = 1;
			t.$store.commit('updatePage',1);
			t.$store.dispatch('getActivitiesData',t.activeTabName);
		},
		handleAdd(){
			const t = this;
			t.$store.commit('updateActivityId','');
			t.$router.push(`/add-activity`);
		},
		handleEdit(index,row){
			const t = this;
			t.$store.commit('updateActivityId',row.id);
			t.$router.push(`/add-activity`);
		}
	},
	computed:{
		...mapGetters({
			'maxPage':'getMaxPage',
			'currentPage':'getPage',
			'activitiesList':'getActivitiesList',
			'activityId':'getActivityId'
		})
	}
}
</script>
<style lang="scss">
@import '../../../../../src/assets/scss/baseParams.scss';
.activity-container{
	padding:20px;
	height:100%;
	.activity-content{
		position:relative;
		height:82%;
		.add-btn{
			position:absolute;
			right: 1px;
			top:-7px;
			z-index: 1004;
			&.el-button {
				padding:10px 16px;
			}
		}
	}

	.el-table {
		th.is-leaf{
			color:$textMainHeaderColor;
			font-weight: normal !important;
		}
		.operate {
			padding:6px 8px;
		}
	}

	.el-pagination{
		text-align: right;
		margin-top: 15px;
	}
}

</style>