<template>
	<div class="team-list-content">
		<header-component></header-component>
		<div class="team-list-box">
			
		</div>
		<footer-component></footer-component>
	</div>
</template>
<script>
import HeaderComponent from '../layout/Header.vue'
import FooterComponent from '../layout/Footer.vue'
export default{
	created(){
		const t = this;
	},
	data(){
		return {
			pageParam:{
				page:1,
				num:10,
				type:1
			},
			teamList:[]
		}
	},
	methods:{
		ajaxGetList(){
			const t = this;
			t.$http({
				method:'post',
				url:'/team/ajax-get-all-team',
				body:t.pageParam
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:res
					})
				}
			})
		}
	},
	components:{
		'header-component':HeaderComponent,
		'footer-component':FooterComponent
	}
}	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';
.team-list-content{
	min-height:100%;
	display:flex;
	flex-direction:column;
	.team-list-box {
		flex:1;
	}
}	
</style>