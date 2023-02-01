<template>
	<view class="edit">
		<!-- <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
 -->
			<view class="title">
				<input type="text" v-model="formData.title" placeholder-class="placeholderClass">
			</view>


			<!-- <div id="div1">
       			  <div v-html="formData.content"></div>
       </div> -->
			<!-- <uni-easyinput placeholder="文章内容" v-model="formData.content" trim="right"></uni-easyinput> -->
			<view class="content">
				<editor class="myEdit" placeholder="写点什么吧~~" show-img-size show-img-toolbar show-img-resize
					@ready="onEditReady" @focus="onFocus" @statuschange="onStatuschange">
				</editor>
			</view>

			<!-- <uni-forms-item name="excerpt" label="文章摘录">
        <uni-easyinput placeholder="文章摘录" v-model="formData.excerpt" trim="both"></uni-easyinput>
      </uni-forms-item> -->
			<!-- <uni-forms-item name="article_status" label="文章状态">
				<uni-data-checkbox v-model="formData.article_status" :localdata="formOptions.article_status_localdata">
				</uni-data-checkbox>
			</uni-forms-item> -->

			<!-- <view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view> -->
			<view class="btnGroup">
				<u-button @click="submit" type="primary" text="确认发表" :disabled="!formData.title.length"></u-button>
			</view>
			<view class="tools"v-if="toolShow">
				<view class="item" @click="clickHead">
					<text class="iconfont icon-zitibiaoti" :class="headShow ? 'active' : ''"></text> 
				</view>
				<view class="item" @click="clickBold">
					<text class="iconfont icon-zitijiacu" :class="boldShow ? 'active': ''"></text> 
				</view>
				<view class="item" @click="clickItalic">
					<text class="iconfont icon-zitixieti" :class="italicShow ? 'active' : ''"></text> 
				</view>
				<view class="item" @click="clickDivider"><text class="iconfont icon-fengexian"></text> </view>
				<view class="item" @click="clickInsertImage"><text class="iconfont icon-charutupian"></text> </view>
				<view class="item" @click="editOk"><text class="iconfont icon-duigou_kuai"></text> </view>
			</view>
		<!-- </uni-forms>
		 -->
	</view>
</template>

<script>
	// import {
	// 	validator
	// } from '../../js_sdk/validator/quanzi_article.js';
	import {getImgSrc,getProvince} from "@/utils/tools.js"	
	const db = uniCloud.database();
	const dbCollectionName = 'quanzi_article';
 

	// function getValidator(fields) {
	// 	let result = {}
	// 	for (let key in validator) {
	// 		if (fields.indexOf(key) > -1) {
	// 			result[key] = validator[key]
	// 		}
	// 	}
	// 	return result
	// }



	export default {
		data() {
			
			let formData = {
				"user_id": "",
				"title": "",
				"description": "",
				"province": "",
				"content": "",
				"excerpt": "",
				"article_status": 0,
				"delState": null,
				"state": null,
				"view_count": null,
				"like_count": null,
				"comment_count": null,
				// "last_comment_user_id": "",
				"picurls": [],
				// "publish_date": null,
				// "publish_ip": "",
				// "last_modify_date": null,
				// "last_modify_ip": ""
			}
			return {
				toolShow:false,
				headShow:false,
				boldShow:false,
				italicShow:false,
				formData,
				formOptions: {
					"article_status_localdata": [{
							"value": 0,
							"text": "草稿箱"
						},
						{
							"value": 1,
							"text": "已发布"
						}
					]
				},
				// rules: {
				// 	...getValidator(Object.keys(formData))
				// }
			}
		},
		onLoad(e) {
			if (e.id) {
				const id = e.id
				this.formDataId = id
				this.getDetail(id)
				// this.onEditReady()
			}
		},
		onReady() {
			// this.$refs.form.setRules(this.rules)
this.onEditReady()
		},
		methods: {


			/**
			 * 验证表单并提交
			 */
			// submit() {

			// 	uni.showLoading({
			// 		mask: true
			// 	})
			// 	this.$refs.form.validate().then((res) => {
			// 		return this.submitForm(res)
			// 	}).catch(() => {}).finally(() => {
			// 		uni.hideLoading()
			// 	})
			// },

			// /**
			//  * 提交表单
			//  */
			// submitForm(value) {
			// 	// value.content = editor.txt.html();
			// 	//   console.log('1')
			// 	// 使用 clientDB 提交数据
			// 	return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
			// 		uni.showToast({
			// 			title: '修改成功'
			// 		})
			// 		this.getOpenerEventChannel().emit('refreshData')
			// 		setTimeout(() => uni.navigateBack(), 500)
			// 	}).catch((err) => {
			// 		uni.showModal({
			// 			content: err.message || '请求服务失败',
			// 			showCancel: false
			// 		})
			// 	})
			// },
            submit(){
				this.editorCtx.getContents({
					success:res=>{
						 
						this.formData.content=res.html;
						this.formData.picurls=getImgSrc(res.html)
						uni.showLoading({
							title:"发布中..."
						})						
						this.addData();
					}
				})
			},
			
			addData( ){
				db.collection("quanzi_article").doc(this.formDataId).update({
					 title:this.formData.title,
					 content:this.formData.content,					 
				})
				.then(res=>{					
					uni.hideLoading();
					uni.showToast({
						title:"发布成功"
					})
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/quanzi_article/detail?id="+this.formDataId 
						})
					},800)
				})
			},
			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).field(
					"user_id,title,description,province,content,excerpt,article_status,delState,state,view_count,like_count,comment_count,last_comment_user_id,picurls,publish_date,publish_ip,last_modify_date,last_modify_ip"
					).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
						console.log(this.formData.content)
						 this.onEditReady()
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			//  //初始化编辑器
			//  onEditReady(){
			//  	uni.createSelectorQuery().in(this).select('.myEdit').fields({
			//  		size:true,
			//  		context:true
			//  	},res=>{					
			//  		this.editorCtx=res.context
			//  	}).exec()
			//  },
			// async onEditReady(){    
			//    await uni.createSelectorQuery().in(this).select('.myEdit').context((res) => {    
			//     this.editorCtx = res.context 
			// 	   console.log( res.context)
			// 	    // this.getDetail(id) 
			//      this.editorCtx.setContents({  
					      
			//                 html:this.formData.content 
							
			// 				//this.EditGoodsDetail.content为赋值内容。    
			//         })    
			//     }).exec()   
				 
			// },
			
			 onEditReady(){
			   uni.createSelectorQuery().in(this).select('.myEdit').fields({
					size:true,
					context:true
				},res=>{					
					this.editorCtx=res.context
					this.editorCtx.setContents({
					         html:this.formData.content 
         })  
				}).exec()
			},
			 
		 
			 




				checkStatus(name, detail, obj) {
						if (detail.hasOwnProperty(name)) {
							this[obj] = true;
						} else {
							this[obj] = false;
						}
					},


					// 当样式发生改变的时候
					onStatuschange(e) {
						let detail = e.detail
						this.checkStatus("header", detail, "headShow");
						this.checkStatus("bold", detail, "boldShow");
						this.checkStatus("italic", detail, "italicShow");
					},


					//添加图像
					clickInsertImage() {
						uni.chooseImage({
							success: async res => {

								uni.showLoading({
									title: "上传中请稍后",
									mask: true
								})
								for (let item of res.tempFiles) {
									let suffix = item.path.substring(item.path.lastIndexOf("."));
									let randomName = Date.now() + "" + String(Math.random()).substr(3, 6) +
										suffix

									let res = await uniCloud.uploadFile({
										filePath: item.path,
										cloudPath: item.name || randomName
									})
									this.editorCtx.insertImage({
										src: res.fileID
									})
								}
								uni.hideLoading()
							}
						})
					},


					//点击工具条的确认
					editOk() {
						this.toolShow = false;
					},

					//加粗
					clickBold() {
						this.boldShow = !this.boldShow
						this.editorCtx.format("bold")
					},

					//设置倾斜
					clickItalic() {
						this.italicShow = !this.italicShow;
						this.editorCtx.format("italic")
					},

					//添加大标题
					clickHead() {
						this.headShow = !this.headShow
						this.editorCtx.format("header", this.headShow ? 'H2' : false)
					},

					//添加分割线
					clickDivider() {
						this.editorCtx.insertDivider();
					},


					//离开焦点
					onFocus() {
						this.toolShow = true
					}
			}
		}
</script>

<style lang="scss">
/deep/ .ql-blank::before{
	font-style: normal;
	color:#e0e0e0;
}
	
	/* /deep/.title{
		input{
			height: 120rpx;
			font-size: 46rpx;
			border-bottom:1px solid #e4e4e4;
			margin-bottom:30rpx;
			color:#000;
			font-weight:400;
		}
		.placeholderClass{
			color:#e0e0e0;
		}
		}} */
	// .uni-container {
	// 	padding: 15px;
	// }

	// .uni-input-border,
	// .uni-textarea-border {
	// 	width: 100%;
	// 	font-size: 14px;
	// 	color: #666;
	// 	border: 1px #e5e5e5 solid;
	// 	border-radius: 5px;
	// 	box-sizing: border-box;
	// }

	// .uni-input-border {
	// 	padding: 0 10px;
	// 	height: 35px;

	// }

	// .uni-textarea-border {
	// 	padding: 10px;
	// 	height: 80px;
	// }

	// .uni-button-group {
	// 	margin-top: 50px;
	// 	/* #ifndef APP-NVUE */
	// 	display: flex;
	// 	/* #endif */
	// 	justify-content: center;
	// }

	// .uni-button {
	// 	width: 184px;
	// }

	// .placeholderClass {
	// 	color: #e0e0e0;
	// }

.edit{
	padding:30rpx;
	.title{
		input{
			height: 120rpx;
			font-size: 46rpx;
			border-bottom:1px solid #e4e4e4;
			margin-bottom:30rpx;
			color:#000;
		}
		.placeholderClass{
			color:#e0e0e0;
		}
	}
	.content{
		.myEdit{
			height: calc(100vh - 500rpx);
			margin-bottom:30rpx;
		}		
	}
	.tools{
		width: 100%;
		height: 80rpx;
		background: #fff;
		border-top:1rpx solid #f4f4f4;
		position: fixed;
		left:0;
		bottom:0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.iconfont{
			font-size: 36rpx;
			color:#333;
			&.active{
				color:#0199FE
			}
		}
	}
}

</style>
