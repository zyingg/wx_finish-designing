(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["page_blog-runtake-detail"],{"09ab":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={unicloudDb:n("960d").default,uniLoadMore:n("789b").default,uniDateformat:n("8d7b").default,uniIcons:n("f6de").default,uActionSheet:n("3f22").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("unicloud-db",{ref:"udb",attrs:{options:t.options,collection:t.collectionList,where:t.queryWhere,getone:!0,manual:!0},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data,a=e.loading,o=e.error;e.options;return[o?n("v-uni-view",[t._v(t._s(o.message))]):a?n("v-uni-view",[n("uni-load-more",{attrs:{contentText:t.loadMore,status:"loading"}})],1):i?n("v-uni-view",[n("v-uni-view",{staticClass:"info-box goods-info"},[n("v-uni-view",{staticClass:"info-box text-info"},[n("v-uni-view",{staticClass:"title"},[t._v(t._s(i.name))]),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("跑腿报酬")]),n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(i.run_price))])],1)],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("需求分类")]),n("v-uni-view",{staticClass:"content"},[n("v-uni-text",[t._v(t._s(i.category_id[0].text))])],1)],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("取货地址")]),n("v-uni-view",{staticClass:"content"},[n("v-uni-text",[t._v(t._s(i.take_place))])],1)],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("送货地址")]),n("v-uni-view",{staticClass:"content"},[n("v-uni-text",[t._v(t._s(i.run_place))])],1)],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("联系方式")]),n("v-uni-view",{staticClass:"content"},[n("v-uni-text",[t._v(t._s(i.contact))])],1)],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("详细描述")]),n("v-uni-view",{staticClass:"content"},[n("v-uni-text",[t._v(t._s(i.run_desc))])],1)],1),n("v-uni-view",{staticClass:"row"},[n("v-uni-view",{staticClass:"leftxt"},[t._v("发布时间")]),n("v-uni-view",{staticClass:"content"},[n("uni-dateformat",{attrs:{threshold:[0,0],date:i.add_date}})],1)],1),n("v-uni-view",{staticClass:"more",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickMore.apply(void 0,arguments)}}},[n("uni-icons",{attrs:{type:"more-filled",size:"30"}})],1)],1)],1),n("u-action-sheet",{attrs:{actions:t.selectlist,cancelText:"取消",show:t.show,closeOnClickOverlay:!0,closeOnClickAction:!0},on:{select:function(e){arguments[0]=e=t.$handleEvent(e),t.selectClick.apply(void 0,arguments)},close:function(e){arguments[0]=e=t.$handleEvent(e),t.onClose.apply(void 0,arguments)}}})],1):t._e()]}}])})],1)},o=[]},"11d2":function(t,e,n){"use strict";n.r(e);var i=n("9b17"),a=n("9a4a"),o=n("52fd"),r=n("e0e4"),s=n("68f3");e["default"]={en:i,es:a,fr:o,"zh-Hans":r,"zh-Hant":s}},"16cd":function(t,e,n){"use strict";var i=n("dde7"),a=n.n(i);a.a},"3dba":function(t,e,n){"use strict";n.r(e);var i=n("fd52"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},4227:function(t,e,n){"use strict";n.r(e);var i=n("f284"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"4af1":function(t,e,n){"use strict";(function(t){n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("2909")),o=i(n("53ca"));n("a9e3"),n("c975"),n("d3b7"),n("14d9"),n("a434"),n("ac1f"),n("e9c4"),n("b64b"),n("d9e2"),n("d401"),n("fb6a");var r=n("37dc"),s=i(n("11d2")),c=(0,r.initVueI18n)(s.default),u=c.t,l={load:"load",error:"error"},d={add:"add",replace:"replace"},f={auto:"auto",onready:"onready",manual:"manual"},h=["pageCurrent","pageSize","spaceInfo","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],v={name:"UniClouddb",props:{options:{type:[Object,Array],default:function(){return{}}},spaceInfo:{type:Object,default:function(){return{}}},collection:{type:[String,Array],default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String,Object],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},pageIndistinct:{type:[Boolean,String],default:!1},foreignKey:{type:String,default:""},loadtime:{type:String,default:"auto"},manual:{type:Boolean,default:!1}},data:function(){return{loading:!1,hasMore:!1,dataList:this.getone?void 0:[],paginationInternal:{},errorMessage:""}},computed:{collectionArgs:function(){return Array.isArray(this.collection)?this.collection:[this.collection]},isLookup:function(){return Array.isArray(this.collection)&&this.collection.length>1||"string"===typeof this.collection&&this.collection.indexOf(",")>-1}},created:function(){var t=this;this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var e=[];return h.forEach((function(n){e.push(t[n])})),e}),(function(e,n){if(t.paginationInternal.size=t.pageSize,e[0]!==n[0]&&(t.paginationInternal.current=t.pageCurrent),t.loadtime!==f.manual){for(var i=!1,a=2;a<e.length;a++)if(e[a]!==n[a]){i=!0;break}i&&(t.clear(),t.reset()),t._execLoadData()}})),this.manual||this.loadtime!==f.auto||this.loadData()},beforeDestroy:function(){},methods:{loadData:function(t,e){var n=null,i=!1;"object"===(0,o.default)(t)?(t.clear&&(this.pageData===d.replace?this.clear():i=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"===typeof e&&(n=e)):"function"===typeof t&&(n=t),this._execLoadData(n,i)},loadMore:function(){this._isEnded||this.loading||(this.pageData===d.add&&this.paginationInternal.current++,this._execLoadData())},refresh:function(){this.clear(),this._execLoadData()},clear:function(){this._isEnded=!1,this.dataList=[]},reset:function(){this.paginationInternal.current=1},add:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,a=n.showToast,o=void 0===a||a,r=n.toastTitle,s=n.success,c=n.fail,l=n.complete,d=n.needConfirm,f=void 0===d||d,h=n.needLoading,v=void 0===h||h,p=n.loadingTitle,g=void 0===p?"":p;v&&uni.showLoading({title:g});var m=t.database(this.spaceInfo);i&&(m=m.action(i)),m.collection(this.getMainCollection()).add(e).then((function(t){s&&s(t),o&&uni.showToast({title:r||u("uniCloud.component.add.success")})})).catch((function(t){c&&c(t),f&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){v&&uni.hideLoading(),l&&l()}))},remove:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.action,a=n.success,o=n.fail,r=n.complete,s=n.confirmTitle,c=n.confirmContent,l=n.needConfirm,d=void 0===l||l,f=n.needLoading,h=void 0===f||f,v=n.loadingTitle,p=void 0===v?"":v;t&&t.length&&(d?uni.showModal({title:s||u("uniCloud.component.remove.showModal.title"),content:c||u("uniCloud.component.remove.showModal.content"),showCancel:!0,success:function(n){n.confirm&&e._execRemove(t,i,a,o,r,d,h,p)}}):this._execRemove(t,i,a,o,r,d,h,p))},update:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=i.action,o=i.showToast,r=void 0===o||o,s=i.toastTitle,c=i.success,l=i.fail,d=i.complete,f=i.needConfirm,h=void 0===f||f,v=i.needLoading,p=void 0===v||v,g=i.loadingTitle,m=void 0===g?"":g;p&&uni.showLoading({title:m});var y=t.database(this.spaceInfo);return a&&(y=y.action(a)),y.collection(this.getMainCollection()).doc(e).update(n).then((function(t){c&&c(t),r&&uni.showToast({title:s||u("uniCloud.component.update.success")})})).catch((function(t){l&&l(t),h&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){p&&uni.hideLoading(),d&&d()}))},getMainCollection:function(){if("string"===typeof this.collection)return this.collection.split(",")[0];var t=JSON.parse(JSON.stringify(this.collection[0]));return t.$db[0].$param[0]},getTemp:function(){var e,n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],i=t.database(this.spaceInfo);this.action&&(i=i.action(this.action)),i=(e=i).collection.apply(e,(0,a.default)(this.collectionArgs)),this.foreignKey&&(i=i.foreignKey(this.foreignKey)),this.where&&Object.keys(this.where).length&&(i=i.where(this.where)),this.field&&(i=i.field(this.field)),this.groupby&&(i=i.groupBy(this.groupby)),this.groupField&&(i=i.groupField(this.groupField)),!0===this.distinct&&(i=i.distinct()),this.orderby&&(i=i.orderBy(this.orderby));var o=this.paginationInternal,r=o.current,s=o.size,c={};this.getcount&&(c.getCount=this.getcount);var u={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(c.getTree=u),this.gettreepath&&(c.getTreePath=u),i=i.skip(s*(r-1)).limit(s),n?(i=i.getTemp(c),i.udb=this):i=i.get(c),i},setResult:function(t){0===t.code?this._execLoadDataSuccess(t):this._execLoadDataFail(new Error(t.message))},_execLoadData:function(t,e){var n=this;this.loading||(this.loading=!0,this.errorMessage="",this._getExec().then((function(i){n.loading=!1,n._execLoadDataSuccess(i.result,t,e)})).catch((function(e){n.loading=!1,n._execLoadDataFail(e,t)})))},_execLoadDataSuccess:function(t,e,n){var i=t.data,o=t.count;this._isEnded=void 0!==o?this.paginationInternal.current*this.paginationInternal.size>=o:i.length<this.pageSize,this.hasMore=!this._isEnded;var r,s=this.getone?i.length?i[0]:void 0:i;(this.getcount&&(this.paginationInternal.count=o),e&&e(s,this._isEnded,this.paginationInternal),this._dispatchEvent(l.load,s),this.getone||this.pageData===d.replace)?this.dataList=s:n?this.dataList=s:(r=this.dataList).push.apply(r,(0,a.default)(s))},_execLoadDataFail:function(t,e){this.errorMessage=t,e&&e(),this.$emit(l.error,t)},_getExec:function(){return this.getTemp(!1)},_execRemove:function(e,n,i,a,o,r,s,c){var u=this;if(this.collection&&e){var l=Array.isArray(e)?e:[e];if(l.length){s&&uni.showLoading({mask:!0,title:c});var f=t.database(this.spaceInfo),h=f.command,v=f;n&&(v=v.action(n)),v.collection(this.getMainCollection()).where({_id:h.in(l)}).remove().then((function(t){i&&i(t.result),u.pageData===d.replace?u.refresh():u.removeData(l)})).catch((function(t){a&&a(t),r&&uni.showModal({content:t.message,showCancel:!1})})).finally((function(){s&&uni.hideLoading(),o&&o()}))}}},removeData:function(t){for(var e=t.slice(0),n=this.dataList,i=n.length-1;i>=0;i--){var a=e.indexOf(n[i]._id);a>=0&&(n.splice(i,1),e.splice(a,1))}},_dispatchEvent:function(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded,this.paginationInternal):this.$emit(t,e,this._isEnded,this.paginationInternal)}}};e.default=v}).call(this,n("a9ff")["default"])},"52fd":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"68f3":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否刪除數據"}')},"78ae":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.container[data-v-a8fe8f84]{display:flex;justify-content:center;align-items:center;width:100%}.pic-box uni-image[data-v-a8fe8f84]{width:100%;height:100vw}.btns[data-v-a8fe8f84]{margin-top:10px;display:flex;flex-direction:row}.btns uni-button[data-v-a8fe8f84]{flex:1}.btn-delete[data-v-a8fe8f84]{margin-left:10px}[data-v-a8fe8f84] .info-box{width:100%;margin-top:40px;background-color:#fff;margin-bottom:%?20?%}[data-v-a8fe8f84] .goods-info .price{font-size:%?46?%;font-weight:600;color:#f47925}[data-v-a8fe8f84] .goods-info .title{font-size:%?40?%;margin-bottom:20px;color:#605454;font-weight:700}.text-info .row[data-v-a8fe8f84]{width:100%;display:flex;align-items:center;margin:0 0 %?30?% 0}.text-info .row .leftxt[data-v-a8fe8f84]{width:25%;font-size:15px;color:#a2a2a2;margin-right:%?30?%}.text-info .row .content[data-v-a8fe8f84]{font-size:18px}.description .title[data-v-a8fe8f84]{width:100%;height:%?80?%;display:flex;justify-content:center;align-items:center;font-size:%?26?%;color:#999}.more[data-v-a8fe8f84]{padding:%?5?%;float:right}.more .iconfont[data-v-a8fe8f84]{font-size:%?50?%;color:#888}',""]),t.exports=e},"848e":function(t,e,n){"use strict";n.r(e);var i=n("4af1"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},"8d7b":function(t,e,n){"use strict";n.r(e);var i=n("b984"),a=n("3dba");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"690ab064",null,!1,i["a"],void 0);e["default"]=s.exports},"960d":function(t,e,n){"use strict";n.r(e);var i=n("b506"),a=n("848e");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=s.exports},"9a4a":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},"9b17":function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"Success","uniCloud.component.update.success":"Success","uniCloud.component.remove.showModal.title":"Tips","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},ac71:function(t,e,n){"use strict";n.r(e);var i=n("09ab"),a=n("4227");for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("16cd");var r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"a8fe8f84",null,!1,i["a"],void 0);e["default"]=s.exports},b506:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",[this._t("default",null,{options:this.options,data:this.dataList,pagination:this.paginationInternal,loading:this.loading,hasMore:this.hasMore,error:this.errorMessage})],2)},a=[]},b984:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-text",[this._v(this._s(this.dateShow))])},a=[]},d6ef:function(t,e,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.formatDate=c,e.friendlyDate=function(t,e){var n=e.locale,i=void 0===n?"zh":n,a=e.threshold,o=void 0===a?[6e4,36e5]:a,r=e.format,u=void 0===r?"yyyy/MM/dd hh:mm:ss":r;if("-"===t)return t;if(!t&&0!==t)return"";var l,d,f={zh:{year:"年",month:"月",day:"天",hour:"小时",minute:"分钟",second:"秒",ago:"前",later:"后",justNow:"刚刚",soon:"马上",template:"{num}{unit}{suffix}"},en:{year:"year",month:"month",day:"day",hour:"hour",minute:"minute",second:"second",ago:"ago",later:"later",justNow:"just now",soon:"soon",template:"{num} {unit} {suffix}"}},h=f[i]||f.zh,v=s(t),p=v.getTime()-Date.now(),g=Math.abs(p);if(g<o[0])return p<0?h.justNow:h.soon;if(g>=o[1])return c(v,u);var m=h.later;p<0&&(m=h.ago,p=-p);var y=Math.floor(p/1e3),w=Math.floor(y/60),_=Math.floor(w/60),b=Math.floor(_/24),x=Math.floor(b/30),C=Math.floor(x/12);switch(!0){case C>0:l=C,d=h.year;break;case x>0:l=x,d=h.month;break;case b>0:l=b,d=h.day;break;case _>0:l=_,d=h.hour;break;case w>0:l=w,d=h.minute;break;default:l=y,d=h.second;break}"en"===i&&(1===l?l="a":d+="s");return h.template.replace(/{\s*num\s*}/g,l+"").replace(/{\s*unit\s*}/g,d).replace(/{\s*suffix\s*}/g,m)};var a=i(n("53ca"));function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;t+="";while(t.length<e)t="0"+t;return t.slice(-e)}n("fb6a"),n("c975"),n("ac1f"),n("5319");var r={yyyy:function(t){return o(t.year,4)},yy:function(t){return o(t.year)},MM:function(t){return o(t.month)},M:function(t){return t.month},dd:function(t){return o(t.day)},d:function(t){return t.day},hh:function(t){return o(t.hour)},h:function(t){return t.hour},mm:function(t){return o(t.minute)},m:function(t){return t.minute},ss:function(t){return o(t.second)},s:function(t){return t.second},SSS:function(t){return o(t.millisecond,3)},S:function(t){return t.millisecond}};function s(t){if(t instanceof Date)return t;switch((0,a.default)(t)){case"string":return t.indexOf("T")>-1?new Date(t):new Date(t.replace(/-/g,"/"));default:return new Date(t)}}function c(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yyyy/MM/dd hh:mm:ss";if(!t&&0!==t)return"";t=s(t);var n={year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),hour:t.getHours(),minute:t.getMinutes(),second:t.getSeconds(),millisecond:t.getMilliseconds()},i=/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/,a=!0,o=e;while(a)a=!1,o=o.replace(i,(function(t){return a=!0,r[t](n)}));return o}},dde7:function(t,e,n){var i=n("78ae");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("76cd72c5",i,!0,{sourceMap:!1,shadowMode:!1})},e0e4:function(t){t.exports=JSON.parse('{"uniCloud.component.add.success":"新增成功","uniCloud.component.update.success":"修改成功","uniCloud.component.remove.showModal.title":"提示","uniCloud.component.remove.showModal.content":"是否删除该数据"}')},f284:function(t,e,n){"use strict";(function(t){n("7a82");var i=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("d3b7"),n("159b");var a=i(n("5530")),o=n("5944"),r=t.database(),s={data:function(){return{show:!1,selectlist:[{name:"修改",disabled:!0},{name:"删除",disabled:!0}],queryWhere:"",collectionList:[r.collection("runtake").field("category_id,name,user_id,keywords,run_desc,take_place,run_place,contact,run_thumb,run_price,add_date,last_modify_date").getTemp(),r.collection("runtake-categories").field("_id, name as text").getTemp()],loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:(0,a.default)({},o.enumConverter)}},onLoad:function(t){this._id=t.id},onReady:function(){this._id&&(this.queryWhere='_id=="'+this._id+'"')},methods:{clickMore:function(){var e=t.getCurrentUserInfo().uid;console.log(e),console.log(this.$refs.udb.dataList),(e==this.$refs.udb.dataList.user_id||this.uniIDHasRole("admin")||this.uniIDHasRole("webadmin"))&&this.selectlist.forEach((function(t){t.disabled=!1})),this.show=!0},selectClick:function(t){console.log(t),"修改"==t.name&&this.handleUpdate(),"删除"==t.name&&this.handleDelete()},onClose:function(){this.show=!1},handleUpdate:function(){var t=this;uni.navigateTo({url:"./edit?id="+this._id,events:{refreshData:function(){t.$refs.udb.loadData({clear:!0})}}})},handleDelete:function(){this.$refs.udb.remove(this._id,{success:function(t){uni.navigateTo({url:"/page_blog/runtake/list"})}})}}};e.default=s}).call(this,n("a9ff")["default"])},fd52:function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a9e3"),n("e25e");var i=n("d6ef"),a={name:"uniDateformat",props:{date:{type:[Object,String,Number],default:function(){return"-"}},locale:{type:String,default:"zh"},threshold:{type:Array,default:function(){return[0,0]}},format:{type:String,default:"yyyy/MM/dd hh:mm:ss"},refreshRate:{type:[Number,String],default:0}},data:function(){return{refreshMark:0}},computed:{dateShow:function(){return this.refreshMark,(0,i.friendlyDate)(this.date,{locale:this.locale,threshold:this.threshold,format:this.format})}},watch:{refreshRate:{handler:function(){this.setAutoRefresh()},immediate:!0}},methods:{refresh:function(){this.refreshMark++},setAutoRefresh:function(){var t=this;clearInterval(this.refreshInterval),this.refreshRate&&(this.refreshInterval=setInterval((function(){t.refresh()}),parseInt(this.refreshRate)))}}};e.default=a}}]);