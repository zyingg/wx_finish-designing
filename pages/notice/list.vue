<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList" field="user_id,title,content,excerpt,article_status,avatar,publish_date,last_modify_date,mode">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="data">
        <uni-list>
          <uni-list-item direction="row" v-for="(item, index) in data" :key="index" showArrow :clickable="true" @click="handleItemClick(item._id)">
            <template v-slot:header>
            						<view class="uni-thumb">
            							<!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
            							<image :src="item.avatar.url" mode="aspectFill"></image>
            						</view>
            					</template>
			<!-- <template v-slot:body>
              <text>
                
                {{item.title}}
				{{$u.timeFormat(item.publish_date) }}
              </text>
            </template> -->
			<template #body>
				<view class="shop">
					<view>
						<view class="uni-title">
							<text class="uni-ellipsis-2"> {{item.title}}</text>
						</view>
					</view>
					<view>
						<view class="shop-price">
							 
							<text class="shop-price-text">{{$u.timeFormat(item.publish_date) }}</text>
						</view>
					</view>
				</view>
			</template>
          </uni-list-item>
        </uni-list>
      </view>
      <uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
    </unicloud-db>
	<view v-if="uniIDHasRole('webadmin') || uniIDHasRole('admin')" class="add" @click="fabClick">
		<text class="iconfont icon-a-21-xiugai"></text>
	</view>
<!--    <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" /> -->
  </view>
</template>

<script>
  const db = uniCloud.database()
  export default {
    data() {
      return {
        collectionList: "notice",
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        }
      }
    },
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.udb.loadMore()
    },
    methods: {
      handleItemClick(id) {
        uni.navigateTo({
          url: './detail?id=' + id
        })
      },
      fabClick() {
        // 打开新增页面
        uni.navigateTo({
          url: './add',
          events: {
            // 监听新增数据成功后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	 
	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.shop {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
 
	.shop-price {
		margin-top: 5px;
		font-size: 12px;
		color: #000000;
	}
	
	.shop-price-text {
		font-size: 16px;
	}
</style>
