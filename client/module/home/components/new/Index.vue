<template>
	<div class="new-content">
		<p class="title"><span class="line line-left"></span><span class="text">新闻快报</span><span class="line line-right"></span></p>

		<div class="new-list">
			<ul class="new-ul">
				<li class="new-item" v-for="item in newList"
					@click="$router.push('/new-list-item?newId='+item.id)">
					<span class="time">{{item.addtime}}</span>
					<span class="name"><span class="top" v-if="item.top === 1">[顶]</span>&nbsp;{{item.title}}</span>
				</li>
			</ul>
		</div>

		<div class="new-footer" @click="$router.push('/new-list')">查看更多 ></div>
	</div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFunc.js'
export default{
	created(){
		const t = this;
		t.ajaxGetNew();
	},
	data(){
		return {
			newList:[]
		}
	},
	methods:{
		ajaxGetNew(){
			const t = this;
			t.$http({
				method:'post',
				url:'/news/ajax-get-news-list',
				data:{
					page:1,
					num:14,
					status:0
				}
			}).then(res => {
				const result = res.data;
				if(!result.status) return;

				t.newList = result.data.list;

				//时间格式转换
				let timeArr = ['addtime'];
				t.newList.forEach(item => {
					timeArr.forEach(timeItem => {
						item[timeItem] = DateFormater(new Date(item[timeItem]),'MM-dd');
					})
				})
			})
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
			.top{
				color:#f56c6c;
			}
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
	.new-footer{
		text-align: right;
		cursor:pointer;
		font-size:12px;
		&:hover{
			color:$frontMainColor;
		}
	}
}	
</style>