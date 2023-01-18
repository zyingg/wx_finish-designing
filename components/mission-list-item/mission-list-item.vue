<template>
	<view>
		<u-modal @cancel="() => {this.showModal = false;}" @confirm="confirmRobOrder"
		  content="确认接单？" v-model="showModal" :show-cancel-button="true" :title-style="{color: 'blue'}">
		</u-modal>
		<uni-list-item clickable @click="handleItemClick(item._id)" v-for="item in listData">
			<!-- 自定义 header -->
			<view slot="header" class="slot-box">
				<image style="width: 72rpx; height: 72rpx;" class="slot-image" :src="item.run_thumb" mode="widthFix">
				</image>
			</view>
			<!-- 自定义 body -->
			<view slot="body" class="slot-box slot-text"
				style="width: calc(100% - 152rpx);font-size: 28rpx;margin-left: 28rpx;">
				<view>{{item.runname}}</view>
				<view>{{item.run_price}}元 |
				 <uni-dateformat :date="item.add_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]"></uni-dateformat>
				 </view>
			</view>
			<!-- 自定义 footer-->
			<!-- <template slot="footer">
				<u-button @click.prevent="() => {this.showModal = true;}" hover-class="none" class="robOrder"
					shape="circle">接</u-button>
			</template> -->
		</uni-list-item>
	</view>
</template>

<script>
	export default {
		name: 'MissionListItem',
		props: ['listData'],
		methods: {
			handleItemClick(id) {
			  uni.navigateTo({
			    url: './detail?id=' + id
			  })
			},
			// clickMissionOrder: () => {
			// 	uni.navigateTo({
			// 		url: '/pages/runtake/list'
			// 	});
			// },
			confirmRobOrder: function() {
				uni.showToast({
					duration: 1500,
					icon: 'success',
					title: '接单成功！',
					mask: true
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/runtake/list'});
				}, 1500);
			}
		},
		data() {
			return {
				showModal: false
			}
		}
	}
</script>

<style lang="scss">
	.robOrder {
		button::after {
			border: none !important;
		}
	}
</style>
