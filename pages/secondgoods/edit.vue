<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="category_id" label="分类">
				<uni-data-picker v-model="formData.category_id" collection="secondgoods-categories"
					field="_id as value, classname as text"></uni-data-picker>
			</uni-forms-item>
			<!--  <uni-forms-item name="goods_sn" label="货号">
        <uni-easyinput placeholder="商品的唯一货号" v-model="formData.goods_sn" trim="both"></uni-easyinput>
      </uni-forms-item> -->
			<uni-forms-item name="name" label="名称">
				<uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both"></uni-easyinput>
			</uni-forms-item>
			<!-- <uni-forms-item name="keywords" label="关键字">
        <uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both"></uni-easyinput>
      </uni-forms-item> -->
			<uni-forms-item name="price" label="价格">
				<uni-easyinput placeholder="如：2208元/套" v-model="formData.price" trim="both"></uni-easyinput>
			</uni-forms-item>
			<!-- <uni-forms-item name="picurl" label="封面图">
				<uni-file-picker return-type="object" v-model="formData.picurl"></uni-file-picker>
			</uni-forms-item> -->
			<uni-forms-item name="remain_count" label="数量">
				<uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="contact" label="联系方式">
				<uni-easyinput placeholder="联系方式" v-model="formData.contact" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="goods_desc" label="详细描述">
				<uni-easyinput placeholder="商品详细描述" v-model="formData.goods_desc" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="goods_banner_imgs" label="详情图片">
				<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @success="uploadSuccess">
				</uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="checked" label="状态">
				<uni-data-checkbox v-model="formData.checked" :localdata="formOptions.checked_localdata">
				</uni-data-checkbox>
			</uni-forms-item>
			<!-- <uni-forms-item name="add_date" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.add_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="last_modify_date" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.last_modify_date"></uni-datetime-picker>
      </uni-forms-item> -->
			<!-- <uni-forms-item name="seller_note" label="">
        <uni-easyinput placeholder="商家备注，仅商家可见" v-model="formData.seller_note" trim="both"></uni-easyinput>
      </uni-forms-item> -->
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit" >提交</button>
			</view>
<!-- disabled="true" -->
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/secondgoods.js';

	const db = uniCloud.database();
	const dbCollectionName = 'secondgoods';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			// if (fields.indexOf(key) > -1) {
			if (fields.includes(key)) {
				result[key] = validator[key]
			}
		}
		return result
	}



	export default {
		data() {
			let formData = {
				"category_id": "",
				"goods_sn": "",
				"name": "",
				"keywords": "",
				"price": "",
				"goods_desc": "",
				"picurl": null,
				"remain_count": null,
				"contact": "",
				"checked": 0,
				"add_date": null,
				"last_modify_date": null,
				"seller_note": "",
				"goods_banner_imgs": [],
			}
			return {
				imageValue: [],
				formData,
				formOptions: {
					"checked_localdata": [{
							"value": 0,
							"text": "显示"
						},
						{
							"value": 1,
							"text": "隐藏"
						}
					]
				},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onLoad(e) {
			if (e.id) {
				const id = e.id
				this.formDataId = id
				this.getDetail(id)
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)

		},
		methods: {
			uploadSuccess(e) {
				this.formData.goods_banner_imgs = e.tempFilePaths
				// this.formData.goods_banner_imgs.push(...e.tempFilePaths)
				console.log("上传图片成功")
			},

			/**
			 * 验证表单并提交
			 */
			submit() {

				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					//       console.log(res);
					// return;

					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				this.formData.goods_banner_imgs = this.imageValue.map(item => {
					return item.url;
					console.log(this.imageValue)
				})
				// 使用 clientDB 提交数据
				return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
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
					"category_id,goods_sn,name,keywords,goods_banner_imgs,price,goods_desc,picurl,remain_count,contact,checked,add_date,last_modify_date,seller_note"
				).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data
						if (!this.formData.goods_banner_imgs) return;
						let urls = this.formData.goods_banner_imgs.map(item => {
							return {
								url: item
							}
						})
						// this.formData.goods_banner_imgs = urls;
							this.imageValue=urls;
							console.log(this.imageValue)
						console.log(this.formData.goods_banner_imgs)
					}

				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		width: 184px;
	}
</style>
