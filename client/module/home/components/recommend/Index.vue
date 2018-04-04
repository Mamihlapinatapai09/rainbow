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
				{title:'青旅在线',url:'http://www.cytsonline.com/'},
				{title:'中国少年先锋队',url:'http://zgsxd.k618.cn/'},
				{title:'中青在线',url:'http://www.cyol.net/'},
				{title:'中少在线',url:'http://www.ccppg.com.cn/'},
				{title:'中央团校',url:'http://www.cyu.edu.cn/'},
				{title:'未来网',url:'http://www.k618.cn/'},
				{title:'中国国际青年交流会',url:'http://www.21youth.cn/'},
			],
			carouselList2:[
				{title:'北京',url:'http://www.bjyouth.gov.cn/'},
				{title:'天津',url:'http://www.youthtj.org.cn/'},
				{title:'山西',url:'http://www.54heb.com/'},
				{title:'内蒙古',url:'http://www.nmyouth.org.cn/'},
				{title:'辽宁',url:'http://www.lngqt.com/'},
				{title:'吉林',url:'http://www.jl54.org/jlgqt/webmain'},
				{title:'黑龙江',url:'http://www.hljgqt.gov.cn/'},
				{title:'上海',url:'http://www.shyouth.net/html/defaultsite/portal/index/index.htm'},
				{title:'江苏',url:'http://www.jiangsugqt.org/'},
				{title:'浙江',url:'http://zj.qnzs.youth.cn/wsgqt/index'},
				{title:'安徽',url:'http://www.ahyouth.org.cn/base/'},
				{title:'福建',url:'http://www.fjcyl.org/index.jsp'},
				{title:'江西',url:'http://www.jxyouth.org.cn/'},
				{title:'山东',url:'http://www.sdyl.gov.cn/webs/index.aspx'},
				{title:'河南',url:'http://www.hnyouth.org.cn/'},
				{title:'湖北',url:'http://www.hbgqt.org.cn/'},
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
		text-align:center;
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
			margin-bottom: 12px;
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