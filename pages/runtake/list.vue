<template>
	<view class="home">
		<scroll-view scroll-x class="navscroll">
			<view class="item" :class="index==navIndex ? 'active' : ''" v-for="(item,index) in navArr"
				@click="clickNav(index,item.id)" :key="item.id">{{item.name}}</view>
		</scroll-view>

		<view class="content">
			<div>

				<uni-list :border="!waterfall" class="uni-list-item--waterfall">
					<!-- 通过 uni-list--waterfall 类决定页面布局方向 -->
					<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
					<uni-list-item class="uni-list-item--waterfall" title="自定义商品列表" v-for="item in newsArr"
						:key="item._id" :to="'/pages/runtake/detail?id='+item._id+'&title='+item.name">
						<!-- 通过header插槽定义列表左侧图片 -->
						<template #header>
							<view class="uni-thumb shop-picture" :class="{ 'shop-picture-column': waterfall }">
								<!-- <image :src="item.run_thumb.url" mode="aspectFill"></image> -->
								<!-- <image v-if="item.run_thumb.url" mode="aspectFill"
									:src="item.run_thumb.url"></image>
								<image v-else mode="aspectFill" src="../../static/icon/kd.png"></image> -->
								<image  mode="aspectFill" src="../../static/icon/kd.png"></image> 
							</view>
						</template>
						<!-- 通过body插槽定义商品布局 -->
						<template #body>
							<view class="shop">
								<view>
									<view class="uni-title">
										<text class="uni-ellipsis-2">{{ item.name }} </text>
									</view>
								</view>
								<view>
									<view class="shop-price">
										 <text>¥</text>
										<text class="shop-price-text">{{ item.run_price }}</text>
									</view>
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</div>
		</view>

		<view class="nodata" v-if="!newsArr.length">
			<image src="../../static/icon/nodata.png" mode="widthFix"></image>

		</view>
<u-back-top :scroll-top="scrollTop" icon="arrow-up" right="300" :iconStyle="iconStyle"></u-back-top>
	
		<view class="loading" v-if="newsArr.length">
			<view v-if="loading==1">
				数据加载中...
				<u-loading-page loading-text="loading..."></u-loading-page>
			</view>
			<view v-if="loading==2">没有更多了~~</view>
		</view>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="goAdd" />

	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				waterfall: false,
				navIndex: 0,
				sort: 0,
				navArr: [],
				newsArr: [],
				currentPage: 1,
				loading: 0 ,//0默认  1加载中  2没有更多了
				scrollTop: 0,
				iconStyle: {
					fontSize: '32rpx',
					color: '#000000'
				}
			}
		},
		onLoad() {
			// uni.startPullDownRefresh()
			this.getNavData();
			this.getFirstData();
			this.getNewsData();
		},
		onReachBottom() {
			console.log("到底部了")
			if (this.loading == 2) {
				return;
				console.log(loading)
			}
			this.currentPage++;
			this.loading = 1;
			this.getNewsData();
		},

		methods: {
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
				},
			//跳转至新增页面
			goAdd() {
				uni.navigateTo({
					url: "/pages/runtake/add",
					
				})
			},
			//点击导航切换
			clickNav(index, id) {
				this.navIndex = index;
				console.log("index:" + index)
				this.sort = index + 1;
				console.log("点击时sort:" + this.sort)
				this.currentPage = 1;
				this.newsArr = []
				this.loading = 0;
				// let cid=navIndex+1
				console.log(this.navIndex)
				this.getNewsData(index);
			},

			//跳转到详情页
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/runtake/detail?id='+item._id+'&title='+item.name`
				})
			},
			async getFirstData() {
				let tabs = await uniCloud.database().collection("runtake-categories").get();
				this.navArr = tabs.result.data;
				console.log("获取时的navarr:" + this.navArr)

				let id = this.navArr[0]._id
				console.log("let id :" + id)
				let page = this.currentPage
				let res = await db.collection("runtake").where({
						category_id: id
					})
					.get();
				this.newsArr = res.result.data;
				console.log(res)
				// if (res.result.data.length == 0) {
				// 	this.loading = 2

				// 	this.newsArr = [...this.newsArr, ...res.result.data]
				// }
				this.loading = 2

			},
			//获取导航列表数据
			async getNavData() {
				let tabs = await uniCloud.database().collection("runtake-categories").get();
				// console.log(tabs)
				this.navArr = tabs.result.data;
				// let list = [];
				// navArr.forEach((item, index) => {
				// 	list.push({
				// 		sort:item.sort,
				// 		name: item.name
				// 	})
				// })
				// this.navArr = navArr
				console.log(tabs.result.data)
			},

			//获取新闻列表数据
			async getNewsData(index) {
				console.log("获取时的navarr:" + this.navArr)
				// this.sort=index+1;
				// console.log("获取时的index,this.sort:"+this.sort)
				// let id = this.navArr[index].sort;
				// let id =this.sort;
				let id = this.navArr[index]._id
				console.log("let id :" + id)
				// let category_id=id; ,runtake-categories .where().field('name,run_price,run_thumb,_id{sort}') .field('category_id{sort}')
				// let res = await uniCloud.database().collection("runtake,runtake-categories").where('category_id=="63c57df0819ce8640cd86768"')
				// .get();.where('category_id=="63c57df0819ce8640cd86768"')
				let page = this.currentPage
				let res = await db.collection("runtake").where({
						category_id: id
					})
					.get();
				this.newsArr = res.result.data;
				console.log(res)
				this.loading = 2
				// if (res.result.data.length == 0) {
				// 	this.loading = 2

				// 	this.newsArr = [...this.newsArr, ...res.result.data]
				// }
				// let id = this.navArr[index]._id
				// let res = await uniCloud.database().collection('runtake').where({
				// 	category_id: id
				// }).get();
				// this.newsArr = res.result.data;
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.shop-picture {
		width: 110px;
		height: 110px;
	}

	.shop-picture-column {
		width: 100%;
		height: 170px;
		margin-bottom: 10px;
	}

	.shop-price {
		margin-top: 5px;
		font-size: 12px;
		color: #ff5a5f;
	}

	.shop-price-text {
		font-size: 16px;
	}
 
	.button-box {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		background: #007AFF;
		color: #fff;
	}

	.uni-link {
		flex-shrink: 0;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}


	// 默认加入 scoped ，所以外面加一层提升权重
	.list {
		margin-top: 52px;

		.uni-list--waterfall {

			/* #ifndef H5 || APP-VUE */
			// 小程序 编译后会多一层标签，而其他平台没有，所以需要特殊处理一下
			::v-deep .uni-list {
				/* #endif */
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 5px;
				box-sizing: border-box;

				/* #ifdef H5 || APP-VUE */
				// h5 和 app-vue 使用深度选择器，因为默认使用了 scoped ，所以样式会无法穿透
				::v-deep

				/* #endif */
				.uni-list-item--waterfall {
					width: 50%;
					box-sizing: border-box;

					.uni-list-item__container {
						padding: 5px;
						flex-direction: column;
					}
				}

				/* #ifndef H5 || APP-VUE */
			}

			/* #endif */
		}
	}

	.navscroll {
		height: 100rpx;
		background: #F7F8FA;
		white-space: nowrap;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 10;

		/deep/ ::-webkit-scrollbar {
			width: 4px !important;
			height: 1px !important;
			overflow: auto !important;
			background: transparent !important;
			-webkit-appearance: auto !important;
			display: block;
		}

		.item {
			font-size: 40rpx;
			display: inline-block;
			line-height: 100rpx;
			padding: 0 30rpx;
			color: #333;

			&.active {
				color: #31C27C;
			}
		}
	}

	.content {
		padding: 30rpx;
		padding-top: 130rpx;

		.row {
			border-bottom: 1px dotted #efefef;
			padding: 20rpx 0;
		}
	}

	.nodata {
		display: flex;
		justify-content: center;

		image {
			width: 360rpx;
		}
	}

	.loading {
		text-align: center;
		font-size: 26rpx;
		color: #888;
		line-height: 2em;
	}
</style>
