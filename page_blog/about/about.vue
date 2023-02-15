<template>

	<view class="about">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
		  <view slot="back" class='tn-custom-nav-bar__back'>
			<text @click="goBack" class='tn-icon tn-icon-left'></text>
			<text @click="goHome" class='tn-icon tn-icon-home-capsule-fill'></text>
		  </view>
		</tn-nav-bar>
		<view class="top-backgroup">
			<image
				src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8059ac71-13c5-4a15-bec8-3ac9f98f0840/8fbf8ef2-7bca-4675-9dab-32c5a0647744.jpg'
				mode='widthFix' class='backgroud-image'></image>
		</view>
		
		<view class="box">
			<view class="tn-flex">
			  <view class="tn-flex-1 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<image class="logoImg" :src="'../../static/icon/school.png'"></image>
			  <view class="tn-flex-1 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
			</view>
			<view class="tn-flex">
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<text class="tip appName"> 关于我们 </text>
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
			</view>
			<view class="tn-flex">
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<text class="tip">Version {{version}}</text>
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
			</view>
			<view class="tn-flex">
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<!--Sansnn-uQRCode组件来源，插件市场：https://ext.dcloud.net.cn/plugin?id=1287 微调后-->
					<!-- <Sansnn-uQRCode :text="about.download" :makeOnLoad="true" class="qrcode"></Sansnn-uQRCode> -->
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
			</view>
			<view class="tn-flex">
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<text class="tip">appName</text>
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
			</view>


		</view>
		<view class="tn-flex">
		  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
				<!-- <view class="agreement-box" v-for="(agreement,index) in about.agreements" :key="index">
					<text class="agreement" @click="navigateTo(agreement)">《{{agreement.title}}》</text>
					<text class="hint" v-if="about.agreements.length-1>index"></text> -->
				<!-- </view> -->
		  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
		</view>
		<view class="tn-flex">
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<text class="hint">Copyright © {{year}}</text>
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
		</view>
		<view class="tn-flex">
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
					<text class="hint">  company </text>
			  <view class="tn-flex-3 tn-padding tn-margin-xs tn-radius bg-flex-shadow tn-shadow-blur"></view>
		</view>
	</view>
</template>
<script>
// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare()
// #endif
	export default {
		// #ifdef APP
		// onBackPress({from}) {
		// 	if(from=='backbutton'){
		// 		this.$nextTick(function(){
		// 			uniShare.hide()
		// 		})
		// 		return uniShare.isShow;
		// 	}
		// },
		// #endif
		onLoad() {
			// #ifdef APP-PLUS
			// this.version = plus.runtime.version
			// #endif
		},
		computed: {
			// uniStarterConfig() {
			// 	console.log(getApp());
			// 	return getApp().globalData.config
			// }
		},
		data() {
			return {
				version: "V1.0.1",
				year: "2023",
				about: {}
			};
		},
		// created() {
		// 	// this.about = this.uniStarterConfig.about
		// 	// uni.setNavigationBarTitle({
		// 	// 	title: '关于'+ " " + this.about.appName
		// 	// })
		// 	// this.year = (new Date).getFullYear()
		// },
		// onNavigationBarButtonTap() {
		// 	let {
		// 		download,
		// 		appName,
		// 		slogan,
		// 		logo
		// 	} = this.about
		// 	uniShare.show({
		// 		content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
		// 			type: 0,
		// 			href: download,
		// 			title: appName,
		// 			summary: slogan,
		// 			imageUrl: logo + '?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
		// 		},
		// 		menus: [{
		// 				"img": "/static/app-plus/sharemenu/wechatfriend.png",
		// 				"text": '微信朋友',
		// 				"share": {
		// 					"provider": "weixin",
		// 					"scene": "WXSceneSession"
		// 				}
		// 			},
		// 			{
		// 				"img": "/static/app-plus/sharemenu/wechatmoments.png",
		// 				"text":  '微信朋友圈',
		// 				"share": {
		// 					"provider": "weixin",
		// 					"scene": "WXSceneTimeline"
		// 				}
		// 			},
		// 			{
		// 				"img": "/static/app-plus/sharemenu/weibo.png",
		// 				"text":  '微博',
		// 				"share": {
		// 					"provider": "sinaweibo"
		// 				}
		// 			},
		// 			{
		// 				"img": "/static/app-plus/sharemenu/qq.png",
		// 				"text": "QQ",
		// 				"share": {
		// 					"provider": "qq"
		// 				}
		// 			},
		// 			{
		// 				"img": "/static/app-plus/sharemenu/copyurl.png",
		// 				"text": '复制链接',
		// 				"share": "copyurl"
		// 			},
		// 			{
		// 				"img": "/static/app-plus/sharemenu/more.png",
		// 				"text": '更多',
		// 				"share": "shareSystem"
		// 			}
		// 		],
		// 		cancelText: '取消分享',
		// 	}, e => { //callback
		// 		console.log(e);
		// 	})
		// },
		methods: {
			goBack(){
				uni.switchTab({
					url:"/pages/self/self"
				})
			},
			goHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
		
		}
	}
</script>
<style lang="scss" scoped>
	// @import '@/static/css/templatePage/custom_nav_bar.scss';
	/* 顶部背景图 start */
	.top-backgroup {
		height: 200rpx;
		z-index: -1;
	
		.backgroud-image {
			width: 100%;
			height: 100rpx;
			z-index: -1;
		}
	}
	



	.logoImg {
		margin-bottom: 10rpx;
		width: 160rpx;
		height: 160rpx;
		border-radius: 15px;
	}

	.tip {
		text-align: center;
		font-size: 24rpx;
		margin-top: 10px;
		padding: 10rpx;
	}

	.appName {
		margin-top: 20px;
		font-size: 42rpx;
		font-weight: 500;
		color: #2285ff;
	}

	.qrcode {
		margin-top: 60rpx;
	}

	.copyright {
		width: 750rpx;
		font-size: 32rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		bottom: 20px;
		left: 0;
		position: fixed;
	}

	.agreement-box {
		justify-content: center;
	}

	.agreement {
		color: #2285ff;
		font-size: 26rpx;
	}

	.hint {
		text-align: center;
		color: #999999;
		font-size: 26rpx;
	}
	.tn-custom-nav-bar__back {
	  width: 100%;
	  height: 100%;
	  position: relative;
	  display: flex;
	  justify-content: space-evenly;
	  align-items: center;
	  box-sizing: border-box;
	  background-color: rgba(0, 0, 0, 0.15);
	  border-radius: 1000rpx;
	  border: 1rpx solid rgba(255, 255, 255, 0.5);
	  color: #FFFFFF;
	  font-size: 18px;
	  
	  .icon {
	    display: block;
	    flex: 1;
	    margin: auto;
	    text-align: center;
	  }
	  
	  &:before {
	    content: " ";
	    width: 1rpx;
	    height: 110%;
	    position: absolute;
	    top: 22.5%;
	    left: 0;
	    right: 0;
	    margin: auto;
	    transform: scale(0.5);
	    transform-origin: 0 0;
	    pointer-events: none;
	    box-sizing: border-box;
	    opacity: 0.7;
	    background-color: #FFFFFF;
	  }
	}
</style>
