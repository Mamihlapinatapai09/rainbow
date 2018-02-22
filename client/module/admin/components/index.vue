<template>
	<div>
		<h1>{{mes}}</h1>
		<h2>{{aaa}}</h2>
		<el-button>默认按钮</el-button>
	</div>
</template>
<script>
import vue from 'vue';
import {mapGetters} from 'vuex';

export default{
	created(){
		const t = this;
		t.$store.dispatch('getTest');

		// 测试http 请求
		this.$http({
		  url:'/ajax/login',
		  method:'post'
		}).then((res)=>{
		  console.log(res)
		})
	},
	data(){
		return {
			mes:'admin component'
		}
	},
	computed:{
		...mapGetters({
			'aaa':'getTest'
		})
	}
}
</script>
<style>
	
</style>