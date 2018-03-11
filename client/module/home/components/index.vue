<template>
	<div class="container">
		<header-component></header-component>
		<div class="main">
			<activity-component></activity-component>
			<person-component></person-component>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'

import HeaderComponent from './layout/Header.vue'
import ActivityComponent from './module/Activity.vue'
import PersonComponent from './module/PersonCenter.vue'

export default {
	data(){
		return {
			mes: 'this is home data'
		}
	},
	computed:{
		...mapGetters({
			'test':'getTest'
		})
	},
	components:{
		'header-component':HeaderComponent,
		'activity-component':ActivityComponent,
		'person-component':PersonComponent
	}
}
</script>
<style lang="scss">
	.main{
		position:relative;
		margin: 20px auto 0 auto;
		width:1100px;
		height:1100px;
		overflow: hidden;
		.activity-container{
			position:absolute;
			top:0;
			left:0;
		}
		.person-container{
			position:absolute;
			top:0;
			right:45px;
		}
	}
</style>