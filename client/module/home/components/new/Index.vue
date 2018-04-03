<template>
	<div class="new-content">
		<p class="title"><span class="line line-left"></span><span class="text">新闻快报</span><span class="line line-right"></span></p>

		<div class="new-list">
			<ul class="new-ul">
				<li class="new-item" v-for="item in newList">
					<span class="time">{{item.time}}</span>
					<span class="name">{{item.name}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			newList:[
				{name:'活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1',time:'10-02'},
				{name:'活动2',time:'10-02'},
				{name:'活动3活动3活动3活动3活动3活动3活动3活动3活动3',time:'10-02'},
				{name:'活动4活动3活动3',time:'10-02'},
				{name:'活动5活动3活动3活动3活动3',time:'10-02'},
				{name:'活动6活动3活动3活动3活动3活动3',time:'10-02'},
				{name:'活动活动3',time:'10-02'},
				{name:'活动8活动3活动3活动3',time:'10-02'},
				{name:'活动9活动3活动3',time:'10-02'},
				{name:'活动10活动3活动3活动3活动3',time:'10-02'},
				{name:'活动活动3',time:'10-02'},
				{name:'活动8活动3活动3活动3',time:'10-02'},
				{name:'活动9活动3活动3',time:'10-02'},
				{name:'活动10活动3活动3活动3活动3',time:'10-02'},
			]
		}
	}
}	
</script>
<style lang="scss"> 
@import '../../../../src/assets/scss/baseParams.scss';
.new-content{
	width:700px;
	.title{
		display:flex;
		align-items:center;
		margin-bottom:20px;
		font-size:18px;
		line-height:40px;
		color:$frontMainColor;
		.text{
			display:inline-block;
		}
		.line{
			height:2px;
			background:$frontMainColor;
		}
		.line-right{
			width:20px;
			margin-left: 10px;
		}
		.line-left{
			flex:1;
			margin-right:10px;
		}
	}
	.new-ul{
		.new-item{
			box-sizing:border-box;
			padding-right:8px;
			width:50%;
			float: left;
			font-size:14px;
			line-height:1.5;
			cursor:pointer;
			.time,.name{
				display:inline-block;
				margin-bottom:2px;
				line-height:2;
				vertical-align: middle;
			}
			.time{
				position:relative;
				padding-right: 8px;
				color:#7b838f;
				&:after{
					content:'';
					position:absolute;
					right:0;
					top:7px;
					width:2px;
					height:16px;
					background:#e3e4e6;
				}
			}
			.name{
				padding-left: 5px;
				width:80%;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				color: #3d4450;
			}
			&:hover{
				.name,.time{
					color:$frontMainColor;
				}
			}
		}
	}
}	
</style>