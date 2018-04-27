<template>
	<div class="activity-content">
		<p class="title"><span class="line line-left"></span><span class="text">志愿活动</span><span class="line line-right"></span></p>
		<div class="activity-list">
			<ul class="activity-ul">
				<li class="activity-item" 
					v-for="item in activityList"
					@click="$router.push('/activity-list-item?activityId='+item.id)">
					<span class="time">{{item.startDate}}</span>
					<span class="name">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="activity-footer" @click="$router.push('/activity-list')">查看更多 ></div>
	</div>
</template>
<script>
import {DateFormater} from 'assets/js/commonFunc.js'
export default{
	created(){
		const t = this;
		t.ajaxGetList();
	},
	data(){
		return {
			activityList:[
				{id:'123',name:'活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1活动1',time:'10-02'},
				{id:'123',name:'活动2活动2活动2活动2活动2活动2',time:'10-02'},
				{id:'123',name:'活动3活动3活动3',time:'10-02'},
				{id:'123',name:'活动4活动3活动3活动3活动3',time:'10-02'},
				{id:'123',name:'活动5活动3活动3活动3活动3活动3活动3',time:'10-02'},
				{id:'123',name:'活动6活动3活动3活动3活动3',time:'10-02'},
				{id:'123',name:'活动7',time:'10-02'},
				{id:'123',name:'活动8活动3活动3',time:'10-02'},
				{id:'123',name:'活动9活动3',time:'10-02'},
				{id:'123',name:'活动10活动3活动3',time:'10-02'},
				{id:'123',name:'活动7活动3活动3活动3活动3',time:'10-02'},
			],
		}
	},
	methods:{
		// ------- ajax请求 ---------
		// 数据列表获取
		ajaxGetList(){
			const t = this;
			t.$http({
				method:'post',
				url:'/activity/ajax-get-activity-list-by-type',
				data:{
					page:1,
					num:14,
					status:0 // 1删除 0进行 2结束	
				}
			}).then(res => {
				const result = res.data;
				if(!result.status){
					return t.$message({
						message:result.message,
						type:'error'
					})
				}

				t.activityList = result.data.list;
				//时间转换
				let timeArr = ['startDate'];
				t.activityList.forEach(item => {
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
.activity-content{
	width:700px;
	height:286px;
	overflow:hidden;
	.title {
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
			flex:1;
			margin-left:10px;
		}
		.line-left{
			width:20px;
			margin-right: 10px;
		}
	}
	.activity-ul{
		overflow:hidden;
		height:210px;
		.activity-item{
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
	.activity-footer{
		text-align: right;
		cursor:pointer;
		font-size:12px;
		&:hover{
			color:$frontMainColor;
		}
	}
}
</style>