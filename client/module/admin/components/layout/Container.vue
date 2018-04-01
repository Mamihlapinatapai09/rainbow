<template>
	<div class="container">
		<header-component></header-component>
		<div class="main-box">
			<sidebar-component :activeLi="activeSideBar"></sidebar-component>
			<div class="test">
				<slot></slot>
			</div>
		</div>
		<footer-component></footer-component>
	</div>
</template>
<script>
import HeaderComponent from './Header.vue';
import FooterComponent from './Footer.vue';
import SidebarComponent from './Sidebar.vue';

export default{
	props:['activeSideBar'],
	data(){
		return {
			activeComponent:'team'
		}
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent,
		'sidebar-component':SidebarComponent
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
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