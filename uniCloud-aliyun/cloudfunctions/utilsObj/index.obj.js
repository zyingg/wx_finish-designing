// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();
const dbCmd = db.command;
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
		 * 自定义增减
		 * @param {Object} table 数据表
		 * @param {Object} attr 属性
		 * @param {Object} id 
		 * @param {Object} num 1自增 -1自减 
		 */
	
	async operation(table,attr,id,num){
		let obj={}//定义一个对象 obj 空对象
		obj[attr] = dbCmd.inc(num);//obj里面添加属性 用数组表示 
		return await db.collection(table).doc(id).update(obj)
	}
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	/* 
	method1(param1) {
		// 参数校验，如无参数则不需要
		if (!param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	}
	*/
}
