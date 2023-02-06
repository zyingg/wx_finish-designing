<template>
<view class="template-myblog tn-safe-area-inset-bottom">

    <!-- 顶部自定义导航 -->
    <tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="none">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">

      </view>
    </tn-nav-bar>
    

    <view class="top-backgroup">
      <image src='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-01813fee-cca5-4ed5-9744-69ac795fe83c/b9c5a5c7-86c7-4fc6-81e1-58a3b0c3169d.png' mode='widthFix' class='backgroud-image'></image>
    </view>


    <button>
      <view class="dong">
        <view class="monster">
          <view class="monster__face">
            <view class="monster__eye avatar-eye avatar-eye--green eye--left">
              <view class="avatar-eye-pupil pupil--green"><span class="avatar-eye-pupil-blackThing"><span
                    class="avatar-eye-pupil-lightReflection"></span></span></view>
            </view>
            <view class="monster__eye avatar-eye avatar-eye--violet eye--right">
              <view class="avatar-eye-pupil pupil--pink"><span class="avatar-eye-pupil-blackThing"><span
                    class="avatar-eye-pupil-lightReflection"></span></span></view>
            </view>
            <view class="monster__noses">
              <view class="monster__nose"></view>
              <view class="monster__nose"></view>
            </view>
            <view class="monster__mouth">
              <view class="monster__top"></view>
              <view class="monster__bottom"></view>
            </view>
          </view>
        </view>
      </view>
    </button>

    <view class="about__wrap">
	
      <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom">
        <view class="justify-content-item">
          <view class="tn-flex tn-flex-col-center tn-flex-row-left" @click.capture="toUserInfo">
            <!-- 图标logo -->
            <view class="logo-pic tn-shadow">
              <view class="logo-image">
				  <cloud-image width="120rpx" height="120rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url"
				  	:src="userInfo.avatar_file.url"></cloud-image>
					<image v-else src="/static/logo.png" mode="widthFix"></image>
              </view>
            </view>
            <view class="tn-padding-right tn-color-white">
              <view class="tn-padding-right tn-padding-left-sm tn-text-xxl">
               <text v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
               <text v-else>{{'请登录'}}</text>
              </view>
              <view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis">小伙伴你好吖</view>
            </view>

          </view>
        </view>
      </view>

      <!-- 更多信息-->
      <view class="about-shadow tn-margin-top-xl tn-padding-top-sm tn-padding-bottom-sm tn-color-black tn-bg-white">
        <view class="tn-flex tn-flex-row-center tn-radius">
          <view class="tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-icon-identity"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">我的信息</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-icon-comment"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">我的评论</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-icon-ticket"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">收藏文章</text>
              </view>
            </view>
          </view>
          <view class="tn-padding-sm tn-margin-xs tn-radius">
            <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
              <view class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center">
                <view class="tn-icon-star"></view>
              </view>
              <view class="tn-text-center">
                <text class="tn-text-ellipsis">我的关注</text>
              </view>
            </view>
          </view>
        </view>
        
      </view>
		<!-- 方式12 end-->

      <!-- 更多信息-->
      <view class="about-shadow tn-margin-top-xl tn-padding-top-sm tn-padding-bottom-sm">
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="toAbout">
        	<view class="tn-flex tn-flex-col-center">
        		<view
        			class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-16 tn-color-white">
        			<view class="tn-icon-vip-fill"></view>
        		</view>
        		<view class="tn-margin-left-sm tn-flex-1">关于</view>
        		<view class="tn-margin-left-sm tn-color-orangeyellow tn-icon-creative"></view>
        	</view>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="toSettings">
        	<view class="tn-flex tn-flex-col-center">
        		<view
        			class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-6 tn-color-white">
        			<view class="tn-icon-set-fill"></view>
        		</view>
        		<view class="tn-margin-left-sm tn-flex-1">设置</view>
        		<view class="tn-margin-left-sm tn-color-red tn-icon-fire-fill"></view>
        	</view>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="checkVersion">
        	<view class="tn-flex tn-flex-col-center">
        		<view
        			class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-2 tn-color-white">
        			<view class="tn-icon-set-fill"></view>
        		</view>
        		<view class="tn-margin-left-sm tn-flex-1">检查更新</view>
        		<view class="tn-margin-left-sm tn-color-gray">懒</view>
        	</view>
        </tn-list-cell>
		<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" open-type="contact">
          <view class="tn-flex tn-flex-col-center">
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-16 tn-color-white">
              <view class="tn-icon-wechat-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">合作勾搭</view>
            <view class="tn-margin-left-sm tn-color-cyan tn-icon-link"></view>
          </view>
        </tn-list-cell>
        <tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="toFeedBack()">
          <view class="tn-flex tn-flex-col-center" >
            <view
              class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-8 tn-color-white">
              <view class="tn-icon-message-fill"></view>
            </view>
            <view class="tn-margin-left-sm tn-flex-1">问题反馈</view>
            <view class="tn-margin-left-sm tn-color-blue tn-icon-copy-fill"></view>
          </view>
        </tn-list-cell>
      </view>
    </view>
	<view class="tn-padding-bottom"></view>
	<tn-tabbar
	  :value="2"
	  :list="tabbarList"
	  activeColor="#838383"
	  inactiveColor="#AAAAAA"
	  activeIconColor="tn-cool-bg-color-7"
	  :animation="true"
	  :safeAreaInsetBottom="true"
	  @toIndex="toIndex"
	></tn-tabbar>
  </view>
</template>
<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare()
	// #endif
	const db 				= uniCloud.database()
	export default {
		// #ifdef APP
		onBackPress({
			from
		}) {
			if (from == 'backbutton') {
				this.$nextTick(function() {
					uniShare.hide()
				})
				return uniShare.isShow;
			}
		},
		// #endif
		data() {
			return {
				// 底部tabbar菜单数据
				tabbarList: [
				  {
				    title: '首页',
				    activeIcon: 'home',
				    inactiveIcon: 'home-fill'
				  },
				  {
				    title: '发布',
				    activeIcon: 'discover-planet',
				    inactiveIcon: 'discover-planet-fill',
					activeIconColor: '#FFFFFF',
					inactiveIconColor: '#FFFFFF',
					iconSize: 50,
					out: true
				  },
				  {
				    title: '我的',
				    activeIcon: 'my',
				    inactiveIcon: 'my-fill',
				    dot: false
				  }
				],
			}
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
			
		},
		async onLoad() {
			uni.hideTabBar()
		},
		onShow(){
			let that = this;
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			...mapMutations({
				setUserInfo: 'user/login'
			}),
			async toIndex(index) {
				if (index == 0) {
					uni.switchTab({
						url: '/pages/list/list'
					})
				} else if (index == 1) {
					uni.switchTab({
						url: '/pages/share/share'
					})
				}
			},
			// 列表的跳转
			navigate(item){
				if(item.url){
					uni.navigateTo({
						url: item.url
					})
				}else return
			},
			
			// 跳转到设置
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			// 跳转到关于
			toAbout() {
				uni.navigateTo({
					url: "/pages/ucenter/about/about"
				})
			},
			signIn() { //普通签到
				this.$refs.signIn.open()
			},
			signInByAd(){ //看激励视频广告签到
				this.$refs.signIn.showRewardedVideoAd()
			},
			// 检查更新
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			// 跳转到用户信息
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},
			// 跳转到反馈界面
			toFeedBack(){
				uni.navigateTo({
					url:'/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback'
				})
			},
			/**
			 * 去应用市场评分
			 */
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					// 这里填写appstore应用id
					let appstoreid = this.appConfig.marketId.ios; // 'id1417078253';
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8');
				}
				if (uni.getSystemInfoSync().platform == "android") {
					var Uri = plus.android.importClass("android.net.Uri");
					var uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android);
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent(Intent.ACTION_VIEW, uri);
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				}
				// #endif
			},
			/**
			 * 获取积分信息
			 */
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: '请登录',
					icon: 'none'
				});
				uni.showLoading({
					mask: true
				})
				db.collection("uni-id-scores")
					.where('"user_id" == $env.uid')
					.field('score,balance')
					.orderBy("create_date", "desc")
					.limit(1)
					.get()
					.then((res) => {
						console.log(res);
						const data = res.result.data[0];
						let msg = '';
						msg = data ? ('当前积分为'+ data.balance) : '您还没有积分';
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}).finally(()=>{
						uni.hideLoading()
					})
			},
			async share() {
				let {
					result
				} = await uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'getUserInviteCode'
					}
				})
				console.log(result);
				let myInviteCode = result.myInviteCode || result.userInfo.my_invite_code
				console.log(myInviteCode);
				let {
					appName,
					logo,
					company,
					slogan
				} = this.appConfig.about
				// #ifdef APP-PLUS
				uniShare.show({
					content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: this.appConfig.h5.url +
							`/#/pages/ucenter/invite/invite?code=uniInvitationCode:${myInviteCode}`,
						title: appName,
						summary: slogan,
						imageUrl: logo +
							'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
							"img": "/static/app-plus/sharemenu/wechatfriend.png",
							"text": '分享给朋友',
							"share": {
								"provider": "weixin",
								"scene": "WXSceneSession"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/wechatmoments.png",
							"text": '分享到朋友圈',
							"share": {
								"provider": "weixin",
								"scene": "WXSceneTimeline"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/weibo.png",
							"text": '分享到微博',
							"share": {
								"provider": "sinaweibo"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/qq.png",
							"text": "QQ",
							"share": {
								"provider": "qq"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/copyurl.png",
							"text": '复制链接',
							"share": "copyurl"
						},
						{
							"img": "/static/app-plus/sharemenu/more.png",
							"text": '更多',
							"share": "shareSystem"
						}
					],
					cancelText: '取消分享',
				}, e => { //callback
					console.log(e);
				})
				// #endif
			},

		}
	}
</script>

<style lang="scss" scoped>
.template-myblog {}
  
  /* 自定义导航栏内容 start */
  .custom-nav {
    height: 100%;
    
    &__back {
      margin: auto 5rpx;
      font-size: 40rpx;
      margin-right: 10rpx;
      flex-basis: 5%;
      width: 100rpx;
      position: absolute;
    }
  }
  /* 自定义导航栏内容 end */

  /* 顶部背景图 start */
  .top-backgroup {
    height: 450rpx;
    z-index: -1;

    .backgroud-image {
      width: 100%;
      height: 667rpx;
      // z-index: -1;
    }
  }

  /* 顶部背景图 end */

  /* 用户头像 start */
  .logo-image {
    width: 120rpx;
    height: 120rpx;
    position: relative;
  }

  .logo-pic {
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment:fixed;
    background-position: top;
    border-radius: 50%;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  /* 页面 start*/
  .about-shadow {
    border-radius: 15rpx;
    box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
  }

  .about {

    &__wrap {
      position: relative;
      z-index: 1;
      margin: 20rpx 30rpx;
      margin-top: -230rpx;
    }
  }

  /* 页面 end*/

  /* 图标容器1 start */
  .icon1 {
    &__item {
      // width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;

      &--icon {
        width: 40rpx;
        height: 40rpx;
        font-size: 28rpx;
        border-radius: 50%;
        position: relative;
        z-index: 1;

        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg.png);
        }
      }
    }
  }

  /* 图标容器1 end */

  /* 底部tabbar start*/
  .footerfixed {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;
    background-color: #FFFFFF;
    box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.07);
  }

  .tabbar {
    display: flex;
    align-items: center;
    min-height: 110rpx;
    justify-content: space-between;
    padding: 0;
    height: calc(110rpx + env(safe-area-inset-bottom) / 2);
    padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  }

  .tabbar .action {
    font-size: 22rpx;
    position: relative;
    flex: 1;
    text-align: center;
    padding: 0;
    display: block;
    height: auto;
    line-height: 1;
    margin: 0;
    overflow: initial;
  }

  .bar-center {
    animation: suspension 3s ease-in-out infinite;
  }

  @keyframes suspension {

    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-0.8rem);
    }
  }

  .tabbar .action .bar-icon {
    width: 100rpx;
    position: relative;
    display: block;
    height: auto;
    margin: 0 auto 10rpx;
    text-align: center;
    font-size: 42rpx;
    // line-height: 50rpx;
  }

  .tabbar .action .bar-icon image {
    width: 50rpx;
    height: 50rpx;
    display: inline-block;
  }

  .tabbar .action .bar-circle {
    position: relative;
    display: block;
    margin: 0rpx auto 0rpx;
    text-align: center;
    font-size: 52rpx;
    line-height: 90rpx;
    // background-color: #01BEFF;
    width: 100rpx !important;
    height: 100rpx !important;
    overflow: hidden;
    // border-radius: 50%;
    // box-shadow: 0px 10px 30px rgba(70,23,129, 0.12),
    //   0px -8px 40px rgba(255, 255, 255, 1),
    //   inset 0px -10px 10px rgba(70,23,129, 0.05),
    //   inset 0px 10px 20px rgba(255, 255, 255, 1);
    // box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(1, 190, 255, 0.5);
  }

  .tabbar .action .bar-circle image {
    width: 100rpx;
    height: 100rpx;
    display: inline-block;
    margin: 0rpx auto 0rpx;
  }

  /* 流星+悬浮 */
  .nav-index-button {
    animation: suspension 3s ease-in-out infinite;
    z-index: 999999;


    &__content {
      position: absolute;
      width: 100rpx;
      height: 100rpx;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &--icon {
        width: 100rpx;
        height: 100rpx;
        font-size: 60rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;
        transform: scale(0.85);

        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          // background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg6.png);
        }
      }
    }

    &__meteor {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100rpx;
      height: 100rpx;
      transform-style: preserve-3d;
      transform: translate(-50%, -50%) rotateY(75deg) rotateZ(10deg);

      &__wrapper {
        width: 100rpx;
        height: 100rpx;
        transform-style: preserve-3d;
        animation: spin 20s linear infinite;
      }

      &__item {
        position: absolute;
        width: 100rpx;
        height: 100rpx;
        border-radius: 1000rpx;
        left: 0;
        top: 0;

        &--pic {
          display: block;
          width: 100%;
          height: 100%;
          background: url(https://tnuiimage.tnkjapp.com/cool_bg_image/arc1.png) no-repeat center center;
          background-size: 100% 100%;
          animation: arc 4s linear infinite;
        }
      }
    }
  }


  @keyframes suspension {

    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-0.6rem);
    }
  }

  @keyframes spin {
    0% {
      transform: rotateX(0deg);
    }

    100% {
      transform: rotateX(-360deg);
    }
  }

  @keyframes arc {
    to {
      transform: rotate(360deg);
    }
  }


  /* 图标容器12 start */
  .icon12 {
    &__item {
      width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;

      &--icon {
        width: 100rpx;
        height: 100rpx;
        font-size: 60rpx;
        // border-radius: 50%;
        margin-bottom: 0rpx;
        position: relative;
        z-index: 1;

        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          // background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg.png);


        }
      }
    }
  }

  /* 图标容器11 start */
  .icon11 {
    &__item {
      width: 30%;
      background-color: #FFFFFF;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 20rpx 10rpx;
      transform: scale(1);
      transition: transform 0.3s linear;
      transform-origin: center center;

      &--icon {
        width: 100rpx;
        height: 100rpx;
        font-size: 60rpx;
        border-radius: 50%;
        margin-bottom: 18rpx;
        position: relative;
        z-index: 1;

        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg.png);
        }
      }
    }
  }

  /* 大嘴鸟*/
  .dong {
    z-index: 9999;
    position: fixed;
    top: -40px;
    right: -80px;
    transform: scale(0.24);
    -webkit-transform: scale(0.24);
    -moz-transform: scale(0.24);

  }

  .monster {
    transform: rotate(-50deg);
    -ms-transform: rotate(-50deg);
    /* IE 9 */
    -moz-transform: rotate(-50deg);
    /* Firefox */
    -webkit-transform: rotate(-50deg);
    /* Safari 和 Chrome */
    -o-transform: rotate(-50deg);
    /* Opera */
    display: flex;
    justify-content: center;
    position: relative;
    width: 170px;
    height: 400px;
    border-top-left-radius: 200px;
    border-top-right-radius: 200px;
    background-color: #3C47D7;
    box-shadow: 20px 20px 60px #4650E5;
  }

  .monster__face {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 14%;
    width: 75%;
    height: 160px;
  }

  .monster__noses {
    top: 50%;
    display: flex;
    justify-content: space-between;
    width: 28%;
    height: auto;
    margin-bottom: 10px;
  }

  .monster__nose {
    width: 8px;
    height: 12px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.1);
  }

  .monster__mouth {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 0%;
    overflow: hidden;
    border: 25px solid #FFC333;
    border-radius: 100px;
    background-color: #810332;
    animation: mouth 1.75s infinite;
    box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
  }

  .monster__mouth::before {
    content: '';
    position: absolute;
    width: 150px;
    height: 80px;
    border-radius: 100px;
    background-color: #400018;
  }

  .monster__mouth::after {
    content: '';
    position: absolute;
    bottom: -80px;
    width: 160px;
    height: 80px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background-color: #DC1B50;
    animation: tongue 1.75s infinite;
  }

  .monster__top {
    position: absolute;
    top: -30px;
    width: 170px;
    height: 30px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #ffffff;
    z-index: 100;
    animation: t 1.75s infinite;
  }

  .monster__bottom {
    position: absolute;
    bottom: 0;
    width: 100px;
    height: 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #ffffff;
    z-index: 100;
    animation: b 1.75s infinite;
  }


  .avatar-eye {
    position: absolute;
    top: -10%;
    width: 65px;
    height: 65px;
    background: linear-gradient(105deg, white, #cb87f4);
    border-radius: 100%;
    box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
    margin: 3px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }


  .avatar-eye--green {
    background: linear-gradient(to bottom, #fdfdfd, #c3efea);
  }

  .avatar-eye--violet {
    background: linear-gradient(to bottom, #fdfdfd, #e6d6f6);
  }


  .eye--left {
    left: 10%;
  }

  .eye--right {
    left: 85%;
  }

  .eye--center {
    left: 45%;
    top: 10%;
  }

  .avatar-eye-pupil {
    position: absolute;
    width: 55%;
    height: 55%;
    left: 50%;
    top: 25%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    z-index: 100;
    border-radius: 100%;
  }


  .pupil--green {
    background: linear-gradient(135deg, rgba(188, 248, 177, 0.7), #2fa38c 75%);
  }

  .pupil--pink {
    background: linear-gradient(135deg, #f1a183, #8535cd);
  }


  .avatar-eye-pupil-blackThing {
    position: absolute;
    width: 55%;
    height: 55%;
    left: 50%;
    top: 25%;
    background: #2c2f32;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    border-radius: 100%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .avatar-eye-pupil-lightReflection {
    position: absolute;
    width: 7px;
    height: 7px;
    left: 25%;
    top: 10%;
    background: #ebebeb;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    border-radius: 100%;
    box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.2);
  }





  /**/
  @keyframes t {

    0%,
    10%,
    80%,
    100% {
      top: -30px;
    }

    20% {
      top: 0px;
    }

    30% {
      top: -20px;
    }

    40% {
      top: -0px;
    }

    50% {
      top: -25px;
    }

    70% {
    		top: 0px;
    }
  }

  @keyframes b {

    0%,
    10%,
    80%,
    100% {
      bottom: -30px;
    }

    20% {
      bottom: 0px;
    }

    30% {
      bottom: -20px;
    }

    40% {
      bottom: -0px;
    }

    50% {
      bottom: -25px;
    }

    70% {
      bottom: 0px;
    }
  }

  @keyframes mouth {

    0%,
    10%,
    100% {
      width: 100%;
      height: 0%;
    }

    15% {
      width: 90%;
      height: 30%;
    }

    20% {
      width: 50%;
      height: 70%;
    }

    25% {
      width: 70%;
    	 height: 70%;
    }

    30% {
    		width: 80%;
      height: 60%;
    }

    35% {
      width: 60%;
      height: 70%;
    }

    40% {
      width: 55%;
      height: 75%;
    }

    45% {
    		width: 50%;
      height: 90%;
    }

    50% {
      width: 40%;
      height: 70%;
    }

    55% {
      width: 70%;
      height: 95%;
    }

    60% {
    	 width: 40%;
      height: 50%;
    }

    65% {
      width: 100%;
      height: 60%;
    }

    70% {
      width: 100%;
      height: 70%;
    }

    75% {
      width: 90%;
      height: 70%;
    }

    80% {
      width: 50%;
      height: 70%;
    }

    85% {
      width: 90%;
      height: 50%;
    }

    85% {
      width: 40%;
      height: 70%;
    }

    90% {
      width: 90%;
      height: 30%;
    }

    95% {
      width: 100%;
      height: 10%;
    }
  }

  @keyframes tongue {

    0%,
    20%,
    100% {
      bottom: -80px;
    }

    30%,
    90% {
    		bottom: -40px;
    }

    40% {
      bottom: -45px;
    }

    50% {
      bottom: -50px;
    }

    70% {
      bottom: -80px;
    }

    90% {
      bottom: -40px;
    }
  }
</style>
