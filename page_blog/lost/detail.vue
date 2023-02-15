<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList"  :where="queryWhere" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view class="pic-box">
        
        			<image v-if="data.lost_thumb && data.lost_thumb.length" mode="aspectFill"
        				:src="data.lost_thumb[0].url"></image>
        			<image v-else mode="aspectFill" src="https://mp-70bea637-b880-4d22-8bea-1ce8ac441f79.cdn.bspapp.com/cloudstorage/59a3cdd7-0009-4eba-a3f2-d98ef4edb188.png"></image>
        		</view>
        		<view class="info-box goods-info">
        
        
        			<view class="info-box text-info">
        				<!-- <view class="price">￥../../static/icon/lost.png{{data.run_price}}</view> -->
        				<view class="title">
        					{{data.name}}
        				</view>
        
        
        				<view class="row">
        					<view class="leftxt">分类</view>
        					<view class="content"><text>{{data.category_id[0].text}}</text></view>
        				</view>
        				<view class="row">
        					<view class="leftxt">拾/失物地址</view>
        					<view class="content"> <text>{{data.lost_place}}</text> </view>
        				</view>
        			 
        
        				<view class="row">
        					<view class="leftxt">联系方式</view>
        					<view class="content"> <text>{{data.contact}}</text> </view>
        				</view>
        				<view class="row">
        					<view class="leftxt">详细描述</view>
        					<view class="content"> <text>{{data.lost_desc}}</text> </view>
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
        				<!-- 	<text class="iconfont icon-ellipsis"></text> -->
						<uni-icons type="more-filled" size="30"></uni-icons>

        				</view>
        
        			</view>
        
        
        			<!-- 详情 -->
        			 <view class="description">
        				<view class="title">———— 详情 ————</view>
              <view class="picurls"><template v-for="(file, j) in data.lost_thumb">
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
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/lost.js'
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
        collectionList:[
					db.collection('lost').field(
						'category_id,user_id,name,keywords,lost_desc,lost_place,contact,lost_thumb,add_date,last_modify_date'
					).getTemp(),
					db.collection('lost-categories').field('_id, name as text').getTemp()
				 
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
		console.log(e)
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
		padding: 20upx ;
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
				width: 30%;
				font-size: 15px;
				color: #a2a2a2;
				// margin-right: 20upx;
			}
			.content{
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
		// padding: 5rpx;
		float: right;

		.iconfont {
			font-size: 50rpx;
			color: #888;
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
	 
</style>
