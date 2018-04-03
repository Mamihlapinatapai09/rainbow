<template>
	<div class="team-content">
		<p class="title">团队展示</p>
		<ul class="img-list">
			<li class="team-item"><img src="../../../../src/assets/img/01.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/02.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/03.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/04.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/05.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/06.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/01.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/02.jpg" width="200" height="186" /></li>
			<li class="team-item"><img src="../../../../src/assets/img/03.jpg" width="200" height="186" /></li>
			<li class="team-item more"><img></img>查看更多</li>
		</ul>
	</div>
</template>
<script>
import Vue from 'vue'
import $ from 'jQuery'
export default{
	mounted(){
		Vue.nextTick(function(){
			$('li.team-item').mouseover(function(e) {
		        $(this).siblings().stop().fadeTo(500,0.4);
		    });

			$('li.team-item').mouseout(function(e) {
		        $(this).siblings().stop().fadeTo(500,1);
		    });
		})
	},
	data(){
		return {
			imgList:['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg']
		}
	},
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