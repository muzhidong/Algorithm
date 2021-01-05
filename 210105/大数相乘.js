/**
 * 问：求两个1000位数的相乘结果
 */

// 解题思路源自：https://blog.csdn.net/u010983881/article/details/77503519
// FIXME:目前采用改进的乘法累加方式实现，算法复杂度是O(1000*1000)，有待优化
function multiplyLargeNumbers(a, b) {

	function checkArg(val) {
		return isNaN(val) || toString.call(val) !== '[object String]';
	}

	if (checkArg(a) || checkArg(b)) return "参数必须是数字字符串";

	// 1.获取两个数上的每位数字，使用一维数组登记结果
	var aArr = a.split("");
	var bArr = b.split("");

	// 2.两个数的每位数字进行相乘，使用二维数组登记结果
	var arr = [];
	var l = aArr.length;
	var k = bArr.length;
	for (var i = 0; i < l; i++) {
		arr.push([]);
		for (var j = 0; j < k; j++) {
			arr[i].push(aArr[j] * bArr[i]);
		}
	}

	// 3.由低到高确定结果的每一位及其进位，下一位在进位基础上进行相加，重复这一步，直至确定到最高位
	var result = [];
	// 存储位值
	var num = 0;
	// 存储进位
	var carry = 0;
	// 计数
	var o = 0;

	for (var m = l - 1; m >= 0; m--) {

		for (var n = m; n < l; n++) {
			num += arr[l - 1 - o][n];
			o++;
		}

		num += +carry;
		num += '';
		carry = num.substring(0, num.length - 1);
		result.unshift(num.charAt(num.length - 1));

		o = 0;
		num = 0;
	}

	for (var p = 0; p < l - 1; p++) {

		for (var q = l - 2 - p; q >= 0; q--) {
			num += arr[o][q];
			o++;
		}

		num += +carry;
		num += '';
		carry = num.substring(0, num.length - 1);
		result.unshift(num.charAt(num.length - 1));

		o = 0;
		num = 0;
	}

	result.unshift(carry);

	return result.join('');

}

console.time('multiplyLargeNumbers');
console.log(multiplyLargeNumbers("1513901585804132781331567830641576995096926462913914809080273950661502922012906202060455927635763581", "8168654399869906087599425059630720273153038550236260709948402377832099275117682508327495025985483841"));
console.timeEnd('multiplyLargeNumbers');

function makeLargeNum(n) {
	var num = '';
	for (var i = 0; i < n - 1; i++) {
		num += Math.floor(Math.random() * 10);
	}
	num = Math.floor(Math.random() * 9 + 1) + num;
	return num;
}
var a = makeLargeNum(1000);
var b = makeLargeNum(1000);
console.log('第一个数：', a);
console.log('第二个数：', b);
console.log("结果为：");
console.time('multiplyLargeNumbers');
console.log(multiplyLargeNumbers(a, b));
console.timeEnd('multiplyLargeNumbers');