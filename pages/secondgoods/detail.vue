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
					<image :src="data.picurl.url" mode="aspectFill"></image>
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
							<view class="leftxt">分类</view>
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

						<view class="row">
							<view class="leftxt">状态</view>
							<view class="content"> <text>{{options.checked_valuetotext[data.checked]}}</text> </view>
						</view>

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

					 <view class="more" @click="show = true">
					 	<text class="iconfont icon-ellipsis"></text>
					 </view>

					</view>


					<!--  <view>
			    <text>最后修改时间</text>
			    <uni-dateformat :threshold="[0, 0]" :date="data.last_modify_date"></uni-dateformat>
			  </view> -->

					<!-- 详情 -->
					<view class="description">
						<view class="title">———— 商品详情 ————</view>
						<!-- <view class="content"><rich-text :nodes="data.goods_desc"></rich-text></view> -->
						<div id="div1"><div v-html="data.goods_desc"></div></div>
						<!-- {{data.goods_desc}} -->
					</view>
				</view>
<u-action-sheet :actions="list" cancelText="取消" :show="show" :closeOnClickOverlay="true"
			:closeOnClickAction="true"  @select="selectClick"  @close="onClose"></u-action-sheet>

			</view>
		</unicloud-db>
		
		<!-- <view class="btns">
			<button type="primary" @click="handleUpdate">修改</button>
			<button type="warn" class="btn-delete" @click="handleDelete">删除</button>
		</view> -->
	</view>
</template>

<script>
	// 由schema2code生成，包含校验规则和enum静态数据
	import E from 'wangeditor'
	import {
		enumConverter
	} from '../../js_sdk/validator/secondgoods.js'
	const db = uniCloud.database()
let editor = null;
	export default {
		data() {
			return {
				
					list: [
								{
									name: "修改",
								},
								{
									name: "删除",
								}
							],
							show: false,
				queryWhere: '',
				collectionList: [db.collection('secondgoods').field(
					'category_id,goods_sn,name,keywords,price,goods_desc,picurl,remain_count,contact,checked,add_date,last_modify_date,seller_note'
				).getTemp(), db.collection('secondgoods-categories').field('_id, classname as text').getTemp()],
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
			// var objecturl =  window.URL.createObjectURL(),
			// img.src = window.URL.createObjectURL(file);
			// console.log(img.src)
		},
		onReady() {
			if (this._id) {
				this.collectionList = [db.collection('secondgoods').where('_id=="' + this._id + '"').field(
					'category_id,goods_sn,name,keywords,price,goods_desc,picurl,remain_count,contact,checked,add_date,last_modify_date,seller_note'
				).getTemp(), db.collection('secondgoods-categories').field('_id, classname as text').getTemp()]
			}
		},
		methods: {
			selectClick(index){
						console.log(index);
						if(index.name== "修改"){
							this.handleUpdate();
						}
						if(index.name== "删除"){
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
							url: '/pages/secondgoods/list'
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
		width: 92%;
		padding: 20upx 4%;
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
		}
	}

	.text-info {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.leftxt {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
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
	float:right;
		.iconfont {
			font-size: 50rpx;
			color: #888;
		}
	}
</style>
