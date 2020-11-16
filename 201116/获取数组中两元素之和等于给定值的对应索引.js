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

console.time('get-indices');
var result = getIndices([11, 22, 13, 1, 5, 6, 7, 890, 30, 3, 3, 67, 48], 70);
console.log(result);
console.timeEnd('get-indices');