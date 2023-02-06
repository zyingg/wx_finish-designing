<template>
	<view class="home">
		<view class="topnav">
			<u-tabs :list="navlist" :activeStyle="{
		 		color: '#333',
		 		fontWeight: 'bold',
		 		transform: 'scale(1.08)'
		 	}" :inactiveStyle="{
		 		color: '#888',
		 		transform: 'scale(1)'
		 	}" @click="clickNav"></u-tabs>

		</view>


		<view class="loadingState" v-show="loadState">
			<u-skeleton rows="4" title loading></u-skeleton>
		</view>



		<!-- "P_delEvent"父级里面定义的方法 -->
		<view class="content">
			<view class="item" v-for="item in dataList">

				<blog-item @delEvent="P_delEvent" :item="item" :isLike.sync="item.isLike"
					:like_count.sync="item.like_count"></blog-item>
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop" icon="arrow-up" right="300" :iconStyle="iconStyle"></u-back-top>
		<view>
			<uni-load-more :status="uniLoad"></uni-load-more>
		</view>

		<view class="add" @click="goAdd">
			<text class="iconfont icon-a-21-xiugai"></text>
		</view>
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database();
	const dbCmd = db.command;
	export default {
		data() {

			return {
				scrollTop: 0,

				iconStyle: {
					fontSize: '32rpx',
					color: '#000000'
				},

				uniLoad: "more",
				noMore: false,
				navlist: [{
						name: "最新",
						type: "publish_date"
					},
					{
						name: "热门",
						type: "view_count"
					}
					// ,
					// {
					// 	name: "表白",
					// 	type: "biaobai"
					// },
					// ,{
					// 	name: "闲置",
					// 	type: "buy"
					// }
				],
				dataList: [],
				navAction: 0,


				loadState: true
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
		onLoad() {
			this.getData();
		},
		//触底加载更多
		onReachBottom() {
			this.uniLoad = 'loading'
			if (this.noMore) return this.uniLoad = "noMore";
			this.getData();
		},
		methods: {
			// change(index) {

			// 	// uni.showLoading({
			// 	// 	title:'加载中...'
			// 	// })
			// 	// this.isshow=false
			// 	// this.dataList = [];
			// 	this.current = index;
			// 	console.log(index);
			// 	console.log(current);
			// 	this.getData();
			// 	// const arr=await this.get()
			// 	// this.dataList=arr
			// 	// uni.hideLoading()

			// },
			// change(index) {
			// 			if(this.currentTabIndex != index) {
			// 				this.currentTabIndex = index;
			// 			}},

			P_delEvent() {
				this.dataList = []; //清空数据
				this.getData();
			},
			// //首页获取数据 获取网络列表
			// async getData() {
			// 	let artTemp = db.collection("quanzi_article").where(`delState!=true`).field(
			// 		"title,user_id,description,comment_count,like_count,view_count,picurls,publish_date").getTemp();
			// 	let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avator_file").getTemp();
			// 	db.collection(artTemp, userTemp).orderBy(this.navlist[this.navAction].type, "desc")
			// 		.skip(this, dataList.length).limit(5)
			// 		.get().then(async res => {
			// 			//触底时拿到文章列表数组长度
			// 			// console.log(res);
			// 			//await紧邻的函数要加上async
			// 			let idArr = []
			// 			let oldArr = this.dataList;
			// 			if (res.result.data.length == 0) {
			// 				this.noMore = true
			// 			}

			// 			let resDataArr = [...this.dataList, ...res.result.data]
			// 			//放在一个数组里
			// 			// let resDataArr = res.result.data 
			// 			//登录情况下执行下列操作
			// 			if (stroe.hasLogin) {
			// 				resDataArr.forEach(item => {
			// 					idArr.push(item._id);
			// 				})
			// 				//把所有数据拿过来
			// 				let likeRes = await db.collection("quanzi_like").where({
			// 					article_id: dbCmd.in(idArr),
			// 					user_id: uniCloud.getCurrentUserInfo().uid
			// 				}).get()

			// 				console.log(likeRes);
			// 				//for循环做比对
			// 				//相等则把索引值返回给我们,把筛选后的数据做一次循环，循环之后看文章
			// 				likeRes.result.data.forEach(item => {
			// 					let findIndex = resDataArr.findIndex(find => {
			// 						return item.article_id == find._id
			// 					})
			// 					resDataArr[findIndex].isLike = true //定义一个值，find代表每一项
			// 				})
			// 			}


			// 			this.dataList = resDataArr
			// 			this.loadState = false
			// 		})
			// },
			//获取网络列表
			async getData() {
				// type=this.current;
				// .where(`delState != true` && `state== 0`)
				let artTemp = db.collection("quanzi_article").where(`delState != true` && `category_id== "63e1093b28064aae268da89b"`).field(
						"title,user_id,category_id,description,picurls,comment_count,like_count,view_count,publish_date,state")
					.getTemp();
				console.log(artTemp)
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();

				db.collection(artTemp, userTemp).orderBy(this.navlist[this.navAction].type, "desc").skip(this.dataList
						.length).limit(5).get()
					.then(async res => {
						let idArr = []
						let oldArr = this.dataList;
						if (res.result.data.length == 0) {
							this.noMore = true
						}
						console.log(res.result.data)
						let resDataArr = [...this.dataList, ...res.result.data]


						if (store.hasLogin) {
							resDataArr.forEach(item => {
								idArr.push(item._id);
							})

							let likeRes = await db.collection("quanzi_like").where({
								article_id: dbCmd.in(idArr),
								user_id: uniCloud.getCurrentUserInfo().uid
							}).get()

							likeRes.result.data.forEach(item => {
								let findIndex = resDataArr.findIndex(find => {
									return item.article_id == find._id
								})
								resDataArr[findIndex].isLike = true
							})
						}


						this.dataList = resDataArr
						this.loadState = false
					})
			},

			clickNav(e) {
				this.loadState = true;
				this.dataList = [];
				this.uniLoad = "more"
				this.navAction = e.index;
				this.noMore = false
				this.getData();
			},

			//跳转至新增页面
			goAdd() {
				uni.navigateTo({
					url: "/pages/heart/add"
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.home {


		.topnav {
			margin-bottom: 30rpx;
		}

		.loadingState {
			padding: 30rpx;
		}

		.content {
			.item {
				padding: 30rpx;
				border-bottom: #F7F7F7 15rpx solid
			}
		}

		.add {
			width: 120rpx;
			height: 120rpx;
			background: #0199FE;
			border-radius: 50%;
			color: #fff;
			position: fixed;
			z-index: 100;
			bottom: 150rpx;
			right: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20rpx rgba(1, 153, 254, 0.8);

			.iconfont {
				font-size: 50rpx;
			}
		}

		.box.active {
			color: #9199FE
		}
	}
</style>
