<template>
	<view class="detail">
		<view class="container">
			<!-- <unicloud-db :where="`_id=='${artid}'`" v-slot:default="{data, loading, error, options}" getone="true" :collection="collections"> -->
			<!-- 头部打印data方便看数据 -->
			<!-- {{data}} -->
			<!-- 	{{detailObj}} -->
			<!-- <view v-if="error">{{error.message}}</view>
				<view v-else-if="loading"> -->
			<!-- 正在加载... -->
			<!-- 引入uview Skeleton 骨架屏 -->
			<!-- 			<u-skeleton
						    rows="5"
						    title
							loading
						></u-skeleton>
					</view> -->
			<view v-if="loadState">
				<u-skeleton rows="5" title loading></u-skeleton>
			</view>

			<view v-else>
				<view class="title">{{detailObj.title}}</view>
					<view class="uci" style="float:right" @click="show = true"><u-icon name="more-circle" color="#c5e791" size="25"></u-icon> </view>
				<view class="userinfo">
					<view class="avatar">
						<!-- 头像 -->
						<!-- <image
							:src="detailObj.user_id[0].avatar_file ? detailObj.user_id[0].avatar_file.url : '../../static/person-select.png' "
							mode="aspectFill"></image> -->
						<image :src="giveAvatar(detailObj)" mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="name">
							<!-- {{detailObj.user_id[0].nickname ? detailObj.user_id[0].nickname : detailObj.user_id[0].username}} -->
							{{giveName(detailObj)}}
						</view>
						<!-- 时间 发布地 -->
						<view class="small">
							<uni-dateformat :date="detailObj.publish_date" format="yyyy年MM月dd hh:mm:ss"
								:threshold="[60000,3600000*24*30]">
							</uni-dateformat>

							发布于{{detailObj.province}}
						
						</view>
							
					</view>
				
				</view>
				
				<view class="content">
					<!-- 使用uview的富文本组件 parse富文本解析器 -->
					<u-parse :content="detailObj.content" :tagStyle="tagStyle"></u-parse>
				</view>

				<view class="like">
					<view class="btn" :class="detailObj.isLike ? 'active' : ''" @click="clickLike">
						<text class="iconfont icon-good-fill"></text>
						<text v-if="detailObj.like_count">{{detailObj.like_count}}</text>
					</view>
					<view class="users">
						<!-- <image src="../../static/person.png" mode="aspectFill"></image> -->
						<template v-for="item in likeUserArr">
							<!-- 	<image v-if="item.user_id[0].avatar_file" :src="giveAvatar(item)" mode="aspectFill" ></image> -->
							<image :src="giveAvatar(item)" mode="aspectFill"></image>
						</template>

					</view>
					<view class="text"><text class="num">{{detailObj.view_count}}</text>人看过</view>
				</view>

			</view>
			</unicloud-db>





		</view>
		<view class="comment">
					<view style="padding-bottom:50rpx" v-if="!commentList.length && noComment">
						<u-empty
								mode="comment"
								icon="https://cdn.uviewui.com/uview/empty/comment.png"
						>
						</u-empty>
					</view>
					
					<view class="content" v-if="commentList.length">
						<view class="item" v-for="item in commentList">
							<comment-item :item="item" @removeEnv="PremoveEnv"></comment-item>									
						</view>
					</view>

		</view>



		<comment-frame :commentObj="commentObj" @commentEnv="PcommentEnv"></comment-frame>
<u-action-sheet :actions="selectlist" cancelText="取消" :show="show" :closeOnClickOverlay="true"
			:closeOnClickAction="true"  @select="selectClick"  @close="onClose"></u-action-sheet>
	</view>
</template>

<script>
	import pageJson from "@/pages.json"
	// console.log(PageJson.uniIdRouter.loginPage);
	import {
		giveName,
		giveAvatar,
		likeFun
	} from "../../utils/tools.js"
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database();
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: true
	}); //dlcoud文档云对象 ：自动显示交互界面 --》 取消自动展示的交互提示界面


	export default {
		data() {
			return {
				show:false,
				selectlist: [
							{
								name: "修改",
							},
							{
								name: "删除",
							}
						],
				artid: "",
				loadState: true,
				tagStyle: {
					p: "line-height:1.7em;font-size:16rpx;text-indent:2em;padding-bottom:10rpx",
					img: "margin:10rpx 0;" //图像之间产生间隔
				},
				// collections:[
				// 	 db.collection('quanzi_article').getTemp(),
				// 	 db.collection('uni-id-users').field("_id,username,nickname,avatar_file").getTemp()
				// ]
				detailObj: null,
				likeUserArr: [],
				commentObj: {
					article_id: "",
					comment_type: 0
				},
				commentList: [],
				noComment: false
			};
		},

		onLoad(e) {
			if (!e.id) {
				this.errFun();
				return;
			}
			this.artid = e.id;
			this.commentObj.article_id = e.id
			this.getData();
			this.readUpdate();
			this.getLikeUser();
			this.getComment();
			//正常情况下，谁速度快谁先获取到，先获取主体内容再获取评论
		},
		methods: {
			giveName,
			giveAvatar,
			
			
			
			selectClick(index){
						console.log(index);
						// let uid = uniCloud.getCurrentUserInfo().uid;
						// console.log(uid);
						// console.log(this.uniIDHasRole);
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
					url: '/pages/schoolnews/edit?id=' + this._id,
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
							url: '/pages/schoolnews/list'
							// url: './list'
						})
					}
				})
			},
			
			
			//评论成功后的回调
			PcommentEnv(e) {
				console.log(e);
				//向前插入新评论
				this.commentList.unshift({
					...this.commentObj,
					...e, //评论和内容
					user_id: [store.userInfo]
				})
			},

			//删除评论的回调
			PremoveEnv(e) {
				console.log(e);
				let index = this.commentList.findIndex(item => {
					return item._id == e.id
				})
				this.commentList.splice(index, 1)
			},
			//获取评论列表
			async getComment() {
				let commentTemp=db.collection("quanzi_comment")
								.where(`article_id == "${this.artid}" && comment_type==0`).orderBy("comment_date desc")
								.limit(20).getTemp();
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
				// db.collection(commentTemp, userTemp).get().then((res => {
				// 		console.log(res);
				// 		if (res.result.data == 0) this.noComment = true

				// 		this.commentList = res.result.data
				// 	})
				// db.collection("quanzi_comment").where(`article_id = "${this.artid}"`)
				// .orderBy("comment_date desc").limit(5).get().then(res=>{
				// 	console.log(res);
				// 	this.commentList = res.result.data
				// })
				//获取主评论的列表
				let res = await db.collection(commentTemp, userTemp).get()
                  //采集id
				let idArr = res.result.data.map(item => {
					return item._id
				})
                //groupField分组统计回复求和，遍历reply_comment_id和item._id ，拿到相等匹配的数据
				let replyArr = await db.collection("quanzi_comment").where({
						reply_comment_id: db.command.in(idArr)
					}).groupBy('reply_comment_id')
					.groupField('count(*) as totalReply').get();


				res.result.data.forEach(item => {
					let index = replyArr.result.data.findIndex(find => {
						return find.reply_comment_id == item._id
					})
					if (index > -1) item.totalReply = replyArr.result.data[index].totalReply
				})

				if (res.result.data == 0) this.noComment = true
				this.commentList = res.result.data

			},


			//获取部分点赞用户
			getLikeUser() {
				let likeTemp = db.collection("quanzi_like").where(`article_id == "${this.artid}"`).getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				db.collection(likeTemp, userTemp).orderBy("publish_date desc").limit(5).get().then(res => {
					console.log(res);
					res.result.data = res.result.data.reverse() //翻转数组 把最新点赞的用户头像放在最前面，才不会被压住
					this.likeUserArr = res.result.data
				})

				//  db.collection("quanzi_like").where(`article_id == "${this.artid}"`)
				// .get().then(res => {
				// 		console.log(res);
				// 	})
			},

			//点赞操作
			async clickLike() {
				if (!store.hasLogin) {
					uni.showModal({
						title: "登录后才可以进行操作",
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: "/" + pageJson.uniIdRouter.loginPage
								})
							}
						}
					})
					return;
				}

				//前端实现无感渲染处理异常恶意点击
				//判断两次点赞时间差 处理异常恶意点击
				let time = Date.now();
				if (time - this.likeTime < 2000) {
					uni.showToast({
						title: "操作太频繁，请稍后...",
						icon: "none"
					})
					return;
				}

				this.detailObj.isLike ? this.detailObj.like_count-- : this.detailObj.like_count++;
				// 负责按钮数量加减
				this.detailObj.isLike = !this.detailObj.isLike
				//负责按钮的高亮与非高亮的这个效果
				this.likeTime = time;
				//调用点赞方法
				likeFun(this.artid);
			},
			//点赞操作数据库的方法
			// async likeFun() {
			// 	let count = await db.collection("quanzi_like")
			// 		.where(`article_id=="${this.artid}" && user_id==$cloudEnv_uid`).count()
			// 	if (count.result.total) {
			// 		db.collection("quanzi_like").where(`article_id=="${this.artid}" && user_id==$cloudEnv_uid`)
			// 			.remove();
			// 		utilsObj.operation("quanzi_article", "like_count", this.artid, -1)
			// 	} else {
			// 		db.collection("quanzi_like").add({
			// 			article_id: this.artid
			// 		})
			// 		utilsObj.operation("quanzi_article", "like_count", this.artid, 1)
			// 	}

			// },
			//修改阅读量
			readUpdate() {
				utilsObj.operation("quanzi_article", "view_count", this.artid, 1).then(res => {
					console.log(res);
				})
			},
			//错误的处理
			errFun() {
				uni.showToast({
					title: "参数有误",
					icon: "none"
				})
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/index/index"
					})
				}, 1000)
			},

			//获取数据库数据
			getData() {
				let artTemp = db.collection("quanzi_article").where(`_id=="${this.artid}"`).getTemp();
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
				let likeTemp = db.collection("quanzi_like").where(
						`article_id=="${this.artid}" && user_id==$cloudEnv_uid`)
					.getTemp();

				let tempArr = [artTemp, userTemp];
				if (store.hasLogin) tempArr.push(likeTemp)


				db.collection(...tempArr).get({
					getOne: true
				}).then(res => {
					console.log(res);
					if (!res.result.data) {
						this.errFun();
						return;
					}
					this.loadState = false;
					let isLike = false;
					if (store.hasLogin) isLike = res.result.data._id.quanzi_like.length ? true : false;
					res.result.data.isLike = isLike;
					this.detailObj = res.result.data
					uni.setNavigationBarTitle({
						title: this.detailObj.title
					})
				}).catch(err => {
					this.errFun();
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		background: #f8f8f8;
		min-height: calc(100vh - var(--window-top));

		.container {
			padding: 30rpx;
			background: #fff;

			.title {
				font-size: 46rpx;
				color: #333;
				line-height: 1.4em;
				font-weight: 600;
			}

			.userinfo {
				padding: 20rpx 0 50rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					padding-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.text {
					font-size: 28rpx;
					color: #555;

					.small {
						font-size: 20rpx;
						color: #999;
						justify-content: space-between;
					}
				}
				 
			}
			.more {
				padding: 5rpx;
			
				.iconfont {
					font-size: 50rpx;
					color: #888;
				}
			}

			.content {}

			.like {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 80rpx 50rpx 50rpx;

				.btn {
					width: 260rpx;
					height: 120rpx;
					background: #e4e4e4;
					border-radius: 100rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 28rpx;

					.iconfont {
						font-size: 50rpx;
					}

					&.active {
						background: #0199FE;
					}
				}

				.text {
					font-size: 26rpx;
					color: #666;

					.num {
						color: #0199FE
					}

					.spot {
						padding: 0 10rpx;
					}
				}

				.users {
					display: flex;
					justify-content: center;
					padding: 30rpx 0;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						border: 3px solid #fff;
						margin-left: -20rpx;
					}
				}
			}

		}

		.comment {
			padding: 30rpx;
			padding-bottom: 120rpx;

			.item {
				padding: 10rpx 0;
			}
		}

	}
</style>
