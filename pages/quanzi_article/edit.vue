<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
 
	  <view class="title">
	  	<input type="text" v-model="formData.title"   placeholder-class="placeholderClass">
	  </view>
 
     
       <div id="div1">
       			  <div v-html="formData.content"></div>
       </div>
		<!-- <uni-easyinput placeholder="文章内容" v-model="formData.content" trim="right"></uni-easyinput>
 -->     
	  
     <!-- <uni-forms-item name="excerpt" label="文章摘录">
        <uni-easyinput placeholder="文章摘录" v-model="formData.excerpt" trim="both"></uni-easyinput>
      </uni-forms-item> -->
      <uni-forms-item name="article_status" label="文章状态">
        <uni-data-checkbox v-model="formData.article_status" :localdata="formOptions.article_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/quanzi_article.js';
import E from 'wangeditor'
  const db = uniCloud.database();
  const dbCollectionName = 'quanzi_article';
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
        "last_comment_user_id": "",
        "picurls": [],
        "publish_date": null,
        "publish_ip": "",
        "last_modify_date": null,
        "last_modify_ip": ""
      }
      return {
        formData,
        formOptions: {
          "article_status_localdata": [
            {
              "value": 0,
              "text": "草稿箱"
            },
            {
              "value": 1,
              "text": "已发布"
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
    this.onWangEdit()},
       methods: {
   	  //初始化wangedit
   	  onWangEdit(){
   		  editor = new E('#div1');
   		  editor.config.zIndex = 0
		  editor.config.height = 500
   		  editor.config.onblur = (newHtml) => {		    
   			  this.formData.content = newHtml
   		  }
   		  
   		  editor.config.customUploadImg = function (resultFiles, insertImgFn) {		      
   			  resultFiles.forEach(item=>{				  
   				  let path = URL.createObjectURL(item);
   				  let name = item.name;
   				  uniCloud.uploadFile({
   				  	filePath:path,
   					cloudPath:name
   				  }).then(res=>{					  
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
		 value.content = editor.txt.html();
		  //   console.log('1')
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
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
        db.collection(dbCollectionName).doc(id).field("user_id,title,description,province,content,excerpt,article_status,delState,state,view_count,like_count,comment_count,last_comment_user_id,picurls,publish_date,publish_ip,last_modify_date,last_modify_ip").get().then((res) => {
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
	/deep/.title{
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
		}}
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
