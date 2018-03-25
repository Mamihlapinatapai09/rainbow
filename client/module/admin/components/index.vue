<template>
	<div class="container">
		<header-component></header-component>
		<div class="main-box">
			<sidebar-component :activeComponent="activeComponent"></sidebar-component>
			<div class="test">
				<activity-component v-if="activeComponent === 'activity'"></activity-component>
				<approve-component v-else-if="activeComponent === 'approve'"></approve-component>
				<notice-component v-else-if="activeComponent === 'notice'"></notice-component>
				<team-component v-else-if="activeComponent === 'team'"></team-component>
				<volunteer-component v-else-if="activeComponent === 'volunteer'"></volunteer-component>
			</div>
		</div>
		<footer-component></footer-component>
	</div>
</template>
<script>
import vue from 'vue';

import HeaderComponent from './layout/Header.vue'
import FooterComponent from './layout/Footer.vue'
import SidebarComponent from './layout/Sidebar.vue'

import ActivityComponent from './activity/Index.vue'
import ApproveComponent from './module/Approve.vue'
import NoticeComponent from './module/Notice.vue'
import TeamComponent from './module/Team.vue'
import VolunteerComponent from './module/Volunteer.vue'

export default{
	beforeRouteEnter(to,from,next){
		next(self => {
			self.activeComponent = to.meta.component;
		})
	},
	data(){
		return {
			activeComponent:'activity'
		}
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent,
		'sidebar-component':SidebarComponent,
		'activity-component':ActivityComponent,
		'approve-component':ApproveComponent,
		'notice-component':NoticeComponent,
		'team-component':TeamComponent,
		'volunteer-component':VolunteerComponent
	}
}
</script>
<style lang="scss">
@import '../../../src/assets/scss/baseParams.scss';
	.container{
		display: flex;
		flex-direction:column;
		height: 100%;
		background:linear-gradient(to bottom,$MainColor,$ViceColor,$LeastColor) no-repeat;
		.main-box{
			display:flex;
			flex:1;
			padding:20px 50px;
			.test{
				flex:1;
				background:#fff;
				border-radius:20px;
			}
		}
	}
</style>