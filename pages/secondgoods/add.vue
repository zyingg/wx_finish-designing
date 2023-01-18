<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="category_id" label="商品类别">
        <uni-data-picker v-model="formData.category_id" collection="secondgoods-categories" field="_id as value, classname as text"></uni-data-picker>
      </uni-forms-item>
    <!--  <uni-forms-item name="goods_sn" label="货号">
        <uni-easyinput placeholder="商品的唯一货号" v-model="formData.goods_sn" trim="both"></uni-easyinput>
      </uni-forms-item> -->
      <uni-forms-item name="name" label="名称">
        <uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="keywords" label="关键字">
        <uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="price" label="价格">
        <uni-easyinput placeholder="如：2208元/套" v-model="formData.price" trim="both"></uni-easyinput>
      </uni-forms-item>
     
      <uni-forms-item name="picurl" label="封面图">
        <uni-file-picker return-type="object" v-model="formData.picurl"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="remain_count" label="数量">
        <uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="contact" label="联系方式">
        <uni-easyinput placeholder="联系方式" v-model="formData.contact" trim="both"></uni-easyinput>
      </uni-forms-item>
	  <uni-forms-item name="goods_desc" label="详细描述">
		  <div id="div1"></div>
	   <!-- <uni-easyinput placeholder="商品详细描述" v-model="formData.goods_desc" trim="both"></uni-easyinput> -->
	  </uni-forms-item>
    <!--  <uni-forms-item name="checked" label="状态">
        <uni-data-checkbox v-model="formData.checked" :localdata="formOptions.checked_localdata"></uni-data-checkbox>
      </uni-forms-item> -->
     <!-- <uni-forms-item name="add_date" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.add_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="last_modify_date" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.last_modify_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="seller_note" label="">
        <uni-easyinput placeholder="商家备注，仅商家可见" v-model="formData.seller_note" trim="both"></uni-easyinput>
      </uni-forms-item> -->
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/secondgoods.js';
import E from 'wangeditor'
  const db = uniCloud.database();
  const dbCollectionName = 'secondgoods';
let editor = null;
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
        "category_id": "",
        "goods_sn": "",
        "name": "",
        "keywords": "",
        "price": "",
        "goods_desc": "",
        "picurl": null,
        "remain_count": null,
        "contact": "",
        "checked": true,
        "add_date": null,
        "last_modify_date": null,
        "seller_note": ""
      }
      return {
        formData,
        formOptions: {
          "checked_localdata": [
            {
              "value": true,
              "text": "显示"
            },
            {
              "value": false,
              "text": "隐藏"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    this.onWangEdit()
    },
    methods: {
    	//初始化wangedit
    	onWangEdit() {
    		const editor = new E('#div1');
    		editor.config.zIndex = 0
    		editor.config.onblur = (newHtml) => {
    			console.log(newHtml) // 获取最新的 html 内容
    			this.formData.goods_desc = newHtml
    		}
    		editor.config.customUploadImg = function(resultFiles, insertImgFn) {
    		
				resultFiles.forEach(item => {
    				let path = URL.createObjectURL(item);
    				let name = item.name;
					console.log(item);
					console.log(name);
    				uniCloud.uploadFile({
    					filePath: path,
    					cloudPath: name
    				}).then(res => {
    					insertImgFn(res.fileID)
    				})
    			})
    		}
    
    		editor.create()
    	},
    
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
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
