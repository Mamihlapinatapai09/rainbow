<template>
	<div class="team-container" style="height:100%">
		<container-component :activeSideBar="activeSideBar">
			<div>volunteer</div>
		</container-component>
	</div>
</template>
<script>
import ContainerComponent from '../layout/Container.vue';
export default{
	data(){
		return{
			activeSideBar:"volunteer"
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