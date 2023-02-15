<template>
	<view style="overflow: hidden;">
		<view class="search-container-bar">
			<uni-search-bar ref="searchBar" style="flex:1;" radius="100" v-model="searchText"
				@search-click="searchClick" @clear="clear" @cancel="search" cancelButton="none" disabled
				placeholder="请输入搜索内容" />
		</view>
		<view class="list">
			<!-- 刷新页面后的顶部提示框 -->
			<!-- <scroll-view  scroll-x class="navscroll">
				<view class="item" :class="index==navIndex ? 'active' : ''" v-for="(item,index) in navArr"
					@click="clickNav(index,item.id)" :key="item.id">{{item.classname}}</view>
			</scroll-view> -->
			<!-- 页面分类标题 -->
			<!-- <uni-section style="margin:0;" :title="listTitle" type="line"><button class="button-box"
					@click="select">切换视图</button></uni-section> -->
			<unicloud-db ref="udb" v-slot:default="{data, pagination, error, options}" :options="options"
				page-data="replace" :collection="collectionList" :where="where" @load="load" :getcount="true"
				:page-size="options.pageSize" :page-current="options.pageCurrent">
				<!-- field="category_id,goods_sn,good_name,keywords,price,goods_desc,picurl,remain_count,contact,checked,add_date,last_modify_date,seller_note"
				:where="where" @load="load"> -->
				<text v-if="error" class="list-info">{{error.message}}</text>
				<!-- 基于 uni-list 的页面布局 -->
				<uni-list :class="{ 'uni-list--waterfall': !options.formData.waterfall }">
					<!-- 通过 uni-list--waterfall 类决定页面布局方向 -->
					<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
					<uni-list-item :border="!options.formData.waterfall" class="uni-list-item--waterfall"
						title="自定义商品列表" v-for="item in data" :key="item._id"
						:to="'/page_blog/secondgoods/detail?id='+item._id+'&title='+item.name">
						<!-- 通过header插槽定义列表左侧图片 -->
						<template #header>
							<view class="uni-thumb shop-picture"
								:class="{ 'shop-picture-column': !options.formData.waterfall }">
								<!-- <image :src="item.picurl.url mode="aspectFill"></image> -->
								<!-- <image :src="item.goods_banner_imgs[0]" mode="aspectFill"></image> -->
								<image v-if="item.goods_banner_imgs && item.goods_banner_imgs.length" mode="aspectFill"
									:src="item.goods_banner_imgs[0].url"></image>
								<image v-else mode="aspectFill" src="https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/866a75a8-9d26-4b27-8112-ff3d57b2aca7.png"></image>
							</view>
						</template>
						<!-- 通过body插槽定义商品布局 ../../static/icon/second.png-->
						<template #body>
							<view class="shop">
								<view>
									<view class="uni-title">
										<text class="uni-ellipsis-2">{{ item.name }} </text>
									</view>
									<!-- <view>
										<text class="uni-tag hot-tag">{{ item.goods_tip }}</text>
										<text v-for="tag in item.tag" :key="tag" class="uni-tag">{{ tag }}</text>
									</view> -->
								</view>
								<view>
									<view class="shop-price">
										<text>¥</text>
										<text class="shop-price-text">{{ item.price }}</text>

									</view>
									<!-- <view class="uni-note">{{ item.comment_count }}条评论 月销量 {{ item.month_sell_count }}
									</view>
									<view class="uni-note ellipsis">
										<text class="uni-ellipsis-1">{{ item.shop_name }}</text>
										<text class="uni-link">进店 ></text>
									</view> -->
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
				<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
				<!-- 	<uni-load-more v-if="!error && (loading || options.status === 'noMore') " :status="options.status" /> -->
				<view class="uni-pagination-box">
					<uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current"
						:total="pagination.count" @change="onPageChanged" />
				</view>
				<view>
					<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
				</view>
			</unicloud-db>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	const db = uniCloud.database()
	// 分页配置
	const pageSize = 6
	const pageCurrent = 1


	components: {
		uniSection
	};
	export default {
		data() {
			return {
				collectionList: [
					// .where('user_id==$cloudEnv_uid')
					db.collection('secondgoods').where('checked == 0')
					.field(
						'user_id,category_id,goods_sn,goods_banner_imgs,name,keywords,price,goods_desc,picurl,remain_count,contact,checked,add_date,last_modify_date,seller_note'
					)
					.getTemp(),
					// db.collection('uni-id-users').field('_id, user_id as userid').getTemp(),
					db.collection('secondgoods-categories').field('_id, classname as text').getTemp()
				
				],
				searchText: '',
				selectedIndexs: [],
				navIndex: 0,
				sort: 0,
				index:0,
				navArr: [],
				good:[],
				goods:[],
				options: {
					pageSize,
					pageCurrent,
					formData: {
						waterfall: false, // 布局方向切换
						// status: 'loading', // 加载状态
					}
				},
				where: "",
				// where: "category_id._id=='63c02ebb819ce855b16def5d'",
				// where: 'category_id._id=="63c02efdf5cf3a165a49c396"',
// `username=='${tempstr}'`

			};
		},
		onShow(options) {
			this.searchText = getApp().globalData.searchText;
		},
		onLoad() {
			// uni.startPullDownRefresh()
			
			// this.getNavData();
			// this.where = "category_id._id=='" + this.navArr[0]._id + "'";
		// this.getNewsData();
			
			
			
 
		},
		methods: {
			//点击导航切换
// 			clickNav(index, id) {
// 				this.navIndex = index;
// 				console.log("index:" + index)
// 				// this.sort = index + 1;
// 				// this.sort = index  ;
// 				// console.log("点击时sort:" + this.sort)
// 				this.sort = this.navArr[index]._id
// 				console.log("let id :" + this.sort)
// 				// console.log("点击时sort:" + this.sort)
// 	this.where = "category_id._id=='" + this.sort + "'"
// 				console.log(this.navIndex)
// // this.getNewsData(index);
// 			},
// 			//获取导航列表数据
// 			async getNavData() {
// 				// let tabs = 
// 				 let tabs = await db.collection("secondgoods-categories").get();
// 	// 			.then((res)=>{
//  //    this.navArr = res.result.data;// res 为数据库查询结果
// 	// this.where = "category_id._id=='" + this.navArr[0]._id + "'"
// 	// })
// 				// console.log(tabs)
// 				this.navArr = tabs.result.data;
// 				this.where = "category_id._id=='" + this.navArr[0]._id + "'";
// 				// let list = [];
// 				// this.navArr.forEach((item, index) => {
// 				// 	list.push({
// 				// 		sort:item.orderid-1,
// 				// 		name: item.classname
// 				// 	})
// 				// })
// 				// this.navArr = list
				
// 				// console.log(res.result.data)
// 				console.log(this.navArr)
// 				// this.getNewsData(index);
// 				// this.sort= this.navArr[0]._id
// 				// console.log("let id :" + this.sort)
// 			},
			  async getNewsData() {
				// console.log("获取时的navarr:" + this.navArr[index]._id)
				// this.sort = this.navArr[index]._id
				// let id = this.navArr[index]._id
				// this.where = "category_id._id=='" + this.navArr[0]._id + "'"
				console.log("let id :" + id)
				console.log("getNewsData :" + index)
				console.log("getNewsData :" + this.sort)
				// let good = await uniCloud.database().collection('secondgoods').where({
				// 		category_id:id
				// 	})
				// 	.field(
				// 		'user_id,category_id,goods_banner_imgs,name,keywords,price,goods_desc,picurl,remain_count,contact'
				// 	)
				// 	.get();
                 
				// 	// let goods =await uniCloud.database().collection('secondgoods-categories').field('_id, classname as text').getTemp();
				// 	// let all = uniCloud.database().collection(good, goods) // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
				// 	// 	// .where('category_id._id == this.sort')  
				// 	// 	.where('checked == 0')
				// 	// 	.get();
				// 	this.collectionList = good.result.data;
					// console.log(good.result.data)
				// let id = this.navArr[index]._id
				// console.log("let id :" + id)
				 
				// let res = await db.collection("runtake").where({
				// 		category_id: id
				// 	})
				// 	.get();
				// this.newsArr = res.result.data;
				// console.log(res)
				// this.loading = 2
				 
			},

			fabClick() {
				console.log(1)
				uni.navigateTo({
					url: "/page_blog/secondgoods/add",
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})


			},
			onPageChanged(e) {
				// this.selectedIndexs.length = 0
				// this.$refs.table.clearSelection()
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			/**
			 * 切换商品列表布局方向
			 */
			// select() {
			// 	this.options.formData.waterfall = !this.options.formData.waterfall;
			// },
			/**
			 * 下拉刷新回调函数
			 */
			onPullDownRefresh() {
				// this.tipShow = true
				// this.formData.status = 'more'
				this.$refs.udb.loadData({
					clear: true
				}, () => {
					// this.tipShow = false
					uni.stopPullDownRefresh()
				})
			},
			/**
			 * 上拉加载回调函数
			 */
			onReachBottom() {
				this.$refs.udb.loadMore()
			},
			load() {
				// load(data, ended) {
				// if (ended) {
				// 	this.formData.status = 'noMore'
				// }
			},
			search(text = '') {
				this.where = text ? `${new RegExp(text, 'gi')}.test(name)` : '';
			},
			clear() {
				
				getApp().globalData.searchText = '';
				console.log("clear")
			},
			searchClick() {
				uni.hideKeyboard();
				uni.navigateTo({
					url: '/page_blog/secondgoods/search',
					animationType: 'fade-in'
				});
			}
		},
		watch: {
			searchText(value) {
				this.search(value);
				console.log("searchText")
			}
		},
		computed: {
			listTitle() {
				return this.searchText === '' ? '最热商品' : '搜索结果'
			}
		}
	};
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
		font-size: 13px;
		color: #ff3c3f;
	}

	.shop-price-text {
		font-size: 16px;
		margin-left: 3px;
	}

	.hot-tag {
		background: #ff5a5f;
		border: none;
		color: #fff;
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
		// margin-top: 52px;

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

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		// position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE */
	::v-deep

	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE */
	::v-deep

	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.list-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
		margin-top: 20rpx;
	}

	.navscroll {
		height: 100rpx;
		background: #F7F8FA;
		white-space: nowrap;
		// position: fixed;
		// top: var(--window-top);
		// left: 0;
		// z-index: 10;

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
</style>
