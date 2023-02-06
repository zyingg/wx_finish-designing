//获取富文本内的图片url地址
export function getImgSrc(richtext,num=3) {
	let imgList = [];
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		  imgList.push(capture);
	});
	imgList=imgList.slice(0,num)
	return imgList;
}

//向外导出省份
export function getProvince(){
	return new Promise((resolve,reject)=>{	//promise封装网络请求时间范围内不重复请求  
		let historyProvince=uni.getStorageSync("historyProvince");//根据缓存获取历史记录，连续发生网络请求的话性能不好
		if(historyProvince){		
			if((Date.now() - historyProvince.time) > 1000*60*60){				
				getIp().then(res=>{
					resolve(res)
				}).catch(err=>{
					reject(err)
				})	
			}else{				
				resolve(historyProvince.province);
			}
		}else{			
			getIp().then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})		
		}	
	})
}

//获取所在省市
function getIp(){
	return new Promise((resolve,reject)=>{ //返回promise对象
		uni.request({//网络请求
			url:"https://restapi.amap.com/v3/ip?key=85afc39de405884a4ca38ca8941d895b",
			success:res=>{				
				let str=""				
				typeof(res.data.province) == "string" ? str=res.data.province :str="火星"//三元表达式
				 //与下面代码一样
				 // if(typeof(res.data.province) == "string" ){
					// str=res.data.province  
				 // }else{str="火星"
				 // }
				resolve(str)
				let obj={
					province:str,
					time:Date.now()
				}
				uni.setStorageSync("historyProvince",obj);	//缓存记录			
			},
			fail:err=>{
				reject(err)
			}
		})
	})	
}



//获取昵称
export function giveName(item){
	return  item.user_id[0].username ||  item.user_id[0].nickname || item.user_id[0].mobile || "请设置昵称"	
}

//获取默认头像
export function giveAvatar(item){	
	return item.user_id[0]?.avatar_file?.url ?? '../../static/images/user-default.jpg'
}


const db=uniCloud.database();	
const utilsObj=uniCloud.importObject("utilsObj",{
	customUI: true
});




//点赞操作数据库的方法
export async function  likeFun(artid){				
	let count= await db.collection("quanzi_like")
	.where(`article_id=="${artid}" && user_id==$cloudEnv_uid`).count()				
	if(count.result.total){
		db.collection("quanzi_like").where(`article_id=="${artid}" && user_id==$cloudEnv_uid`)
		.remove();
		utilsObj.operation("quanzi_article","like_count",artid,-1)
		
	}else{
		db.collection("quanzi_like").add({
			article_id:artid
		})
		utilsObj.operation("quanzi_article","like_count",artid,1)					
	}
}



