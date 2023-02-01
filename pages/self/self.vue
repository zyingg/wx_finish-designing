<template>
	<view class="user">
		<!-- 打印角色 是否为普通管理员 true则是 -->
<!-- 		{{uniIDHasRole( "webadmin")}}
	{{userInfo.register_date}} -->
		<view class="top">
			<view class="group" @click="toUserInfo">
				<view class="userinfo">
					<view class="pic">
						<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url" 
						:src="userInfo.avatar_file.url" 
						mode="aspectFill"></image>
					<!-- 	 hasLogin -->
						<image v-else src="../../static/person.png" mode="aspectFill"></image>
					</view>
					<!-- 如果登陆过则显示昵称 v-if="hasLogin" 否则显示点击登录 -->
					<view class="text" v-if="hasLogin">
						<view class="nickname">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</view>
						
						<view class="year">
							<!-- {{userInfo.register_date}} -->
						<uni-dateformat :date="userInfo.register_date" :threshold="[3600,99*365*24*60*60*1000]">
</uni-dateformat>
							注册</view>
					</view>
					<view class="text" v-else>
						<view class="nickname">点击登录</view>
					</view>
					
				</view>
				
				<view class="more">
					<text class="iconfont icon-a-10-you"></text>
				</view>
			</view>
			
			<!-- 如果存在头像则用头像模糊成为背景图，不然就用默认图模糊成为背景图 -->
			<view class="bg">				
				<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url"
				:src="userInfo.avatar_file.url" 
				mode="aspectFill"></image>
				<image v-else src="../../static/person.png" mode="aspectFill"></image>
			</view>
		</view>
		
		
		
		<view class="main">
			<view class="info">
				<view class="item"><text>{{totalObj.likeNum}}</text>获赞</view>
				<view class="item"><text>{{totalObj.likeNum}}</text>评论</view>
				<view class="item"><text>{{totalObj.artNum}}</text>发文</view>
			</view>
			
			<view class="list">
				<view class="group">					
					<view class="item" @click="myArticle">
						<view class="left"><text class="iconfont icon-a-24-bianji"></text><text class="text">我的长文</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="myLike">
						<view class="left"><text class="iconfont icon-a-106-xihuan"></text><text class="text">我的点赞</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="myComment">
						<view class="left"><text class="iconfont icon-a-21-xiugai"></text><text class="text">评论过的</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="mySecond">
						<view class="left"><text class="iconfont icon-a-21-xiugai"></text><text class="text">我发布的商品</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
				</view>
				
				<view class="group">
					<view class="item">
						<view class="left"><text class="iconfont icon-a-32-wenjian"></text><text class="text">关于</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>		
					<view class="item" @click="goFeedback">
						<view class="left"><text class="iconfont icon-a-5-xinxi"></text><text class="text">意见反馈</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>	
				</view>
				
				<view class="group">
					<view class="item" @click="logout">
						<view class="left"><text class="iconfont icon-a-73-tuichu"></text><text class="text">退出登录</text></view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>					
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db=uniCloud.database()
	export default {
		data() {
			return {
				totalObj:{
					artNum:0,
					likeNum:0
				}
			};
		},
		onLoad(){
			this.getTotal();
			console.log(store.userInfo)
			// console.log(userInfo.register_date)
		 
		},
		computed:{
			userInfo() {
				return store.userInfo
			},
			hasLogin(){
				return store.hasLogin
			}
			
		},
		methods:{
			//完成个人中心页面的数据统计
			async getTotal(){
							if(!this.hasLogin) return;
							let artCount=await db.collection("quanzi_article").where(`user_id == $cloudEnv_uid`).count();
							console.log(artCount);
							this.totalObj.artNum=artCount.result.total;
							
							let likeCount=await db.collection("quanzi_article").where(`user_id == $cloudEnv_uid`)
							.groupBy('user_id')
							.groupField('sum(like_count) as totalScore').get()
							this.totalObj.likeNum=likeCount.result.data[0].totalScore
							
							console.log(this.totalObj);
							
						},
			
			
			
			//意见反馈
			goFeedback(){
				if(this.goLoginPage()) return;	
				uni.navigateTo({
					url:"/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
				})
			},
			//跳转到点赞
			myLike(){
				if(this.goLoginPage()) return;	
				uni.navigateTo({
					url:"/pages/quanzi_like/list"
				})
			},
			
			
			//跳转到我的长文
			myArticle(){
				if(this.goLoginPage()) return;	
				uni.navigateTo({
					url:"/pages/quanzi_article/list"
				})
			},
			
			
			//跳转到我的评论
			myComment(){
				if(this.goLoginPage()) return;	
				uni.navigateTo({
					url:"/pages/quanzi_comment/list"
				})
			},
			
			mySecond(){
				if(this.goLoginPage()) return;	
				uni.navigateTo({
					url:"/pages/secondgoods/list"
				})
			},
			
			
			//编辑个人资料
			toUserInfo(){
				if(this.hasLogin){
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
					})	
				}else{
					let route = this.$mp.page.route;
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withpwd?uniIdRedirectUrl=/'+route
					})
				}
			},//根据登录状态跳转不同地址 uniIdRedirectUrl路由重定向 
			
			
			//退出登录
			logout(){
				//没登陆点击个人中心任何位置都显示未登录 不能进行下一步操作
				if(this.goLoginPage()) return;			
				uni.showModal({
					title:"是否确认退出?",
					success:res=>{
						console.log(res);
						if(res.confirm){
							mutations.logout()
						}
					}
				})
							
			},
			
			
			goLoginPage(){
				if(!this.hasLogin){
					uni.showToast({
						title:"未登录",
						icon:"none"
					})	
					return true;
				}
				return false
			}
		}
	}
</script>

<style lang="scss">
.user{
	
	.top{
		height: 300rpx;
		background: #bbb;
		padding:0 30rpx;
		padding-top:var(--status-bar-height);
		position: relative;
		display: flex;
		align-items: center;
		.group{
			position: relative;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			color:#fff;
			.userinfo{
				display: flex;
				width: 100%;				
				align-items: center;				
				.pic{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					overflow: hidden;
					border:2px solid #fff;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					padding-left:20rpx;
					.nickname{
						font-size: 44rpx;
						font-weight: 600;
					}
					.year{
						font-size: 26rpx;
						opacity: 0.6;
						padding-top:5rpx;
					}
				}
			}
			.more{
				.iconfont{
					font-size: 40rpx;
				}
			}
			
		}
		.bg{
			position: absolute;
			top: 0;
			left:0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				filter: blur(20px);
				transform: scale(2);
				opacity: 0.5;
			}
		}
	}
	.main{
		width: 100%;
		min-height: 200rpx;
		background: #fff;
		border-radius: 30rpx;
		transform:translateY(-30rpx);
		padding:30rpx 0;
		.info{
			padding:10rpx 30rpx;
			display: flex;
			font-size: 30rpx;
			.item{
				padding-right: 20rpx;
				color:#888;
				text{
					font-weight: 600;
					color:#333;
				}
			}
		}
		.list{
			.group{
				padding:15rpx 30rpx;
				border-bottom:15rpx solid #f4f4f4;
				.item{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding:25rpx 0;
					font-size: 36rpx;
					color:#555;
					border-bottom:1rpx solid #f8f8f8;
					.left{
						display: flex;
						align-items: center;
						.iconfont{
							font-size: 38rpx;
							margin-right: 10rpx;
						}
					}
					.right{
						.iconfont{
							font-size: 26rpx;
						}
					}
				}
				.item:last-child{
					border: none;
				}
			}
			.group:last-child{
				border:none;
			}
		}
	}
	
}
</style>
