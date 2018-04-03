<template>
	<div class="recommend-content">
		<div class="recommend-box">
		    <el-carousel height="280px" arrow="never" :interval="4000">
		      <el-carousel-item  v-for="titleItem in carouselTitle" :key="titleItem.key">
		      	<p class="title"><span>{{titleItem.title}}</span></p>
		      	<div v-if="titleItem.key==1">
		      		<a class="list-item" v-for="listItem in carouselList1" :href="listItem.url" target="_blank">{{listItem.title}}</a>
		      	</div>
		      	<div v-else-if="titleItem.key==2">
		      		<a class="list-item" v-for="listItem in carouselList2" :href="listItem.url" target="_blank">{{listItem.title}}</a>
		      	</div>
		      </el-carousel-item>
		    </el-carousel>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			carouselTitle:[
				{title:'团中央网站推荐',key:1},
				{title:'地方网站推荐',key:2}
			],
			carouselList1:[
				{title:'中国青年网',url:'http://www.youth.cn/'},
				{title:'中国青年公益网',url:'http://gongyi.youth.cn/'},
				{title:'青旅在线',url:'http://www.cytsonline.com/'}
			],
			carouselList2:[
				{title:'北京',url:'http://www.bjyouth.gov.cn/'},
				{title:'天津',url:'http://www.youthtj.org.cn/'},
				{title:'河北',url:'http://www.54heb.com/'}
			]
		}
	}
}	
</script>
<style lang="scss">
@import '../../../../src/assets/scss/baseParams.scss';

.recommend-content{
	width:300px;
	.recommend-box{
		padding:0 15px;
		border:1px solid $frontMainColor;
		box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12);
		border-radius:10px;
		.title{
			position:relative;
			margin-bottom:20px;
			font-size:18px;
			line-height:2;
			color: $frontMainColor;
			text-align:center;
			:after{
				content:"";
				position:absolute;
				bottom: -5px;
				left:50%;
				margin-left: -20px;
				width:40px;
				height:2px;
				background:$frontMainColor;
			}
		}
		.list-item{
			margin-right:8px;
			margin-bottom: 8px;
			display:inline-block;
			padding:5px 8px;
			border-radius:10px;
			background:$frontViceColor;
			color:#fff;
		}
		.el-carousel__button{
			background-color:$frontMainColor;
		}
	}
}
</style>