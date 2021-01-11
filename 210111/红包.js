// 问题：有一堆红包，其中某个红包金额占到超过一半，如何高效得到该红包金额

/**
 * 参数：  rpArr  红包数组
   返回值：money  超过一半的红包金额 
 */
// 思路参考：https://blog.csdn.net/lyl194458/article/details/89638462
function getRedPacket(rpArr) {

	if (toString.call(rpArr) !== "[object Array]" || rpArr.length === 0) return "请输入一个整数数组";

	// 假定第一个数组元素为大多数红包金额
	let money = rpArr[0];
	let count = 1;
	let len = rpArr.length;

	// 遍历数组，每发现一个，计数加1，否则计数减1。若此时计数为0，则使用下一元素作为红包金额，重置计数。
	for (let i = 1; i < len; i++) {
		if (money === rpArr[i]) {
			count++;
		} else {
			count--;
		}
		if (count === 0) {
			money = rpArr[i];
			count = 1;
		}
	}

	// 遍历数组，检查当前红包金额是否超过一半
	count = 0;
	for (let j = 0; j < len; j++) {
		if (money === rpArr[j]) {
			count++;
		}
	}
	if (count > len / 2) {
		return money;
	} else {
		return "没有找到超过一半的红包金额"
	}
}


function generateRedPacket(len) {

	// 生成随机索引，但随机的索引元素值不等于目标值
	function generateRandomNum(scope, target, arr) {
		let index = Math.floor(Math.random() * scope);
		if (arr[index] !== target) {
			return index;
		} else {
			return generateRandomNum(scope, target, arr);
		}
	}

	// 确定大多数红包金额及其数量
	let money = Math.ceil(Math.random() * 200);
	let num = Math.ceil(Math.random() * len / 2 + len / 2);
	num == num === len ? num - 1 : num;

	// 随机生成红包数组
	let result = [];
	for (let i = len; i > 0; i--) {
		result.push(Math.ceil(money + Math.random() * (200 - money)));
	}
	for (let j = num; j > 0; j--) {
		let index = generateRandomNum(len, money, result);
		result.splice(index, 1, money);
	}

	return result;
}
let rpArr = generateRedPacket(10);
console.log(rpArr);
console.time("getRedPacket");
console.log(getRedPacket(rpArr));
console.timeEnd("getRedPacket");