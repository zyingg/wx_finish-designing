<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="category_id" label="商品类别">
				<uni-data-picker v-model="formData.category_id" collection="secondgoods-categories"
					field="_id as value, classname as text"></uni-data-picker>
			</uni-forms-item>

			<uni-forms-item name="name" label="名称">
				<uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="keywords" label="关键字">
				<uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="price" label="价格">
				<uni-easyinput placeholder="如：2208元/套" v-model="formData.price" trim="both"></uni-easyinput>
			</uni-forms-item>

			<uni-forms-item name="goods_desc" label="详细描述">

				<uni-easyinput type="textarea" autoHeight placeholder="商品详细描述" v-model="formData.goods_desc"
					trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="goods_banner_imgs" label="照片">
				<uni-file-picker file-mediatype="image" file-extname="jpg,png" :limit="9" return-type="array"
					v-model="formData.goods_banner_imgs"></uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="remain_count" label="库存数量">
				<uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="contact" label="联系方式">
				<uni-easyinput placeholder="联系方式" v-model="formData.contact" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="checked" label="状态">
				<uni-data-checkbox v-model="formData.checked" :localdata="formOptions.checked_localdata">
				</uni-data-checkbox>
			</uni-forms-item>

			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
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
			if (fields.indexOf(key) > -1) {
				result[key] = validator[key]
			}
		}
		return result
	}



	export default {
		data() {
			let formData = {
				"user_id": "",
				"category_id": "",
				"name": "",
				"keywords": "",
				"price": "",
				"goods_desc": "",
				"goods_banner_imgs": [],
				"remain_count": null,
				"contact": "",
				"checked": 0,
				"add_date": null,
				"last_modify_date": null
			}
			return {
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

			/**
			 * 验证表单并提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
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
					"user_id,category_id,name,keywords,price,goods_desc,goods_banner_imgs,remain_count,contact,checked,add_date,last_modify_date"
					).get().then((res) => {
					const data = res.result.data[0]
					if (data) {
						this.formData = data

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
