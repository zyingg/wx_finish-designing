<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
			:collection="collectionList" :getone="true" :manual="true">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
			</view>
			<view v-else-if="data">
				<view class="pic-box">
					<!-- <text>商品图</text> -->
					<!--  <uni-file-picker v-if="data.picurl && data.picurl.fileType == 'image'" :value="data.picurl" :file-mediatype="data.picurl && data.picurl.fileType" return-type="object" readonly></uni-file-picker>
		    <uni-link v-else-if="data.picurl" :href="data.picurl.url" :text="data.picurl.url"></uni-link>
		    <text v-else></text> -->
				<!-- 	<image :src="data.picurl.url" mode="aspectFill"></image> -->
					<image :src="data.goods_banner_imgs[0].url" mode="aspectFill"></image>
				</view>
				<view class="info-box goods-info">



					<view class="info-box text-info">
						<view class="price">￥{{data.price}}</view>
						<view class="title">
							{{data.name}}
						</view>

						<!-- 	<view class="row">
							<view class="leftxt">服务</view>
							<view class="content">{{data.contact}} </view>
						</view>
						
						<view class="row">
							<view class="leftxt">选择</view>
							<view class="content"> </view>
						</view> -->

						<view class="row">
							<view class="leftxt">用品分类</view>
							<view class="content"><text>{{data.category_id[0].text}}</text></view>
						</view>


						<view class="row">
							<view class="leftxt">库存数量</view>
							<view class="content"> <text>{{data.remain_count}}</text> </view>
						</view>

						<view class="row">
							<view class="leftxt">联系方式</view>
							<view class="content"> <text>{{data.contact}}</text> </view>
						</view>

						<!-- <view class="row">
							<view class="leftxt">状态</view>
							<view class="content"> <text>{{data.checked == true ? '✅' : '❌'}}</text> </view>
						</view> -->
						<!-- options.checked_valuetotext[data.checked] -->
						<view class="row">
							<view class="leftxt">上架时间</view>
							<view class="content">
								<uni-dateformat :threshold="[0, 0]" :date="data.add_date"></uni-dateformat>
							</view>
						</view>

						<view class="row">
							<view class="leftxt">卖家备注</view>
							<view class="content">
								<text>{{data.seller_note}}</text>
							</view>
						</view>

						<view class="more" @click="clickMore">
					 	<uni-icons type="more-filled" size="30"></uni-icons>

						</view>

					</view>

					<!-- 详情 -->
					<view class="description">
						<view class="title">———— 商品详情 ————</view>
						<!-- <view class="content"><rich-text :nodes="data.goods_desc"></rich-text></view> -->

						{{data.goods_desc}}
						<view class="picurls">
					 	 <!-- 	<view class="picurls" v-if="data.goods_banner_imgs && data.goods_banner_imgs.length"> -->
										<!-- <image v-for="item in data.goods_banner_imgs" :src="item.url" mode="widthFix"></image> -->
  <template v-for="(file, j) in data.goods_banner_imgs">
            <uni-file-picker v-if="file.fileType == 'image'" :value="file" :file-mediatype="file.fileType" return-type="object" readonly></uni-file-picker>
            <uni-link v-else :href="file.url" :text="file.url"></uni-link>
          </template>
									</view>
						
					</view>
				</view>
				<u-action-sheet :actions="selectlist" cancelText="取消" :show="show" :closeOnClickOverlay="true"
					:closeOnClickAction="true" @select="selectClick" @close="onClose"></u-action-sheet>

			</view>
		</unicloud-db>

		 
	</view>
</template>

<script>
 

	import {
		enumConverter
	} from '../../js_sdk/validator/secondgoods.js'
	const db = uniCloud.database()

	export default {
		data() {
			return {
				show: false,
				selectlist: [{
						name: "修改",
						disabled: true
					},
					{
						name: "删除",
						disabled: true
					}
				],
				queryWhere: '',
				collectionList: [db.collection('secondgoods').field(
					'category_id,name,keywords,price,goods_banner_imgs,goods_desc,remain_count,contact,checked,add_date,last_modify_date'
				).getTemp(), 
			 
				db.collection('secondgoods-categories').field('_id, classname as text').getTemp()],
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				options: {
					// 将scheme enum 属性静态数据中的value转成text
					...enumConverter
				}
			}
		},
		onLoad(e) {
			this._id = e.id
			// console.log(this.goods_banner_imgs.url)
			// var objecturl =  window.URL.createObjectURL(),
			// img.src = window.URL.createObjectURL(file);
			// console.log(options.checked_valuetotext[data.checked])
		},
		onReady() {
			if (this._id) {
				this.collectionList = [db.collection('secondgoods').where('_id=="' + this._id + '"').field(
					'user_id,category_id,name,keywords,goods_banner_imgs,price,goods_desc,remain_count,contact,checked,add_date,last_modify_date'
				).getTemp(), db.collection('secondgoods-categories').field('_id, classname as text').getTemp()]
			}
		},
		methods: {
			clickMore() {
				let uid = uniCloud.getCurrentUserInfo().uid
				console.log(uid);
				console.log(this.$refs.udb.dataList);
					console.log(this.$refs.udb.dataList.user_id);

				//权限校验，普通用户只能修改删除自己的，管理员可以操作全部
				if (uid == this.$refs.udb.dataList.user_id || this.uniIDHasRole('admin') || this.uniIDHasRole(
					'webadmin')) {
					this.selectlist.forEach(item => {
						item.disabled = false

					})
				}
				this.show = true

			},
			selectClick(index) {
				console.log(index);
				let uid = uniCloud.getCurrentUserInfo().uid;
				if (index.name == "修改") {
					this.handleUpdate();
				}
				if (index.name == "删除") {
					this.handleDelete();
				}
			},
			//取消弹窗
			onClose() {
				this.show = false
			},
			handleUpdate() {
				// 打开修改页面
				uni.navigateTo({
					url: './edit?id=' + this._id,
					events: {
						// 监听修改页面成功修改数据后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			},
			handleDelete() {
				this.$refs.udb.remove(this._id, {
					success: (res) => {
						// 删除数据成功后跳转到list页面
						uni.navigateTo({
							url: '/page_blog/secondgoods/list'
							// url: './list'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #f8f8f8;
	// }
	.container {
		display: block;
		// padding: 10px;
	}

	.pic-box {
		image {
			width: 100%;
			height: 100vw;
		}
	}
.picurls{
		padding-top: 50rpx;
		image{
			width: 100%;
			display: block;
			margin-bottom:30rpx;
		}
	}
	.btns {
		margin-top: 10px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.btns button {
		flex: 1;
	}

	.btn-delete {
		margin-left: 10px;
	}

	/deep/.info-box {
		width: 100%;
		padding: 25upx;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	/deep/.goods-info {
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #f47925;
		}

		.title {
			font-size: 40upx;
			margin-bottom: 20px;
			color: #605454;
			font-weight: 700;
		}
	}

	.text-info {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.leftxt {
				width: 20%;
				font-size: 15px;
				color: #a2a2a2;
				// margin-right: 20upx;
			}

			.content {
				font-size: 18px;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.more {
		padding: 5rpx;
		float: right;

		.iconfont {
			font-size: 50rpx;
			color: #888;
		}
	}
</style>
