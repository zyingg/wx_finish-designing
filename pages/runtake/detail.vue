<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
			:collection="collectionList" :where="queryWhere" :getone="true" :manual="true">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
			</view>
			<view v-else-if="data">
				<view class="pic-box">

					<image :src="data.run_thumb.url" mode="aspectFill"></image>
				</view>
				<view class="info-box goods-info">


					<view class="info-box text-info">
						<view class="price">￥{{data.run_price}}</view>
						<view class="title">
							{{data.name}}
						</view>


						<view class="row">
							<view class="leftxt">需求分类</view>
							<view class="content"><text>{{data.category_id[0].text}}</text></view>
						</view>
						<view class="row">
							<view class="leftxt">取货地址</view>
							<view class="content"> <text>{{data.take_place}}</text> </view>
						</view>
						<view class="row">
							<view class="leftxt">送货地址</view>
							<view class="content"> <text>{{data.run_place}}</text> </view>
						</view>

						<view class="row">
							<view class="leftxt">联系方式</view>
							<view class="content"> <text>{{data.contact}}</text> </view>
						</view>
						<view class="row">
							<view class="leftxt">详细描述</view>
							<view class="content"> <text>{{data.run_desc}}</text> </view>
						</view>

						<!-- <view class="row">
							<view class="leftxt">状态</view>
							<view class="content"> <text>{{options.checked_valuetotext[data.checked]}}</text> </view>
						</view> -->

						<view class="row">
							<view class="leftxt">发布时间</view>
							<view class="content">
								<uni-dateformat :threshold="[0, 0]" :date="data.add_date"></uni-dateformat>
							</view>
						</view>



						<view class="more" @click="clickMore">
							<uni-icons type="more-filled" size="30"></uni-icons>
							
						</view>

					</view>


					<!-- 详情 -->
					<!-- <view class="description">
						<view class="title">———— 详情 ————</view>
{{data.run_desc}}
					 

					</view> -->
				</view>
				<u-action-sheet :actions="selectlist" cancelText="取消" :show="show" :closeOnClickOverlay="true"
					:closeOnClickAction="true" @select="selectClick" @close="onClose"></u-action-sheet>

			</view>
		</unicloud-db>

	</view>
</template>

<script>
	// 由schema2code生成，包含校验规则和enum静态数据
	import {
		enumConverter
	} from '../../js_sdk/validator/runtake.js'
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
				collectionList: [

					db.collection('runtake').field(
						'category_id,name,user_id,keywords,run_desc,take_place,run_place,contact,run_thumb,run_price,add_date,last_modify_date'
					).getTemp(),
					db.collection('runtake-categories').field('_id, name as text').getTemp()
					// db.collection('uni-id-users').field('_id, username').getTemp(),
				],
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
		},
		onReady() {
			if (this._id) {
				this.queryWhere = '_id=="' + this._id + '"'
			}
		},
		methods: {

			clickMore() {
				let uid = uniCloud.getCurrentUserInfo().uid
				console.log(uid);
				console.log(this.$refs.udb.dataList);

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
							url: './list'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: block;
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
				margin-right: 20upx;
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
