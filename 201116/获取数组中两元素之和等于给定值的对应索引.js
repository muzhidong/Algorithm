// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
// Example:
// Given nums = [3, 9, 18, 25], target = 21,
// Because nums[0] + nums[2] = 3 + 18 = 21,
// return [0, 2].

function getIndices(nums, target) {

	if (!(toString.call(nums) === '[object Array]' && nums.length > 1)) return '请传入长度大于1的数组';

	// 记录它们在原数组的位置
	var map = {};
	nums.forEach((num, index) => {
		if (map[num]) {
			map[num] += `,${index}`;
		} else {
			map[num] = index;
		}
	})

	// 进行从大到小排序
	var len = nums.length;
	var originIndexOfSortedArr = [];
	for (var i = 0; i < len; i++) {

		var max = nums[i];
		var maxIdx = i;

		for (var j = i + 1; j < len; j++) {
			if (nums[j] >= max) {
				max = nums[j];
				maxIdx = j;
			}
		}
		var temp = nums[i];
		nums[i] = max;
		nums[maxIdx] = temp;

		originIndexOfSortedArr.push(maxIdx);
	}

	// 计算两端之和，若小于目标值，小端移动，若大于目标值，大端移动，若等于目标值，记录索引，并各自“前进”一步，继续计算，直至两端索引有交叉时结束。
	function move(k, l, nums, target) {

		var result = [];
		for (; k < l;) {
			var sum = nums[k] + nums[l - 1];
			if (k < l - 1) {
				if (sum < target) {
					l--;
				} else if (sum > target) {
					k++;
				} else if (sum === target) {

					var idx1 = map[nums[k]] + '';
					var idx2 = map[nums[l - 1]] + '';
					idx1 = idx1.split(',');
					idx2 = idx2.split(',');
					for (var m = 0; m < idx1.length; m++) {
						for (var n = 0; n < idx2.length; n++) {
							result.push([+idx1[m], +idx2[n]]);
						}
					}

					var res1 = move(k + 1, l - 1, nums, target);
					var res2 = move(k, l - 2, nums, target);
					return result.concat(res1, res2);

				}
			} else {
				return result;
			}
		}
	}
	var result = move(0, len, nums, target);

	if (result.length > 0) {
		var res = [];
		for (var e = 0, len = result.length; e < len; e++) {
			var isExit = false;
			for (var f = 0, len2 = res.length; f < len2; f++) {
				if (result[e][0] === res[f][0] && result[e][1] === res[f][1]) {
					isExit = true;
				}
			}
			if (!isExit) {
				res.push(result[e]);
			}
		}
		return res;
	} else {
		return '该数组没有符合的两个元素等于目标值';
	}

}


function getIndices2(nums, target) {

	// 上面算法的时间复杂度为O(n^2)，空间复杂度为O(n)，而下面的算法复杂度是时间复杂度为O(n)，空间复杂度为O(1)。
	// 解题思路源自：https://mp.weixin.qq.com/s/wYTPPFr0Hi7BerKTfDuwfg

	var result = [];
	var map = new Map();
	// 遍历数组
	for (var i = 0, len = nums.length; i < len; i++) {

		// 根据元素值算出另一元素值
		var diff = target - nums[i];

		// 查找映射表中键值是否有为另一元素值的，有则记录两元素对应索引。
		if (map.get(diff)) {
			var splitArr = map.get(diff).split(',');
			for (var j = 0, l = splitArr.length; j < l; j++) {
				result.push([+splitArr[j], i])
			}
		}

		// 存入映射表，键存储元素值，值存储元素索引
		if (map.get(nums[i])) {
			map.set(nums[i], `${map.get(nums[i])},${i}`);
		} else {
			map.set(nums[i], `${i}`);
		}

	}

	return result;
}

// 拓展：返回数组中和为指定值的n个元素
function getIndices3(nums, target, n) {

	if (n > nums.length) return;

	var result = [];

	if (n > 2) {

		var temp = [...nums];

		for (var k = 0; k < nums.length; k++) {

			temp.splice(k, 1);
			var arr = getIndices3(temp, target - nums[k], n - 1);

			// 拼凑
			var newArr = [];
			for (var m = 0, l = arr.length; m < l; m++) {
				var el = [];
				for (var x = 0; x < n - 1; x++) {
					if (arr[m][x] >= k) {
						el.push(arr[m][x] + 1)
					} else {
						el.push(arr[m][x]);
					}
				}
				el.push(k);
				newArr.push(el);
			}

			result = result.concat(newArr);

			temp = [...nums];

		}

		//去重
		for (var y = 0; y < result.length; y++) {
			for (var p = y + 1; p < result.length;) {
				var res = result[p].join(',').match(new RegExp(`[${result[y].join('|')}]+`, 'g'));
				if (res && res.length === n) {
					result.splice(p, 1);
				} else {
					p++
				}
			}
		}

		return result;

	}

	var map = new Map();

	// 遍历数组
	for (var i = 0, len = nums.length; i < len; i++) {

		// 根据元素值算出另一元素值
		var diff = target - nums[i];

		// 查找映射表中键值是否有为另一元素值的，有则记录两元素对应索引。
		if (map.get(diff)) {
			var splitArr = map.get(diff).split(',');
			for (var j = 0, l = splitArr.length; j < l; j++) {
				result.push([+splitArr[j], i])
			}
		}

		// 存入映射表，键存储元素值，值存储元素索引
		if (map.get(nums[i])) {
			map.set(nums[i], `${map.get(nums[i])},${i}`);
		} else {
			map.set(nums[i], `${i}`);
		}

	}

	return result;

}

console.time('get-indices');
var result = getIndices([11, 22, 13, 1, 5, 6, 7, 890, 30, 3, 3, 67, 48], 70);
console.log(result);
console.timeEnd('get-indices');

console.time('get-indices2');
var result = getIndices2([11, 22, 13, 1, 5, 6, 7, 890, 30, 3, 3, 67, 48], 70);
console.log(result);
console.timeEnd('get-indices2');

console.time('get-indices3');
var result = getIndices3([11, 22, 37, 1, 32, 6, 7, 890, 30, 2, 3, 67, 48, 1], 70, 4);
console.log(result);
console.timeEnd('get-indices3');