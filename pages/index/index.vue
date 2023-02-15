<template>
	<view class="home">


		<!-- 轮播图start -->
		<!-- <swiper class="card-swiper"  :circular="true"
		  :autoplay="true" duration="500" interval="8000" @change="cardSwiper"> 
		  <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
		    <view class="swiper-item image-banner">
		      <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
		    </view>
		    <view class="swiper-item-text">
		      <view class="tn-text-bold tn-color-white" style="font-size: 90rpx;">{{item.title}}</view>
		      <view class="tn-color-white tn-padding-top" style="font-size: 30rpx;">{{item.name}}</view>
		      <view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">{{item.text}}</view>
		    </view>
		  </swiper-item>
		</swiper>
		<view class="indication">
		    <block v-for="(item,index) in swiperList" :key="index">
		        <view class="spot" :class="cardCur==index?'active':''"></view>
		    </block>
		</view> -->
		<!-- 轮播图end -->

		<!-- 轮播图start -->
		<!-- <u-swiper
		                 :list="SwiperList"
		                 @change="e => current = e.current"
		                 :autoplay="true"
						 :circular = "true"
						 imgMode="aspectFill"
		         >
		             <view
		                     slot="indicator"
		                     class="indicator"
		             >
		                 <view
		                         class="indicator__dot"
		                         v-for="(item, index) in SwiperList"
		                         :key="index"
		                         :class="[index === current && 'indicator__dot--active']"
		                 >
		                 </view>
		             </view>
		         </u-swiper> -->
		<!-- 轮播图end -->

		<swiper class="card-swiper" :circular="true" :autoplay="true" duration="500" interval="5000"
			@change="cardSwiper">
			<swiper-item v-for="(item,index) in SwiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item image-banner tn-shadow">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</view>
				<view class="swiper-item-text">
					<view class="tn-text-xxl tn-text-bold tn-color-white">{{item.title}}</view>
					<view class="tn-text-bold tn-color-white tn-padding-top-xs" style="font-size: 60rpx;">{{item.name}}
					</view>
					<view class="tn-text-sm tn-text-bold tn-color-white tn-padding-top-sm tn-padding-bottom-sm">
						{{item.text}}
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="indication">
			<block v-for="(item,index) in SwiperList" :key="index">
				<view class="spot" :class="cardCur==index?'active':''"></view>
			</block>
		</view>









		<!-- 		<view class="swiperbox">
			<u-swiper
			:list="swiperList"
			keyName='url'
			height = "300"
			previousMargin="20"
			nextMargin="20"
			:circular = "true"
			:indicator = "true"
			indicatorMode = "dot"
			:autoplay="true"
			radius="5"
			 
			bgColor="#bdf77f"></u-swiper>																					
		</view> -->
		<!-- 	<view>
			<swiper class="swiper" acceleration="true" :autoplay="autoplay"   :interval="interval" :duration="duration">
				<swiper-item  class="swiper-item" v-for="(item,index) of swiperList" :key="item.id"  @click="lemonWX(index)">
					<view class="">
						<image class="swiper-img" show-menu-by-longpress="true" :src="item.img" mode="scaleToFill"></image>
						<view class="swiper-font">
							<view class="title">
								 
								{{item.title}}
							</view>
							<view class="cont">
								 
								{{item.content}}
							</view>
							<view class="index">
								{{index+1}}/{{swiperList.length}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->



		<!-- 功能模块start-->
		<!-- <view v-if="isAndroid" class="tn-flex tn-margin-xs tn-padding-top-sm">
		 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
		   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
		     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur  ">
		        <image :src="'../../static/icon/heart.png'" class="image" mode="aspectFill" />				     
		 						  </view>
		     <view class="tn-color-black tn-text-center">
		       <text class="tn-text-ellipsis">表白墙</text>
		     </view>
		   </view>
		 </view>
		 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/secondgoods/list')">
		   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
		     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
		       <image :src="'../../static/icon/second.png'" class="image" mode="aspectFill" />
		     </view>  
		     <view class="tn-color-black tn-text-center">
		       <text class="tn-text-ellipsis"> 二手闲置</text>
		     </view>
		   </view>
		 </view>
		 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
		   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
		     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
		       <image :src="'../../static/icon/kd.png'" class="image" mode="aspectFill" />
		     </view>  
		     <view class="tn-color-black tn-text-center">
		       <text class="tn-text-ellipsis">快递代取</text>
		     </view>
		   </view>
		 </view>
		 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
		   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
		     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
		        <image :src="'../../static/icon/lost.png'" class="image" mode="aspectFill" />
		     </view>  
		     <view class="tn-color-black tn-text-center">
		       <text class="tn-text-ellipsis">失物招领</text>
		     </view>
		   </view>
		 </view>
		 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
		   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
		     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
		        <image :src="'../../static/icon/question.png'" class="image" mode="aspectFill" />
		     </view>  
		     <view class="tn-color-black tn-text-center">
		       <text class="tn-text-ellipsis">你问我答</text>
		     </view>
		   </view>
		 </view>
		</view>
		 
		 
		
		 
				<view v-else class="tn-flex tn-margin-xs tn-padding-top-sm">
				 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
				   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
				     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur  ">
				        <image :src="'../../static/icon/heart.png'" class="image" mode="aspectFill" />				     
				 						  </view>
				     <view class="tn-color-black tn-text-center">
				       <text class="tn-text-ellipsis">表白墙</text>
				     </view>
				   </view>
				 </view>
				 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/secondgoods/list')">
				   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
				     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
				       <image :src="'../../static/icon/second.png'" class="image" mode="aspectFill" />
				     </view>  
				     <view class="tn-color-black tn-text-center">
				       <text class="tn-text-ellipsis"> 二手闲置</text>
				     </view>
				   </view>
				 </view>
				 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
				   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
				     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
				       <image :src="'../../static/icon/kd.png'" class="image" mode="aspectFill" />
				     </view>  
				     <view class="tn-color-black tn-text-center">
				       <text class="tn-text-ellipsis">快递代取</text>
				     </view>
				   </view>
				 </view>
				 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
				   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
				     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
				        <image :src="'../../static/icon/lost.png'" class="image" mode="aspectFill" />
				     </view>  
				     <view class="tn-color-black tn-text-center">
				       <text class="tn-text-ellipsis">失物招领</text>
				     </view>
				   </view>
				 </view>
				 <view class="tn-flex-1 tn-padding-sm tn-margin-xs tn-radius" @click="tn('/page_blog/heart/heart')">
				   <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
				     <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-shadow-blur ">
				        <image :src="'../../static/icon/question.png'" class="image" mode="aspectFill" />
				     </view>  
				     <view class="tn-color-black tn-text-center">
				       <text class="tn-text-ellipsis">你问我答</text>
				     </view>
				   </view>
				 </view>
				</view> -->
		<!-- 功能模块12 end-->

		<view class="scroll">
			<u-scroll-list @right="right" @left="left">
				<view class="scroll-list" style="flex-direction: row;">
					<view class="scroll-list__goods-item" v-for="(item, index) in Glist" :key="index"
						:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']" @click="change(item.id)">
						<image class="scroll-list__goods-item__image" :src="item.img"></image>
						<view class="scroll-list__goods-item__text"> {{ item.title  }}</view>
					</view>
					<!-- <view class="scroll-list__show-more">
		                 <text class="scroll-list__show-more__text">查看更多</text>
		                 <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
		             </view> -->
				</view>
			</u-scroll-list>

		</view>



		<view class="wrap">
			<tn-notice-bar :list="list" mode="vertical" :speed="140" backgroundColor="#fffee6" fontColor="#000000">
			</tn-notice-bar>
		</view>
		<view class="tn-flex tn-flex-row-between">
			<view class="justify-content-item tn-margin tn-text-bold tn-text-xxl">
			 校园动态
			</view>
			<view class="justify-content-item tn-margin tn-text-lg tn-color-grey">
				<text class="tn-padding-xs" @click="tn('/pages/schoolnews/list')">全部</text>
				<text class="tn-icon-topics"></text>
			</view>
		</view>
		<!-- <view class="topnav">
			<u-tabs :list="navlist" :activeStyle="{
				color: '#333',
				fontWeight: 'bold',
				transform: 'scale(1.08)'
			}" :inactiveStyle="{
				color: '#888',
				transform: 'scale(1)'
			}" @click="clickNav"></u-tabs>
			
		</view> -->
		<!-- <u-tabs :list="listtab" :is-scroll="true" :current="currentTabIndex" @change="change"></u-tabs> 

		<view class="loadingState" v-show="loadState">
			<u-skeleton rows="4" title loading></u-skeleton>
		</view>



		<!-- "P_delEvent"父级里面定义的方法 .slice(0,5)-->
		<view class="content">
			<view class="item" v-for="(item,index) in dataList" :key='index'>

				<blog-item @delEvent="P_delEvent" :item="item" :isLike.sync="item.isLike"
					:like_count.sync="item.like_count"></blog-item>
			</view>
		</view>

		<!-- <view>
			<uni-load-more :status="uniLoad"></uni-load-more>
		</view> -->

		<view v-if="uniIDHasRole('webadmin') || uniIDHasRole('admin')" class="add" @click="goAdd">
			<text class="iconfont icon-a-21-xiugai"></text>
		</view>
	</view>
</template>

<script>
	components: {
		uniGrid,
		uniGridItem
	}
	import uniGrid from "@/uni_modules/uni-grid/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.vue"
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database();
	const dbCmd = db.command;
	export default {
		data() {

			return {
				SwiperList: [],
				 
				list: [
					'关于组织申报2023年度青年科技人才培育计划的通知',
					'关于2023年度国家自然科学基金项目申请与结题等有关事项的通知',
					'关于2023年寒假餐厅供餐调整的通知',
					'停水通知'
				],
				current: 0,
				isAndroid: true,
				col: 3,
				computed: {
					// 兼容小程序
					gridItemWidth() {
						return 100 / this.col + '%'
					}
				},
				cardCur: 0,
		
				Glist: [{
						id: 1,
						img: 'https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/73731562-095a-454e-868b-ca1b13a70a81.png',
						// img: '../../static/icon/heart.png',
						title: '表白墙'
					},
					{
						id: 2,
						img: 'https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/866a75a8-9d26-4b27-8112-ff3d57b2aca7.png',
						// img: '../../static/icon/second.png',
						title: '二手闲置'
					},
					{
						id: 3,
						img: 'https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/9b0bbba5-b635-4047-9d98-fc5251171d13.png',
						// img: '../../static/icon/kd.png',
						title: '快递代取'
					},
					{
						id: 4,
						img: 'https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/59a3cdd7-0009-4eba-a3f2-d98ef4edb188.png',
						// img: '../../static/icon/lost.png',
						title: '失物招领'
					},

					{
						id: 5,
						img: 'https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/c9546220-b3b7-41cf-914b-5958dc9acf71.png',
						// img: '../../static/icon/question.png',
						title: '你问我答'
					},


					{
						id: 6,
						 img: 'https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/18fe3ac5-2d8f-4f2c-ae47-7238bf90f083.png',
						// img: '../../static/icon/school.png',
						title: '校园动态'
					}

				],

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

				],
				dataList: [],
				navAction: 0,


				loadState: true
			}
		},
		onLoad() {
			// this.getSwiper();
			this.getBanner();
			this.getData();
		},
		//触底加载更多
		onReachBottom() {
			this.uniLoad = 'loading'
			if (this.noMore) return this.uniLoad = "noMore";
			this.getData();
		},
		created() {
			const systemInfo = uni.getSystemInfoSync()
			if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
				this.isAndroid = false
			} else {
				this.isAndroid = true
			}
		},
		methods: {
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			left() {
				console.log('left');
			},
			right() {
				console.log('right');
			},
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},
			change(id) {
				// console.log(e)
				// let {
				// 	index
				// } = e.detail

				// console.log(index)
				console.log(id)
			 
				if (id == 1) {
					uni.navigateTo({
						url: "/page_blog/heart/list"
					})
				};
				if (id == 2) {
					uni.navigateTo({
						url: "/page_blog/secondgoods/list"
					})
				};
				if (id == 3) {
					uni.navigateTo({
						url: "/page_blog/runtake/list"
					})
				};
				if (id == 4) {
					uni.navigateTo({
						url: "/page_blog/lost/list"
					})
				};
				if (id == 5) {
					uni.navigateTo({
						url: "/page_blog/question/question"
					})
				};
				if (id == 6) {
					uni.navigateTo({
						url: "/pages/schoolnews/list"
					})
				};
			},

  

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

			async getSwiper() {
				let res = await uniCloud.database().collection("opendb-banner").where({

					status: true
				}).get();

				let data = res.result.data;
				// console.log(data)
				let list = [];
				data.forEach((item, index) => {
					list.push({
						image: item.bannerfile.url,

						title: item.title
					})
				})
				this.Swiperlists = list
				console.log(1)
				console.log(this.Swiperlists)
				this.getData();
				console.log(2)
			},

			// 获取默认轮播图
			async getBanner() {
				let bannerList = await uniCloud.database().collection("opendb-banner").where({
						status: true
					})
					.get().then((res) => {
						// 设置默认轮播图
						let imageList = res.result.data
						imageList.forEach(item => {
							if (item.status == true) {
								this.SwiperList.unshift({
									id: item.sort,
									type: 'image',
									title: item.title,
									// name: item.name,
									// text: item.description,
									// open_url: item.open_url,
									url: item.bannerfile.url,
								})
							}
						})
						console.log(this.SwiperList)
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: err,
							showCancel: false
						})
					})
			},







			//获取网络列表
			async getData() {
				// type=this.current;
				// .where(`delState != true` && `state== 1`) `delState != true``article_status == 1`
				let artTemp =await db.collection("quanzi_article").where(`delState != true&&
						category_id== "63eaaa01e1a35c8785afb5f1"`).field(
						"title,user_id,category_id,delState,description,picurls,comment_count,like_count,view_count,publish_date,article_status"
						)
					.getTemp();
				console.log(artTemp)
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();

				// db.collection(artTemp, userTemp).orderBy(this.navlist[this.navAction].type, "desc").skip(this.dataList
				// 		.length).limit(5).get()
				db.collection(artTemp, userTemp).orderBy("publish_date", "desc").limit(5).get()
					.then(async res => {
						let idArr = []
					 
						// if (res.result.data.length == 0) {
						// 	this.noMore = true
						// }
						console.log(res.result.data)
						let resDataArr =  res.result.data
                       console.log(resDataArr)

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
						this.noMore = true
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

			//跳转至编辑页面
			goAdd() {
				uni.navigateTo({
					url: "/pages/schoolnews/add"
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		margin-top: 20px;
		// ......
	}

	/* 轮播视觉差 start */
	.card-swiper {
		height: 440rpx !important;
	}

	.card-swiper swiper-item {
		width: 750rpx !important;
		left: 0rpx;
		box-sizing: border-box;
		// padding: 0rpx 30rpx 30rpx 30rpx;
		overflow: initial;
	}

	.card-swiper swiper-item .swiper-item {
		width: 100%;
		display: block;
		height: 100%;
		// border-radius: 30rpx;
		transform: scale(1);
		transition: all 0.2s ease-in 0s;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item {
		transform: none;
		transition: all 0.2s ease-in 0s;
	}

	.card-swiper swiper-item .swiper-item-text {
		margin-top: -220rpx;
		width: 100%;
		display: block;
		height: 50%;
		border-radius: 10rpx;
		transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
		overflow: hidden;
	}

	.card-swiper swiper-item.cur .swiper-item-text {
		margin-top: -280rpx;
		width: 100%;
		transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
		transition: all 0.6s ease 0s;
	}

	.image-banner {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image-banner image {
		width: 100%;
		height: 100%;
	}

	/* 轮播指示点 start*/
	.indication {
		z-index: 998;
		width: 100%;
		height: 36rpx;
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.spot {
		background-color: #FFFFFF;
		opacity: 0.6;
		width: 10rpx;
		height: 10rpx;
		border-radius: 20rpx;
		top: -90rpx;
		margin: 0 8rpx !important;
		position: relative;
	}

	.spot.active {
		opacity: 1;
		width: 30rpx;
		background-color: #FFFFFF;
	}

	// .swiperbox{
	// 	.swiper {
	// 	    height: 120rpx;
	// 		width: 100%;
	// 		height: 1500rpx;
	// 	}
	// 	.swiper-img{
	// 		width: 100%;
	// 		height: 1200rpx;
	// 	}
	// 	.swiper-font{
	// 		padding: 20px 10px;
	// 		/* height: 150px; */
	// 		box-shadow: 0 -3px 3px rgba(0,0,0,0.1);
	// 		display: flex;
	// 		flex-direction: column;

	// 	}
	// 	.cont{
	// 		color: #828282;
	// 		font-size: 30rpx;
	// 		padding-top: 10px;
	// 	}
	// 	.index{
	// 		align-self: flex-end;
	// 		/* position: absolute;
	// 		right: 10px;
	// 		bottom: 10px; */
	// 		color: #828282;
	// 		font-size: 24rpx;

	// 	}
	// }
	.scroll {
		display: block;
		height: 100px;

		// background-color: #00ffff;
		.scroll-list {
			@include flex(column);
			margin-top: 10px;
			margin-bottom: 5px;

			&__goods-item {
				margin-left: 20px;
				display: block;

				&__image {
					width: 40px;
					height: 40px;
					border-radius: 4px;
				}

				&__text {
					color: #000000;
					text-align: center;
					font-size: 12px;
					margin-top: 5px;
				}
			}

			&__show-more {
				background-color: #fff0f0;
				border-radius: 3px;
				padding: 3px 6px;
				@include flex(column);
				align-items: center;

				&__text {
					font-size: 12px;
					width: 12px;
					color: #000000;
					line-height: 16px;
				}
			}
		}


		.indicator {
			@include flex(row);
			justify-content: center;

			&__dot {
				height: 6px;
				width: 6px;
				border-radius: 100px;
				background-color: rgba(255, 255, 255, 0.35);
				margin: 0 5px;
				transition: background-color 0.3s;

				&--active {
					// background-color: #ffffff;
					background-color: rgba(229, 164, 20, 1);
				}
			}
		}

		.indicator-num {
			padding: 2px 0;
			background-color: rgba(0, 0, 0, 0.35);
			border-radius: 100px;
			width: 35px;
			@include flex;
			justify-content: center;

			&__text {
				color: #FFFFFF;
				font-size: 12px;
			}
		}


	}


	.home {
		.image {
			width: 25px;
			height: 25px;
		}

		/* 轮播视觉差 start */
		// .card-swiper {
		//   height: 540rpx !important;
		// }

		// .card-swiper swiper-item {
		//   width: 750rpx !important;
		//   left: 0rpx;
		//   box-sizing: border-box;
		//   // padding: 0rpx 30rpx 90rpx 30rpx;
		//   overflow: initial;
		// }

		// .card-swiper swiper-item .swiper-item {
		//   width: 100%;
		//   display: block;
		//   height: 100%;
		//   transform: scale(1);
		//   transition: all 0.2s ease-in 0s;
		//   overflow: hidden;
		// }

		// .card-swiper swiper-item.cur .swiper-item {
		//   transform: none;
		//   transition: all 0.2s ease-in 0s;
		// }

		// .card-swiper swiper-item .swiper-item-text {
		//   margin-top: -260rpx;
		//   text-align: center;
		//   width: 100%;
		//   display: block;
		//   height: 50%;
		//   border-radius: 10rpx;
		//   transform: translate(100rpx, -60rpx) scale(0.9, 0.9);
		//   transition: all 0.6s ease 0s;
		//   overflow: hidden;
		// }

		// .card-swiper swiper-item.cur .swiper-item-text {
		//   margin-top: -320rpx;
		//   width: 100%;
		//   transform: translate(0rpx, 0rpx) scale(0.9, 0.9);
		//   transition: all 0.6s ease 0s;
		// }

		// .image-banner{
		//   display: flex;
		//   align-items: center;
		//   justify-content: center;
		// }
		// .image-banner image{
		//   width: 100%;
		//   height: 100%;
		// }

		/* 轮播指示点 start*/
		// .indication{
		//   z-index: 9999;
		//   width: 100%;
		//   height: 36rpx;
		//   position: absolute;
		//   display:flex;
		//   flex-direction:row;
		//   align-items:center;
		//   justify-content:center;
		// }

		// .spot{
		//   background-color: #FFFFFF;
		//   opacity: 0.6;
		//   width: 10rpx;
		//   height: 10rpx;
		//   border-radius: 20rpx;
		//   top: -60rpx;
		//   margin: 0 8rpx !important;
		//   position: relative;
		// }

		// .spot.active{
		//   opacity: 1;
		//   width: 30rpx;
		//   background-color: #FFFFFF;
		// }

		// .grid {
		// 	.image {
		// 		width: 25px;
		// 		height: 25px;
		// 	}

		// 	.text {
		// 		font-size: 14px;
		// 		margin-top: 5px;
		// 	}

		// 	.example-body {
		// 		/* #ifndef APP-NVUE */
		// 		// display: block;
		// 		/* #endif */
		// 	}

		// 	.grid-dynamic-box {
		// 		margin-bottom: 15px;
		// 	}

		// 	.grid-item-box {
		// 		flex: 1;
		// 		// position: relative;
		// 		/* #ifndef APP-NVUE */
		// 		display: flex;
		// 		/* #endif */
		// 		flex-direction: column;
		// 		align-items: center;
		// 		justify-content: center;
		// 		padding: 15px 0;
		// 	}

		// 	.grid-item-box-row {
		// 		flex: 1;
		// 		// position: relative;
		// 		/* #ifndef APP-NVUE */
		// 		display: flex;
		// 		/* #endif */
		// 		flex-direction: row;
		// 		align-items: center;
		// 		justify-content: center;
		// 		padding: 15px 0;
		// 	}
		// }


		// .Grid {
		// 		display: flex;
		// 		flex-wrap: wrap;
		// 		justify-content: space-between;
		// 		align-content: space-between;
		// 		background: #f7f7f7;
		// 		padding:10rpx 0;
		// 		.Grid-Item {
		// 			width: 25%;
		// 			height: 213rpx;
		// 			text-align: center;
		// 			// border:1rpx solid #ccc;
		// 			box-sizing:border-box;
		// 			.GSimg {
		// 				width: 96rpx;
		// 				height: 96rpx;
		// 				margin-top: 42rpx;
		// 				margin-left: 50rpx;
		// 				.Image {
		// 					width: 96rpx;
		// 					height: 96rpx;
		// 				}
		// 			}
		// 			.GStitle {
		// 				width: 100%;
		// 				height: 34rpx;
		// 				line-height: 34rpx;
		// 				color: #06121e;
		// 				font-size: 24rpx;
		// 				margin-top: 20rpx;
		// 			}
		// 		}
		// 	}
		.u-notice-bar {
			width: 100%;

			align-items: center;
			justify-content: center;
			flex-wrap: nowrap;
			padding: 18rpx 24rpx;
			overflow: hidden;
		}

		.topnav {
			margin-top: 10rpx;
			margin-bottom: 20rpx;
			height: 80rpx;
			// background-color: #ffff7f;
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
