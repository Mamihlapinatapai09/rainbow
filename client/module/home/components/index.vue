<template>
<div>
	<h1>{{mes}}</h1>
	<h2>{{test}}</h2>
	<el-button>默认按钮</el-button>
</div>
</template>
<script>
import {mapGetters} from 'vuex'

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
	}
}
</script>
<style>
	
</style>