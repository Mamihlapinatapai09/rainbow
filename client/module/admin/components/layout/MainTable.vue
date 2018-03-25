<template>
	<div class="main-table-box">
    	<el-table :data="dataList" border style="width: 100%" @row-click="emitHandleRow">
    		<template v-for="item in dataTabs">
    			<el-table-column :prop="item.prop" :label="item.label" ></el-table-column>
    		</template>
    		<el-table-column width="70" label="编辑" v-if="isOpearte">
    			<template slot-scope="scope">
			        <el-button
			          class="operate"
			          size="mini"
			          @click.stop="emitHandleEdit(scope.$index, scope.row)">编辑</el-button>
			    </template>
    		</el-table-column>
    		<el-table-column width="70" label="删除" v-if="isOpearte">
    			<template slot-scope="scope">
			        <el-button
			          class="operate"
			          size="mini"
			          type="danger"
			          @click.stop="emitHandleDelete(scope.$index, scope.row)">删除</el-button>
			    </template>
    		</el-table-column>
    	</el-table>
	</div>
</template>
<script>


export default{
	created(){
		const t = this;
	},
	props:{
		dataTabs:{
			type:Array,
			default(){
				return [];
			}
		},
		dataList:{
			type:Array,
			default(){
				return [];
			}
		},
		isOpearte:{
			type:Boolean,
			default(){
				return true;
			}
		}
	},
	methods:{
		emitHandleEdit(index,row){
			const t = this;
			t.$emit('handleEdit',row);
		},
		emitHandleDelete(index,row){
			const t = this;
			t.$emit('handleDelete',row);
		},
		emitHandleRow(row, event, column){
			const t = this;
			t.$emit('handleRow',row);
		}
	}
}
</script>
<style lang="scss">
	
</style>