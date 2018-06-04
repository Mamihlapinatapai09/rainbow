<template>
	<div class="team-content">
		<p class="title">团队展示</p>
		<ul class="img-list">
			<li class="team-item" v-for="item in teamList">
				<img :src="item.pic" width="200" height="186" alt="" @click="$router.push('/team-list-item?teamId='+item.id)">
			</li>
			<li class="team-item more" @click="$router.push('/team-list')"><img></img>查看更多</li>
		</ul>
	</div>
</template>
<script>
import Vue from 'vue'
import $ from 'jQuery'
export default{
	created(){ 
		const t = this;
		t.ajaxGetTeam();
	},
	mounted(){
		
	},
	data(){
		return {
			teamList:[]
		}
	},
	methods:{
		ajaxGetTeam(){
			const t = this;
			t.$http({
				method:'post',
				url:'/team/ajax-get-team-page-list',
				data:{
					page:1,
					num:9,
					status:0  // 1 已删除 0已添加
				}
			}).then(res => {
				const result = res.data;
				if(!result.status) return;
				t.teamList = result.data.list;
				t.teamList.forEach(item => {
					item.pic = "http://"+item.pic;
				})

				Vue.nextTick(function(){
					$('li.team-item').mouseover(function(e) {
				        $(this).siblings().stop().fadeTo(500,0.4);
				    });

					$('li.team-item').mouseout(function(e) {
				        $(this).siblings().stop().fadeTo(500,1);
				    });
				})
			})
		}
	}
}
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';

.team-content{
	display: flex;
	.title{
		padding: 32px 30px 0;
		writing-mode: tb-rl;
		letter-spacing:8px;
		color:$frontMainColor;
		font-size:25px;
	}
	.img-list{
		width:980px;
		border:1px solid #ccc;
		margin:10px auto;
		overflow:hidden;
		padding:10px 0 0 10px;
		background:$frontViceColor;
		border-radius: 10px;
		li{
			width:185px;
			height:185px;
			float:left;
			margin-right:10px;
			margin-bottom:10px;
			cursor:pointer;
			overflow:hidden;
			border-radius:10px;
			&.more{
				background:#fff;
				line-height: 185px;
				text-align: center;
				font-size:18px;
			}
		}
	}
}	
</style>