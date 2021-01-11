/**
 * 问题：数字1~9组成3个3位数，设为：A,B,C,若要求满足关系：B = 2 * A， C = 3 * A， 请你写出A的所有可能答案，要求：数字间用空格分开，数字按升序排列。
 */

function groupNums() {

	/**
		设：
		A = 100i + 10j + k
		B = 2 * A = 100l + 10m + n
		C = 3 * A = 100r + 10s + t
		
		第一步：假定i、j、k。
		i [1,2,3]
		j []
		k []

		第二步：求l、m、n、r、s、t  
		l = 2i + Math.floor((2j + Math.floor(2k / 10)) / 10)
		m = (2j + Math.floor(2k / 10)) % 10 
		n = 2k % 10

		r = 3i + Math.floor((3j + Math.floor(3k / 10)) / 10)
		s = (3j + Math.floor(3k / 10)) % 10 
		t = 3k % 10

		第三步：验证
			i、j、k、l、m、n、r、s、t每个数各不相同，且都在[1-9]范围内
			i、j、k、l、m、n、r、s、t之和为45
	 */

	let result = [];
	let i, j, k, l, m, n, r, s, t;
	for (let x = 1; x < 4; x++) {
		i = x;
		for (let y = 1; y < 10; y++) {
			if (y === x)
				continue;
			j = y;
			for (let z = 1; z < 10; z++) {
				if (z === x || z === y)
					continue;
				k = z;

				if (calc(i, j, k)) {
					result.push(100 * i + 10 * j + k);
				}

			}
		}
	}

	return result.sort((a, b) => {
		return a - b;
	}).join(' ');

	// 计算出B、C上每位位数
	function calc(i, j, k) {

		n = 2 * k % 10;
		if (check(n, i, j, k)) return;

		m = (2 * j + Math.floor(2 * k / 10)) % 10;
		if (check(m, n, i, j, k)) return;

		l = 2 * i + Math.floor((2 * j + Math.floor(2 * k / 10)) / 10);
		if (check(l, m, n, i, j, k)) return;

		t = 3 * k % 10;
		if (check(t, n, m, l, i, j, k)) return;

		s = (3 * j + Math.floor(3 * k / 10)) % 10;
		if (check(s, t, n, m, l, i, j, k)) return;

		r = 3 * i + Math.floor((3 * j + Math.floor(3 * k / 10)) / 10);
		if (check(r, s, t, n, m, l, i, j, k)) return;

		// console.log(i, j, k, l, m, n, r, s, t);
		// console.log(`A:${i}${j}${k},B:${l}${m}${n},C:${r}${s}${t}`)

		return i + j + k + l + m + n + r + s + t === 45;
	}

	// 检查是否是重复数字或者不在[1-9]范围内
	function check(value, ...arr) {
		return arr.includes(value) || value > 9 || value < 1;
	}

}

console.time('groupNums');
console.log(groupNums()); // 192 219 273 327
console.timeEnd('groupNums');