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
			</div>
		</container-component>
	</div>
</template>
<script>
import ContainerComponent from '../layout/Container.vue';
export default{
	data(){
		return{
			activeSideBar:"new",
			activeTabName:"0",
			newList:[{

			}]
		}
	},
	components:{
		'container-component':ContainerComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
</style>