<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
			:collection="collectionList"
			field="user_id,title,content,excerpt,article_status,avatar,publish_date,last_modify_date,mode"
			:where="queryWhere" :getone="true" :manual="true">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
			</view>
			<view v-else-if="data">

				<view class="title">

					<text>{{data.title}}</text>
				</view>

				<view class="small">
					发布时间：{{$u.timeFormat(data.publish_date) }}
						<view class="uci" style="float:right" @click="clickMore"><u-icon name="more-circle" color="#c5e791" size="20"></u-icon> </view>
				</view>

				<view class="content">

					{{data.content}}
				</view>
				<view class="pic-box">
<image :src="data.avatar.url" mode="aspectFit"></image>
					<!-- <uni-file-picker v-if="data.avatar && data.avatar.fileType == 'image'" :value="data.avatar"
						:file-mediatype="data.avatar && data.avatar.fileType" return-type="object" readonly>
					</uni-file-picker>
					<uni-link v-else-if="data.avatar" :href="data.avatar.url" :text="data.avatar.url"></uni-link>
					<text v-else></text> -->
				</view>

			</view>
		</unicloud-db>
		<u-action-sheet :actions="selectlist" cancelText="取消" :show="show" :closeOnClickOverlay="true"
					:closeOnClickAction="true"  @select="selectClick"  @close="onClose"></u-action-sheet>
		<!-- <view class="btns">
			<button type="primary" @click="handleUpdate">修改</button>
			<button type="warn" class="btn-delete" @click="handleDelete">删除</button>
		</view> -->
	</view>
</template>

<script>
	// 由schema2code生成，包含校验规则和enum静态数据
	import {
		enumConverter
	} from '../../js_sdk/validator/notice.js'
	const db = uniCloud.database()

	export default {
		data() {
			return {
				show:false,
				
				selectlist: [
							{
								name: "修改",disabled: true
							},
							{
								name: "删除",disabled: true
							}
						],
				queryWhere: '',
				collectionList: "notice",
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
			 
				//权限校验，普通用户只能修改删除自己的文章，管理员可以操作全部
				if (uid ==this.$refs.udb.dataList.user_id || this.uniIDHasRole('admin') || this.uniIDHasRole('webadmin')) {
					this.selectlist.forEach(item => {
						item.disabled = false
			
					})
				}
				this.show = true
			
			},
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
							url: './list'
						})
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 10px;
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

	.title {
		font-size: 46rpx;
		color: #333;
		line-height: 1.4em;
		font-weight: 600;
		margin-bottom: 15rpx;
	}

	.small {
		font-size: 20rpx;
		color: #999;
		justify-content: space-between;
		margin-bottom: 25rpx;
	}

	.content {
margin-top: 15rpx;
		font-size: 26rpx;
		color: #000000;

	}
	.pic-box{
		margin-top:15rpx ;
	}
</style>
