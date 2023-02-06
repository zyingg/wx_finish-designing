<template>
	<view class="wrap">
		 
		<view>
			<u-tabs-swiper ref="uTabs" :list="list"  :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" style="height: 100%;" v-for="(items, indexs) in list" :key="indexs">
				<u-gap height="20" bg-color="#ffffff"></u-gap>
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					<uni-list :border="!waterfall" class="uni-list-item--waterfall">
						<!-- 通过 uni-list--waterfall 类决定页面布局方向 -->
						<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
						<uni-list-item class="uni-list-item--waterfall" title="自定义商品列表" v-for="item in pages"
							:key="item._id" :to="'/pages/lost/detail?id='+item._id+'&title='+item.name">
							<!-- 通过header插槽定义列表左侧图片 -->
							<template #header>
								<view class="uni-thumb shop-picture" :class="{ 'shop-picture-column': waterfall }">
									<!-- <image :src="item.lost_thumb.url" mode="aspectFill"></image> -->
									<image v-if="item.lost_thumb && item.lost_thumb.length" mode="aspectFill"
										:src="item.lost_thumb[0].url"></image>
									<image v-else mode="aspectFill" src="../../static/icon/lost.png"></image>
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
									<!-- <view class="u-body-item-title u-line-2">{{item.lost_desc}}</view> -->
									<view>
										<view class="shop-price">
											 <view class="uni-card__content">{{ $u.timeFormat(item.add_date)}} 发布</view >
										</view>
									</view>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
				<!-- 	<uni-card v-for="item  in pages" :key="item._id" @click="look()"  :isFull="true"    :show-foot="false" >
						<image mode="aspectfit" :src="item.lost_thumb.path"></image>
					 <text class="uni-body uni-mt-5" style="font-size:20px">{{item.name}}</text>
					 <view class="uni-card__content">{{ $u.timeFormat(item.add_date)}} </view ></uni-card> -->
					<!-- <uni-card v-for="(item,index) in pages" :key="item._id" @click="look(item)"   :isFull="true"    :show-foot="false" > -->
			<!-- 	<view class="uni-body"> <uni-dateformat :date="item.add_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]"></uni-dateformat>   </view> -->
				<!-- <text class="uni-body uni-mt-5"></text> -->
						<!-- <view class="" slot="body">:cover="item.lost_thumb.url" :title="item.name" :sub-title="$u.timeFormat(item.add_date)" width: 100%;
							<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
								<view class="u-body-item-title u-line-2">{{item.lost_desc | show_excerpt}}</view>
								<image
									:src="item.lost_thumb.url"
									mode="aspectFill"></image>
							</view>
						</view> -->
						<!-- <view class="" slot="foot">
							<u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon>
						</view> -->
					
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="goAdd" />
	</view>
</template>

<script> components: {
	 	UniCard 
	 	 
	 }
	import UniCard from '@/components/uni-card/uni-card.vue'
	// import UniCard from '@/components/uni-card/uni-card.vue'
	
	export default {
		data() {
			return {	waterfall: false,
				lists: [],
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0,
				 	pages:[]
				
			}
		},
		filters:{
			show_excerpt(val){
				return val>20? val:val+ "　　　　　　　　　　　　　　　　　　"
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
			this.getSwiper();
			 
			this.getPages();
		},
		onPullDownRefresh() {
			this.getSwiper()
		},
		methods: {
			//跳转至新增页面
			goAdd() {
				uni.navigateTo({
					url: "/pages/lost/add",
					// success: () => {
					// 	setTimeout(() => {
					// 		uni.navigateBack("/pages/lost/list");
					// 	}, 2000)
					// }
				})
			},
			
			look(){
				// console.log("ssss"+item)
				console.log(item._id)
				uni.navigateTo({
					url: `/pages/lost/detail?id='+item._id+'&title='+item.name`
				})
			},
			// look(item){
			// 	console.log("ssss"+item)
			// 	console.log(item._id)
			// 	uni.navigateTo({
			// 		url: `/pages/lost/detail?id='+item._id+'&title='+item.name`
			// 	})
			// },
			async getSwiper() {
				 
				let tabs = await uniCloud.database().collection("lost-categories").get();
				 
				this.list = tabs.result.data
				 console.log(this.swiperCurrent)
				console.log(tabs.result.data)
				this.getPages(this.swiperCurrent)
			},
			async getPages(index){
				console.log("index="+index)
				let id = this.list[index]._id
					console.log("id="+this.list[index]._id)
				let res = await uniCloud.database().collection('lost').where({category_id:id}).get();
				this.pages = res.result.data;
				console.log("index="+JSON.stringify(res.result.data))
				uni.stopPullDownRefresh()
			},
			tabsChange(index) {
				this.swiperCurrent = index;
				console.log(index)
				this.getPages(index)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				console.log("e.detail.current="+e.detail.current)
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.getPages(this.swiperCurrent);
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				console.log(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 默认加入 scoped ，所以外面加一层提升权重

		@import '@/common/uni-ui.scss';
	 
	.wrap {
		padding: 40rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	 
	.swiper-box {
		flex: 1;
		height: 60vh;
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
		color: #000000;
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
