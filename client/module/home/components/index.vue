<template>
	<div class="container">
		<header-component></header-component>
		<container-component>
			<div slot="activity"><activity-component></activity-component></div>
			<div slot="person"><person-component></person-component></div>
			<div slot="new"><new-component></new-component></div>
			<div slot="team"><team-component></team-component></div>
		</container-component>
	</div>
</template>
<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import $ from 'jQuery'

import HeaderComponent from './layout/Header.vue'
import ContainerComponent from './layout/Container.vue'


import ActivityComponent from './activity/Index.vue'
import PersonComponent from './person/Index.vue'
import TeamComponent from './team/Index.vue'
import NewComponent from './new/Index.vue'

export default {
	data(){
		return {
			mes: 'this is home data'
		}
	},
	methods:{
	},
	computed:{
		...mapGetters({
			'test':'getTest'
		})
	},
	components:{
		'container-component':ContainerComponent,
		'header-component':HeaderComponent,
		'activity-component':ActivityComponent,
		'person-component':PersonComponent,
		'team-component':TeamComponent,
		'new-component':NewComponent
	}
}
</script>
<style lang="scss">
</style>