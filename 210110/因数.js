/**
  对于区间[a,b]中所有正整数和给定的正整数k，计算其中最小质因数为k的整数个数
	示例：
	输入：
	1 10 2
  输出：
	5 
  
	输入：
	12 23 3
	输出：
	2

	输入：
	6  19  5
	输出：
	0
*/

function countNumOfFactor(a, b, k) {

	// 1.遍历[a,b]，获取每个元素的最小质因数
	function getMinFactor(num) {
		for (let i = 2; i <= num / 2; i++) {
			if (num % i === 0) {
				return i;
			}
		}
		return num;
	}

	let minFactorArr = [];
	for (let i = a; i <= b; i++) {
		minFactorArr.push(getMinFactor(i));
	}
	// console.log(minFactorArr);

	// 2.统计[a,b]中元素的最小因数为k的数量
	let num = 0;
	for (let i = 0, len = minFactorArr.length; i < len; i++) {
		if (minFactorArr[i] === k) {
			num++;
		}
	}
	return num;

}

console.time('countNumOfFactor');
console.log(countNumOfFactor(1, 10, 2));
console.log(countNumOfFactor(12, 23, 3));
console.log(countNumOfFactor(6, 19, 5));
console.log(countNumOfFactor(1, 100, 5));
console.timeEnd('countNumOfFactor');